## Overview {#overview}

*This section is non-normative.*

RDF-star [[RDF-star]] is an extension of the Resource Description Framework (RDF) [[RDF11-Concepts]]. RDF covers triples that are built from three terms: subject, predicate and object, and each term is either an IRI, a blank node or a literal. RDF-star adds a fourth kind of term: the RDF-star triple. With RDF-star, it is possible to represent metadata about individual triples.

<pre class="ex-output">
# This RDF-star example says that the triple ( :Alice a :Person ) is 80% likely to be true
<< :Alice a :Person >> :confidence 0.8 .
</pre>

The RDF Mapping Language (RML) [[RML]] is a language for expressing mappings between heterogeneous data and RDF. In RML, rules can be expressed to iterate over a data source and refer to specific data within an iteration. Using these iterators and references, RML rules define how to express data in the data source in RDF.

This document describes RML-star: an extension of RML that adds the generation of RDF-star triples to RML. 

### Conformance {#conformance}
As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

### Document conventions {#conventions}
We assume readers have basic familiarity with RDF, RML and RDF-star concepts.

In this document, examples assume 
the following namespace prefix bindings unless otherwise stated:

| Prefix | Namespace                         |
| ------ | --------------------------------- |
| `rml:` | http://semweb.mmlab.be/ns/rml#    |
| `rr:`  | http://www.w3.org/ns/r2rml#       |
| `xsd:` | http://www.w3.org/2001/XMLSchema# |
| `ex:`  | http://example.org/               |
| `:`    | http://example.org/               |

The examples are contained in color-coded boxes. We use the Turtle syntax [[Turtle]] to write RDF and the Turtle-star syntax [[RDF-star]] to write RDF-star.

<pre class="ex-input">
# This box contains an example input
</pre>

<pre class="ex-mapping">
# This box contains an example mapping
</pre>

<pre class="ex-output">
# This box contains the example output
</pre>