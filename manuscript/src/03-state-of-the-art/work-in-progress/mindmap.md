Industry -> We want to decrease development time while increasing performance. We barely care about used resources.

	Languages, libraries and frameworks
		Java - Object-oriented
			Spring
			Scala - Functional + Object-oriented
			Akka - Message driven actors
			Play - on top of akka (Asynchronous)
		PHP - Object-oriented
			Symphony
		Ruby - Functional + Object-oriented
			Sinatra
			Rails
		Javascript - Functional + Prototype-oriented
			Express.js
			hapi.js
			Meteor
			Bacon.js - Reactive programming
			kraken.js

		NoFlo

		Haskell
		FRP Reactive programming

		Erlang

		Spidle: A DSL approach to specifying streaming applications dataflow like

	Databases
		FlockDB
		CouchDB
		PouchDB
		Cassendra
		Dynamo DB

		distributed databases
			unhosted
			MoveMyData

	Runtime
		Node.js - Asynchronous programming with Event-loop
		Fibers 


Embedded -> We want to decrease used resources while increasing performance. We barely care about development time.

	Exploiting Coarse-grained Task, Data and Pipeline Parallelism in Stream Programs -> Compile StreamIt to assembler for multi-core
	Shangri-La - Compile C-like into assembler for packet program
	SPUR - A programming model for an embedded media processing architecture


Scientific-like -> We want to increase performance. We barely care about used resources nor decreasing development time.

	Languages, libraries and frameworks

		OpenMP
		OpenCL
		CUDA
		Cg: A system for programming graphics hardware in a C-like language
		Brook for GPUs: Stream Computing on Graphics Hardware
		Liquid Metal by IBM - unified language for FPGAs, GPUs and such ...
		
		StreaMIT: A language for Streaming Applications
		
		
		Apache Kafka - publish/subscribe distributed commit log
		
		Design methodology
			PCAM - Partition -> Communicate -> Agglomerate -> Map

	Runtime

		Cloud / Distributed OSs
			BarrelFish
			TesselationOS
			Mosix
			CoreOS

		Architectures
			Threads only
				Capricio - User cooperative threads (also known as fibers / green threads)

			Events only
				TAME - event-based solution without stack ripping in C (it is like closure, but for C)

			AMPED - Asymetric multi-process event-driven
				Flash
				Nginx
				Ninja
				SEDA
				Leda - PCAM 
				Vert.X - node like + thread / worker capabilities

			Hybrid solutions
				Combining events and threads for scalable network services, Linguistic symbiosis between event loop actors and threads, Combining data flow and control flow computing)


		CANS - Cluster-based scalable network services

		Stream Processing

			SQL-like
				Grape / Timestream - distributed SQL (roughly)
				CQL
				STREAM (uses CQL)
				StreaQuel
				TelegraphCQ
				AQuery

			Map/Reduce
				MapReduce    Stateless dataflow
				Hadoop       Stateless dataflow
				Incoop       Incremental dataflow

			Functional
				DryadLINQ    Stateless dataflow
				Spark        Stateless dataflow
				Nectar       Incremental dataflow
				Comet        Batched dataflow
				D-Streams    Batched dataflow

			Dataflow
				CBP          Incremental dataflow
				Naiad        Batched dataflow
				Storm, S4    Continuous dataflow
				SEEP         Continuous dataflow

			Imperative
				CIEL         Stateless dataflow
				SDG          Stateful dataflow
				Piccolo      Parallel in-memory
