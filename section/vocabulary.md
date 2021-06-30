## The RML-star vocabulary {#vocabulary}

RML-star extends the RML vocabulary by introducing three new classes, three object properties and by modifying one object property. 


**Classes**

-  `rml:NonAssertedTriplesMap` defines the creation of embedded triples that are non-asserted. By default, any triples map that is not a `rml:NonAssertedTriplesMap` creates asserted triples. It is a subclass of `rr:TriplesMap` and, by inheritance, a range of `rml:embeddedTriplesMap`. A triples map of this subclass *does* create [=embedded triples=] if it is used together with `rml:embeddedTriplesMap` and `rml:StarMap`.
-  `rml:StarMap` is able to generate RDF-star terms, either a subject or an object, from [logical references](https://rml.io/specs/rml/#reference). It is the domain of `rml:embeddedTriplesMap`, and the range of `rml:objectMap`, `rml:subjectMap`, and `rr:joinCondition`.

**Object Properties**

-  `rml:embeddedTriplesMap` is the relationship between `rml:StarMap` (domain) and `rr:TriplesMap` (range). This property indicates when a RDF-star term is generated with an embedded triple. 
-  `rml:objectMap` is the relationship between `rr:PredicateObjectMap` (domain) and the union of `rr:ObjectMap`, `rr:RefObjectMap` and `rml:StarMap` (range). It is used exactly as `rr:objectMap`, with the addition of `rml:StarMap` to its range and the deletion of cardinality restrictions.
-  `rml:subjectMap` is the relationship between `rr:TriplesMap` (domain) and the union of `rr:SubjectMap` and `rml:StarMap` (range). The same as the case of `rml:objectMap`, this property is used exactly as `rr:subjectMap`, with the addition of `rml:StarMap` to its range and the deletion of cardinality restrictions.
-  `rr:joinCondition` is the relationship between the union of `rr:RefObjectMap` and `rml:StarMap` (domain) and `rr:Join` (range). It is needed when embedded triples are generated using different sources. The modification with respect to the original property was the addition of `rml:StarMap` to its domain.



### Overview of RML-star terms
The new terms are summarized in the following tables.

Property | Domain | Range
-|-|-
`rml:embeddedTriplesMap` | `rr:StarMap` |  `rml:TriplesMap`
`rr:subjectMap` | `rr:TriplesMap` | Union of `rr:SubjectMap`, `rml:StarMap`
`rr:objectMap` | `rr:TriplesMap` | Union of `rr:ObjectMap`, `rr:RefObjMap`, `rml:StarMap`

Class | Superclass 
- | -
`rml:StarMap` | `rr:TermMap`
`rml:NonAssertedTriplesMap` | `rr:TriplesMap`

In certain cases, a join is needed to generate [=embedded triples=]. To achieve this, the domain of the property `rr:joinCondition` is changed. We summarize the change in the following table.

Property | Old domain | New domain
-|-|-
`rr:joinCondition` | `rr:RefObjMap` | Union of `rr:RefObjMap`, `rml:StarMap`

All RML-star additions and changes to RML are shown in this diagram:
<figure>
  <img src="./ontology/rml-star_diagram.png" alt="Target structure"/>
  <figcaption>To enable the generation of RDF-star graphs, RML-star adds three properties and two classes to the RML ontology, and changes the domain of one property.</figcaption>
</figure>
