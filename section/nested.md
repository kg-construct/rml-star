## Generating deeply nested quoted triples {#nested}

It is possible to create more deeply nested RDF-star by using a [=quoted triples map=] that on its own turn also uses a quoted triples map.

Note: this process for generating deeply nested [=quoted triples=] is not different from the general process to create quoted triples [described earlier](#quoted), but we include this section for clarity.

<pre class="ex-input">
# contents of logical source :predictions
entity,class,confidence,predictor
Alice,Person,0.8,alpha
Alice,Giraffe,1.0,alpha
Bobby,Dog,0.6,alpha
Bobby,Giraffe,1.0,beta
</pre>

<pre class="ex-mapping nohighlight"><!-- nohighlight because otherwise the bolding is lost and we don't use highlighting anyway-->
# triples map that generates "type" triples
:innerTriplesMap a rml:NonAssertedTriplesMap ;
  rml:logicalSource :predictions ;
  rml:subjectMap [ rr:template "http://example.com/{entity}" ] ;
  rr:predicateObjectMap [
    rr:predicate rdf:type ;
    rml:objectMap [ rr:template "http://example.com/{class}" ] ] ] .

# triples map that generates "confidence" triples
:middleTriplesMap a rml:NonAssertedTriplesMap ;
  rml:logicalSource :predictions ;
  rml:subjectMap [ <b>rml:quotedTriplesMap :innerTriplesMap</b> ] ;
  rr:predicateObjectMap [
    rr:predicate :confidence ;
    rml:objectMap [
      rml:reference "confidence" ;
      rr:termType xsd:float ] ] .

# triples map that generates "predicted by" triples
:outerTriplesMap a rr:TriplesMap ;
  rml:logicalSource :predictions ;
  rml:subjectMap [ <b>rml:quotedTriplesMap :middleTriplesMap</b> ] ;
  rr:predicateObjectMap [
    rr:predicate :predictedBy ;
    rml:objectMap [ rr:template "http://example.com/{predictor}" ] ] .
</pre>

<pre class="ex-output">
<< << :Alice a :Person >> :confidence 0.8 >> :predictedBy :alpha .
<< << :Alice a :Giraffe >> :confidence 1.0 >> :predictedBy :beta .
<< << :Bobby a :Dog >> :confidence 0.6 >> :predictedBy :alpha .
<< << :Bobby a :Giraffe >> :confidence 1.0 >> :predictedBy :beta .
</pre>
