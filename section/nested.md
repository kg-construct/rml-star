## Generating deeply nested embedded triples {#nested}

It is possible to create more deeply nested RDF-star by using an [=embedded triples map=] that on its own turn also uses an embedded triples map.

Note: this process for generating deeply nested [=embedded triples=] is not different from the general process to create embedded triples [described earlier](#embedded), but we include this section for clarity.

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
  rr:subjectMap [ rr:template "http://example.com/{entity}" ] ;
  rr:predicateObjectMap [
    rr:predicate rdf:type ;
    rr:objectMap [ rr:template "http://example.com/{class}" ] ] ] .
        
# triples map that generates "confidence" triples
:middleTriplesMap a rml:NonAssertedTriplesMap ;
  rml:logicalSource :predictions ;
  rr:subjectMap [ <b>rml:embeddedTriplesMap :innerTriplesMap</b> ] ;
  rr:predicateObjectMap [
    rr:predicate :confidence ;
    rr:objectMap [ 
      rml:reference "confidence" ;
      rr:termType xsd:float ] ] .
    
# triples map that generates "predicted by" triples
:outerTriplesMap a rr:TriplesMap ;
  rml:logicalSource :predictions ;
  rr:subjectMap [ <b>rml:embeddedTriplesMap :middleTriplesMap</b> ] ;
  rr:predicateObjectMap [
    rr:predicate :predictedBy ;
    rr:objectMap [ rr:template "http://example.com/{predictor}" ] ] .
</pre>

<pre class="ex-output">
<< << :Alice a :Person >> :confidence 0.8 >> :predictedBy :alpha .
<< << :Alice a :Giraffe >> :confidence 1.0 >> :predictedBy :beta .
<< << :Bobby a :Dog >> :confidence 0.6 >> :predictedBy :alpha .
<< << :Bobby a :Giraffe >> :confidence 1.0 >> :predictedBy :beta .
</pre>