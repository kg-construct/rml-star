## Generating embedded triples from multiple sources {#join}

RML-star can create RDF-star triples from multiple [logical sources](https://rml.io/specs/rml/#logical-source).
When creating RDF-star triples from multiple [logical sources](https://rml.io/specs/rml/#logical-source), [join conditions](https://rml.io/specs/rml/#join-condition) are used, just like when using [referencing object maps](https://rml.io/specs/rml/#referencing-object-map) in RML.

If a [=star map=] has a [join condition](https://rml.io/specs/rml/#join-condition), it generates [=embedded triples=] as follows. Each combination of iterations, i.e., the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product), from the *child source* and the *parent source* is looked at. Here, we consider as <dfn>child source</dfn> the [logical source](https://rml.io/specs/rml/#logical-source) of the [triples map](https://rml.io/specs/rml/#triples-map) in which the star map occurs, and as <dfn>parent source</dfn> the logical source of the star map's [=embedded triples map=]. A star map only generates embedded triples for combinations in which the join condition holds true. As is the case when [join conditions are used in in referencing object maps](https://rml.io/specs/rml/#logical-join), a join condition checks for equality of the [reference values](https://rml.io/specs/rml/#reference-value) of the [child](https://rml.io/specs/rml/#child-reference)/[parent reference](https://rml.io/specs/rml/#parent-reference) between iterations of the child/parent source.

<!--Following criterion is taken almost verbatim from the RML spec, mutatis mutandi: https://rml.io/specs/rml/#parent-query -->
If the [logical source](https://rml.io/specs/rml/#logical-source) of triples map in which a [=star map=] occurs and the logical source of star map's [=embedded triples map=] are not identical, then the star map must have at least one [join condition](https://rml.io/specs/rml/#join-condition). 

<pre class="ex-input">
# contents of logical source :classes
entity,class
Alice,Person
Bobby,Dog
</pre>

<pre class="ex-input">
# contents of logical source :confidences
entity,confidence
Alice,0.8
Bobby,0.6
</pre>

<pre class="ex-mapping nohighlight"><!-- nohighlight because otherwise the bolding is lost and we don't use highlighting anyway-->
# triples map that generates "type" triples
:innerTriplesMap a rml:NonAssertedTriplesMap ;
  rml:logicalSource :classes ;
  rml:subjectMap [ rr:template "http://example.com/{entity}" ] ;
  rr:predicateObjectMap [
    rr:predicate rdf:type ;
    rml:objectMap [ rr:template "http://example.com/{class}" ] ] .
    
# triples map that generates "confidence" triples
:outerTriplesMap a rr:TriplesMap ;
  rml:logicalSource :confidences ;
  rml:subjectMap [ 
    rml:embeddedTriplesMap :innerTriplesMap
    <b>rr:joinCondition [
        rr:parent "entity" ;
        rr:child "entity" ]</b> ] ;
  rr:predicateObjectMap [
    rr:predicate :confidence ;
    rml:objectMap [ 
      rml:reference "confidence" ;
      rr:termType xsd:float ] ] .
</pre>

<pre class="ex-output">
<< :Alice a :Person >> :confidence 0.8 .
<< :Bobby a :Dog >> :confidence 0.6 .
</pre>

### Using star map together with referencing object maps

It is also possible to generate [=embedded triples=] which themselves are built from multiple sources.
This is done by using an [=embedded triples map=] which contains a [referencing object map](https://rml.io/specs/rml/#referencing-object-map).

Note: this process for generating [=embedded triples=] with a [referencing object map](https://rml.io/specs/rml/#referencing-object-map) is not different from the general process to create embedded triples [described earlier](#embedded), but we include this section for clarity.

<pre class="ex-input">
# contents of logical source :classes
entity,class
Alice,Person
Bobby,Dog
</pre>

<pre class="ex-input">
# contents of logical source :confidences
entity,confidence
Alice,0.8
Bobby,0.6
</pre>

<pre class="ex-mapping nohighlight"><!-- nohighlight because otherwise the bolding is lost and we don't use highlighting anyway-->
# triples map that generates objects of "type" triples
:classTriplesMap a rr:TriplesMap ;
  rml:logicalSource :classes ;
  rml:subjectMap [ rr:template "http://example.com/{class}" ].

# triples map that generates "type" triples using a join
:innerTriplesMap a rml:NonAssertedTriplesMap ;
  rml:logicalSource :confidences ;
  rml:subjectMap [ rr:template "http://example.com/{entity}" ] ;
  rr:predicateObjectMap [
    rr:predicate rdf:type ;
    rml:objectMap [ 
      <b>rr:parentTriplesMap :classTriplesMap ;
      rr:joinCondition [
        rr:parent "entity" ;
        rr:child "entity" ]</b> ] ] .
    
# triples map that generates "confidence" triples
:outerTriplesMap a rr:TriplesMap ;
  rml:logicalSource :confidences ;
  rml:subjectMap [ rml:embeddedTriplesMap :innerTriplesMap ] ;
  rr:predicateObjectMap [
    rr:predicate :confidence ;
    rml:objectMap [ 
      rml:reference "confidence" ;
      rr:termType xsd:float ] ] .
</pre>

<pre class="ex-output">
<< :Alice a :Person >> :confidence 0.8 .
<< :Bobby a :Dog >> :confidence 0.6 .
</pre>