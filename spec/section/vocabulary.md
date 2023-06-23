## The RML-star vocabulary {#vocabulary}

An <dfn data-lt="rml-star-mapping">RML-star mapping</dfn> defines a mapping from any data in a structured source format to RDF-star. It consists of one or more [Triples Maps](https://rml.io/specs/rml/#triples-map) that can in turn contain Triples Maps within the subject or object. A Triples Map can be Asserted or Non Asserted, depending on whether the triples that they generate should be included in the output graph.

The input to an RML-star mapping is called input data source. The output of an RML-star mapping is called output dataset.

The output dataset of an RML-star mapping is an RDF-star dataset that contains the generated [RDF-star triples](https://www.w3.org/2021/12/rdf-star.html#dfn-triple) for each of the [Triples Maps](https://rml.io/specs/rml/#triples-map) in the RML-star mapping. An [=RML-star processor=] may provide additional triples or graphs.

As in RML, conforming <dfn data-lt="rml-star-processors">RML-star processors</dfn> may rename blank nodes when providing access to the output dataset.

An [=RML-star processor=] has access to one of the followings:

* an execution environment consisting of an SQL connection and an input database (as stated by the [[R2RML]] specification).
* an input data source (as stated by the [[RML]] specification).

A <dfn data-lt="iri">base IRI</dfn> is used in resolving relative [=IRIs=] produced by the [=RML-star mappings=]. According to the [[R2RML]] specification, the base IRI must be a valid [[IRI]]. It should not contain question mark (“?”) or hash (“#”) characters and should end in a slash (“/”) character.

The RML-star vocabulary consists of the RML-star specific defined classes but also includes some [[RML]] classes.

* `rml:TriplesMap` is the class of Triples Maps as defined by RML-core.
* `rml:AssertedTriplesMap` is the class of Triples Maps that are asserted.
* `rml:NonAssertedTriplesMap` is the class of Triples Maps that are not asserted, but only quoted.
* `rml:LogicalSource` is the class of logical sources as defined by RML-core.
* `rml:TermMap` is the class of Term Maps, as defined by RML-core. It has the following subclasses:
  * `rml:SubjectMap` is the class of Subject Maps.
  * `rml:PredicateMap` is the class of Predicate Maps.
  * `rml:ObjectMap` is the class of Object Maps.
  * `rml:GraphMap` is the class of graph maps.
  * `rml:LanguageMap` is the class of language maps as defined by RML-core.
  * `rml:DatatypeMap` is the class of datatype maps as defined by RML-core.
* `rml:StarMap` is the class of RDF-star Term Maps.
* `rml:PredicateObjectMap` is the class of Predicate-Object Maps.
* `rml:RefObjectMap` is the class of referencing Object Maps.
* `rml:Join` is the class of join conditions.
* `rml:ReferenceFormulation` is the class of supported reference formulations as defined by RML.

### Overview of RML-star terms
The RML-star terms are summarized in the following tables.
This vocabulary involves three classes (`rml:StarMap`, `rml:AssertedTriplesMap` and `rml:NonAssertedTriplesMap`), and one object property (`rml:quotedTriplesMap`).

Property | Domain | Range
-|-|-
`rml:quotedTriplesMap` | `rml:StarMap` |  `rml:AssertedTriplesMap or rml:NonAssertedTriplesMap`

Class | Superclass
- | -
`rml:StarMap` | `owl:Thing`
`rml:AssertedTriplesMap` | `rml:TriplesMap`
`rml:NonAssertedTriplesMap` | `rml:TriplesMap`

All RML-star additions and changes to RML are shown in Figure 1:
<figure>
  <img src="./resources/images/rml-star_diagram.png" alt="Target structure" style="width:75%"/>
  <figcaption>To enable the generation of RDF-star graphs, RML-star adds three classes and one object property to the RML ontology.</figcaption>
</figure>
