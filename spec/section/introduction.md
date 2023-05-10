## Introduction {#introduction}

*This section is non-normative.*

### Overview {#overview}

RDF-star [[RDF-star]] is an extension of the Resource Description Framework (RDF) [[RDF11-Concepts]] that introduces a new kind of term, the [quoted triple](https://www.w3.org/2021/12/rdf-star.html#dfn-quoted), which can be referred from the subjects or objects of other triples. Triples that include a quoted triple are known as [RDF-star triples](https://w3c.github.io/rdf-star/cg-spec/editors_draft.html#dfn-triple).

<pre class="ex-output">
# The triple ( :Alice a :Person ) is 80% likely to be true
<< :Alice a :Person >> :confidence 0.8 .
</pre>

In RDF 1.1, an [asserted triple](https://www.w3.org/2021/12/rdf-star.html#dfn-asserted) is an element of the set of triples that compose an [RDF graph](https://www.w3.org/TR/rdf11-concepts/#dfn-rdf-graph). In RDF-star, a quoted triple can be asserted, if it is also included in the RDF graph, or not, if it only occurs as a quoted triple.

<pre class="ex-output">
# The triple ( :Alice a :Person ) is asserted and quoted
< :Alice a :Person > .
<< :Alice a :Person >> :confidence 0.8 .
</pre>

The RDF Mapping Language (RML) [[RML]] is a language for expressing mappings between heterogeneous data and RDF. In RML, rules can be expressed to iterate over a data source and refer to specific data within an iteration. Using these iterators and references, RML rules define how to express data in the data source in RDF. RML is based on and extends R2RML [[R2RML]]. R2RML is defined to express customized mappings only from relational databases to RDF datasets.

This document describes RML-star: an extension of RML that enables the generation of RDF-star graphs with RML.

### Conventions {#conventions}
This document assumes that the reader is familiar with RDF, RML and RDF-star concepts.

In this document, examples assume that the following prefixes have been declared to represent the IRIs shown with them:

| Prefix | Namespace                         |
| ------ | --------------------------------- |
| `rml:` | http://w3id.org/rml/              |
| `xsd:` | http://www.w3.org/2001/XMLSchema# |
| `ex:`  | http://example.org/               |
| `:`    | http://example.org/               |

The examples are contained in color-coded boxes. We use the Turtle syntax [[Turtle]] to write RDF and the N-Triples-star syntax [[RDF-star]] to write RDF-star.

<pre class="ex-input">
# This box contains an example input
</pre>

<pre class="ex-mapping">
# This box contains an example mapping
</pre>

<pre class="ex-output">
# This box contains the example output
</pre>
