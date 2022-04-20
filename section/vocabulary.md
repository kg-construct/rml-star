## The RML-star vocabulary {#vocabulary}

The RML-star vocabulary namespace is `http://semweb.mmlab.be/ns/rml#`.

The RML-star vocabulary preferred prefix is `rml`.

An <dfn data-lt="rml-star-mapping">RML-star mapping</dfn> defines a mapping from any data in a structured source format to RDF-star. It consists of one or more [triples maps](https://rml.io/specs/rml/#triples-map) that can in turn contain triples maps within the subject or object.

The <dfn data-lt="input">input</dfn> to an RML-star mapping is called input data source. The output of an RML-star mapping is called output dataset.

The <dfn data-lt="output">output dataset</dfn> of an RML-star mapping is an RDF-star dataset that contains the generated [RDF-star triples](https://www.w3.org/2021/12/rdf-star.html#dfn-triple) for each of the [triples maps](https://rml.io/specs/rml/#triples-map) in the RML-star mapping. [=RML-star processor=] may provide additional triples or graphs.

As in RML, conforming <dfn data-lt="rml-star-processors">RML-star processors</dfn> may rename blank nodes when providing access to the output dataset.

As in RML, an [=RML-star processor=] has access to one of the followings:

* an execution environment consisting of an SQL connection and an input database (as stated by the [[R2RML]] specification).
* an input data source (as stated by the [[RML]] specification).

A <dfn data-lt="iri">base IRI</dfn> is used in resolving relative [=IRIs=] produced by the [=RML-star mappings=]. According to the [[R2RML]] specification, the base IRI must be a valid [[IRI]]. It should not contain question mark (“?”) or hash (“#”) characters and should end in a slash (“/”) character.

The RML-star vocabulary consists of the RML-star specific defined classes but also includes all the [[R2RML]] and [[RML]] classes.

* `rr:TriplesMap` is the class of triples maps as defined by R2RML.
* `rml:NonAssertedTriplesMap` is the class of triples maps that are not asserted, but only quoted.
* `rml:LogicalSource` is the class of logical sources as defined by RML.
  * `rml:BaseSource` is the class of data sources used as input source as defined by RML. R2RML's `rr:BaseTableOrView` is a subclass of `rml:BaseSource`.
* `rr:TermMap` is the class of term maps, as defined by R2RML. It has four subclasses:
  * `rr:SubjectMap` is the class of subject maps.
  * `rr:PredicateMap` is the class of predicate maps.
  * `rr:ObjectMap` is the class of object maps.
  * `rr:GraphMap` is the class of graph maps.
  * `rml:LanguageMap` is the class of language maps as defined by RML.
* `rml:StarMap` is the class of RDF-star term maps.
* `rr:PredicateObjectMap` is the class of predicate-object maps.
* `rr:RefObjectMap` is the class of referencing object maps.
* `rr:Join` is the class of join conditions.
* `rml:ReferenceFormulation` is the class of supported reference formulations as defined by RML.

### Overview of RML-star terms
The new terms are summarized in the following tables.

Property | Domain | Range
-|-|-
`rml:quotedTriplesMap` | `rr:StarMap` |  `rml:TriplesMap`
`rml:subjectMap` | `rr:TriplesMap` | Union of `rr:SubjectMap`, `rml:StarMap`
`rml:objectMap` | `rr:PredicateObjectMap` | Union of `rr:ObjectMap`, `rr:RefObjMap`, `rml:StarMap`

Class | Superclass
- | -
`rml:StarMap` | `owl:Thing`
`rml:NonAssertedTriplesMap` | `rr:TriplesMap`

In certain cases, a join is needed to generate [=quoted triples=]. To achieve this, the domain of the property `rr:joinCondition` has been changed.

Property | Old domain | New domain
-|-|-
`rr:joinCondition` | `rr:RefObjMap` | Union of `rr:RefObjMap`, `rml:StarMap`

All RML-star additions and changes to RML are shown in Figure 1:
<figure>
  <img src="./resources/images/rml-star_diagram.png" alt="Target structure"/>
  <figcaption>To enable the generation of RDF-star graphs, RML-star adds three properties and two classes to the RML ontology, and it also modifies the domain of one property.</figcaption>
</figure>
