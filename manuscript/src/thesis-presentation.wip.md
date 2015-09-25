L'idée suivante doit être ressentie dans ma thèse.

La réalité économique fait qu'une application web proposant un service, a besoin à la fois d'être développé à moindre coût, et disponible pour un maximum d'utilisateurs.
Ces deux objectifs sont incompatibles, ce qui se concrétise par des ruptures dans l'évolution du dévelopement de application.

L'objectif prépondérant au commencement est le coût du développement, et c'est pourquoi le développement se base sur une approche modulaire des fonctionnalités, afin de réduire le temps et la difficulté du développement.
Cependant, la compréhension d'un problème est un processus évolutif, et continu, et c'est pourquoi l'implémentation de sa solution doit pouvoir évoluer au moins à égale vitesse tout au long de la vie de l'application.
Cependant, ce n'est pas ce qu'on observe.

Une application commence toujours par un état un peu grossier, monolithique.
Puis, petit à petit, le besoin en performance prend le pas sur ce premier objectif et impose une seconde approche, basé sur les performances, incompatible avec la première.
C'est pourquoi le code d'une application évolue radicalement du début à la fin, pour s'adapter aux différents objectifs.
La base de code se renouvèle trop vite pour qu'il soit intéressant de se plier aux bonnes pratiques, et garder une base de code lisible, et maintenable.
Il en résulte une certaine énergie de développement gaspillé à réécrire des implémentations dans différentes visions pour rester en phase avec les réalités économiques.

L'objectif de cette thèse est d'étudier une équivalence entre une vision impérative, et une vision flux d'un même programme.
La première répondant aux besoins en fonctionnalités, et favorisant les bonnes pratiques de développement pour une meilleure maintenabilité.
La seconde permettant une exécution plus efficace que la première vision.

Nous étudions la possibilité pour cette équivalence de transformer un code d'une vision dans une autre vision.
Pour cela nous avons développé un compilateur.
En permettant la transition d'une vision à l'autre, le développeur peut ainsi continuellement raffiner l'organisation de cette première version en suivant les deux visions à la fois, et ne pas se cloisonner dans une, en se coupant de l'autre.