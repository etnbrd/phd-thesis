

Context

  valider le contexte web javascript
  présenter à mon avantage

-> grande ligne
  Tout le monde se rue dans Javascript, mais on a des problèmes de scalabilité.


Problematic (might be the same chapter than context)

  Peut on exprimer JS sous la forme d'un pipeline distribuable ?

  Javascript est une event-loop mais pas un pipeline

State of the art

  What is an event-loop / pipeline
  closure / callback

  + Synthesis
  grille de lecture -> sweetspot

Propositions / Contributions

Validation




An idea is that multi-threading is inehrently neutral about the priority of threads/processes, while node.js is not.
Node.js should prioritize the input flow, to maximize the user experience quality.













# An equivalence between imperative programming, and distributed programming (65p)


## Introduction (3p)

## Related work (10p)

## Context (5p)

  Current state of the art of web applications development in the entreprise.
  Javascript is growing, but most applications are still built with Java.
  Transition : Scalability is a problem for application with growing usage.

## A break in the economic development of an application. (5p)

  The mainly used languages are not scalable.
  The scalable solutions are expensive.

  Scalability of web applications is required for economic development, but it is not easily accessible.
  It is a break to economic development.



## Why event-loops are more more efficient than multi-thread in a particular context ?

Read this :
http://berb.github.io/diploma-thesis/original/043_threadsevents.html

This debate is as old as operating systems.
events and thread are equivalent \cite{Lauer1979}

The real factors are task management and stack management.
Task management : preemptive scheduling or cooperative scheduling.
Stack management : manual or automatic
cooperative scheduling allow to get rid of the synchronization mechanism, and all the burdens they bring (both for the programmer and for the performance).
Automatic stack management allows to get rid of dumb programming tasks.




## Scalability (10p)

  State of the art on how to achieve scalability.
  The requirement for an application to be scalable is to use concurrency

  Definition of concurrency and parallelism.
    - pipeline parallelism
    - data parallelism
    - task parallelism
    - time-slicing concurrency

  We propose to transform existing application to provide parallelism.
  We focus on event-loops based languages.

## Event-loop (10p)

  Definition
  Difference with the imperative and synchronous programming model
  Event-loop are like serialized pipeline parallelism.

  The synchronous programming model stack the functions, while the asynchronous programming model doesn't.
  That is one reason (not sufficient imho) why it is possible to parallelize the execution of event-loop programs.

  We propose to transform event-loop based languages into a distributed langauge.
  To do so, the required transformations are detection of rupture points and isolation of memory.

## Compilation (20p)

  ### Rupture points (5p)
    
    Definition
    Present why the problematic is different than with synchronous languages.

  ### Memory isolation (15p)

    Lexical isolations : promises

    Complete isolation : fluxions


## Conclusion (2p)














Scalablility problems & Solutions
  -> thread vs events concurrency
  -> storm et. al.
  -> shared-nothing architecture

Scalability = concurrency

Parallelism needs two cores, not concurrency.
(Time-slicing is a type of concurrency, but is not parallelism)
Scalability needs concurrency, but as the frequency of a processor is not going to improve, it is better to say that practical scalability is made by parallelism instead of concurrency.

Definition of the 4 types of concurrency
- pipeline parallelism
- data parallelism
- task parallelism
- time-slicing concurrency
the last two are irrelevant in this demonstration.

Compilation from single thread execution to parallelism already exists for GPUs and such.
But they :
1 - they focus on the instruction, and they rely on a shared memory as a communication medium, so it is not distributable to a data-center
2 - the main problem adressed in this work is the identification of parallelism (loop parallelisation for example)


An equivalence between a single event-loop to a distributed event-loop
Why there is no problem of synchronization, causality ?
The only problem is the memory isolation.
That is identifying the memory used as a persisted state, and used as a communication medium.
(temporal communication vs spatial communication)


From callbacks to promises

From promises to fluxion









# Javascript landscape

1. At its beginning, Javascript remains almost unnoticed.
It was an awkward language to develop small animations in the browser
At the time, the interface for real application in the browser were developed with Java applets.
I think this quietude allowed the language to slowly, but firmly, settle in the browsers.
Indeed, the language was created in 10 days, but multiple specification were released the next few years.

Until 2005, with the creation of Ajax, which sparkled various open source projects and communities of users and developers (prototype, jquery).

2. Because of this, Javascript is developed from bottom-up and is adopted only later in professionals environment.
On the contrary of erlang and scala, for example, which were developed by and for professionals.
The rapid web expansion allow individuals to work faster, and adopts novelties faster than more conservative environment, like the industry.

4. JS is the web assembly language.
Today, it is the most popular language on github.
It is the language the most deployed (because each browser has a JS runtime).
It is isomorphic, it can be deployed on both the client and the server.
