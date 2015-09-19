Je retranscris ici un échange de mail avec Stéphane datant du 3 Septembre, avec pour objet Papier fluxions.
J'explique les limitations du compilateur par rapport aux langages d'ordre superieur.
À la fin, j'ai retranscris la discussion, et l'explication orale (un peu plus claire).

Jusqu'à maintenant, le langage fluxionnel de haut niveau était limité par rapport aux possibilités des langages d'ordre supérieur.
Une fonction peut recevoir en argument, et retourner, une autre fonction, alors que ce n'est pas possible pour une fluxion.
Cette différence limite l'utilisation de fonctions d'ordre supérieur dans le langage source, puisqu'on ne peut pas traduire cette possibilité dans notre langage fluxionnel.
Cette limitation m'a toujours un peu dérangé : on a besoin d'un langage source d'ordre supérieur, mais on le limite à des usages très simples : callbacks inline.

Je ne m'en suis pas rendu compte immédiatement, mais j'ai l'impression que le fait qu'on ajoute les groupes et les tags change les choses par rapport à cette limitation.
Initialement, le compilateur devait regrouper toutes les parties d'applications partageant des variables dans une même fluxion.
Il fallait donc attendre que la représentation en pipeline soit complète pour générer les fluxions.
(ou alors modifier les fluxions au fur et à mesure qu'on découvre de nouvelles parties d'applications)

Maintenant qu'on peut regrouper des fluxions par tags, à la découverte d'une nouvelle partie d'application, on peut simplement la créer, et rajouter les tags correspondant dans le système.
(En considérant que le système de messagerie permette d'ajouter de nouvelles fluxions et de nouveaux tags dynamiquement).

Immédiatement, je ne vois qu'une limitation potentiellement gênante.
Imaginons qu'on a un groupe de fluxion partageant la variable a, sur une machine, et qu'on a un groupe de fluxion partageant la variable b sur une autre machine.
Si on découvre une partie d'application dépendant à la fois de la variable a, et de la variable b, alors il faut créer une fluxion qui fasse partie des deux groupes.
Et donc il faut regrouper tous les groupes sur la même machine pour que la nouvelle fluxion puisse partager à la fois la variable a, et la variable b.



---


Javascript est d'ordre supérieur, et je pense que c'est une bonne chose, et que la programmation fonctionnelle va prendre de plus en plus d'ampleur.
Mais notre compilateur se limitait pour l'instant à quelques cas simple des fonctions d'ordre supérieur : les callbacks déclarés in situ.
Donc tous les avantages de la programmation fonctionnelle serait dans le meilleur des cas incomprise par notre compilateur.
La compilation donnerait des fluxions de grosse taille et en petit nombre.
Et dans le pire des cas, empêcherais complètement le découpage de certains programmes.
En gros, on n'incite pas les développeurs à tendre vers du code fonctionnel, puisque le compilateur les bride à n'utiliser que du code purement impératif pour profiter des avantages des fluxions.

Pour reprendre ta comparaison, quand Java limite l'utilisation de la mémoire, c'est pour simplifier le travail du développeur, et il propose en échange des abstractions plus attractives.
Il n'y a plus de pointeur, mais il y a des références. Il n'y a plus de désallocation manuelle, mais il y a un ramasse-miette, etc ...
Alors qu'avec la limitation actuelle du compilateur, on ampute l'expressivité du langage utilisé par les développeurs (Javascript), et on ne rajoute rien, si ce n'est de la performance.
Autrement dit, on ne se différencie pas beaucoup des storm et co, puisqu'on troc de l'expressivité pour de la performance, au lieu de s'appuyer sur un compilateur pour allier autant que possible les deux.
Avec cette limitation, Javascript deviens un langage de description des étape d'un pipeline, et il perd complétement son aspect fonctionnel qui fait actuellement sa popularité.

Je pense que cette limitation viens du fait qu'on ne peut pas découvrir, créer et ajouter de fluxions dynamiquement.
Autrement dit, l'équivalent de l'évaluation dynamique de fonction qui permet un langage d'ordre supérieur.
Initialement, on avait décidé que le système de messagerie ne pouvait pas ajouter de fluxions pendant l’exécution, principalement pour se protéger techniquement.
En effet, c'est difficile de maintenir un annuaire de fluxions qui bouge dynamiquement.
Maintenant, si on imagine possible la création dynamique de fluxion, alors une partie de la compilation peut se faire de manière dynamique, pendant l’exécution d'une application.
Par exemple, après l'évaluation d'une expression qui donne une fonction sur un point de rupture dont le callback n'était pas connu statiquement.

Dans le cas où le callback découvert partage une variable avec une autre partie d'application, jusqu'à maintenant la stratégie était de rassembler les deux parties d'applications dans une seule fluxion.
Il fallait donc pouvoir être sûr de toute la chaine descendante, avant de séparer une partie d'application de la fluxion courante, ce qui n'est pas possible dans un langage dynamique comme javascript.
Sinon, le risque était qu'une partie d'application dans la chaine descendante ai besoin d'une variable dans une des fluxions en amont, et qu'il faille recompiler l'ensemble de la chaine pour s'assurer que les dépendances entre fluxions soient respectés.

Mais avec le système de dépendances par groupe et par tag, il est plus facile d'ajouter une nouvelle fluxion à un groupe existant, et donc le problème qui se posait ne se pose plus.
Il n'est plus nécessaire de connaitre toute la chaine descendante avant de séparer une partie d'application de la fluxion courante.
Si une partie d'application a besoin d'une variable dans une des fluxions en amont, il suffit de l'ajouter au groupe correspondant et de la déployer là où il faut.
Autrement dit, la compilation peut se faire en partie au fur et à mesure de l’exécution.

---

La limitation de l'analyse statique pour trouver objets pointés par les identifieurs en Javascript.

Imaginons le code suivant :
```
var a;

fn1(a)
fn2(a)

fn1(b) {
    ...
}

fn2(c) {
    ...
}
```

Les variables a, b et c pointent sur le même objet, et il est très facile de le voir.
Ce sont les appels de fonction qui vont dynamiquement lier les variables entre elles.
En revanche, si on change les appels par :

```
handlers[i](a);
handlers[i+1](a);
```
On ajoute un niveau d'indirection avec le tableau handlers.
Autrement dit, pour savoir que a === b === c, il faut connaitre les valeurs de ce tableaux, et observer l'appel de fonction sur ce tableau.
C'est cet appel qui va réellement lier les scopes entre eux.
(À noter qu'on utilise ici un tableau, mais on pourrait aussi utiliser de simples variables).
Ce tableaux est peut être lié à un autre objet par un autre appel de fonction, ce qui ajouterais à nouveau un niveau d'indirection.

En pratique, les programmes Javascript ont potentiellement des centaines ou des milliers de niveaux d'indirection.
Louper ne serait-ce qu'un niveau peut mener à des grosses incertitudes dans l'analyse.
(par exemple, une chaine de charactère venant d'une requète exterieurs qui pointerais sur un tableau )
À chaque niveau d'indirection une incertitude peut rendre l'analyse floue.
(Ici, si on ne connais pas i, on ne peut pas savoir si a est lié à b ou c)