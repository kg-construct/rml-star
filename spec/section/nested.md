## Generating deeply nested quoted triples {#nested}

It is possible to create more deeply nested RDF-star by using a [=Quoted Triples Map=] that on its own turn also uses a Quoted Triples Map.

Note: this process for generating deeply nested [quoted triples](https://www.w3.org/2021/12/rdf-star.html#dfn-quoted) is not different from the general process to create quoted triples [described earlier](#quoted), but we include this section for clarity.

<pre class="ex-input">
# contents of Logical Source ex:PredictionsSource
entity , class   , confidence , predictor
Alice  , Person  , 0.8        , alpha
Alice  , Giraffe , 1.0        , alpha
Bobby  , Dog     , 0.6        , alpha
Bobby  , Giraffe , 1.0        , beta
</pre>

<pre class="ex-mapping nohighlight">
# Triples Map that generates "type" triples
<#innerTriplesMap>
    a rml:NonAssertedTriplesMap;
    rml:logicalSource ex:PredictionsSource;
    rml:subjectMap [
        rml:template "http://example.com/{entity}";
    ];
    rml:predicateObjectMap [
        rml:predicate rdf:type;
        rml:objectMap [ rml:template "http://example.com/{class}" ];
    ].

# Triples Map that generates "confidence" triples
<#middleTriplesMap>
    a rml:NonAssertedTriplesMap;
    rml:logicalSource ex:PredictionsSource;
    rml:subjectMap [
        <b>rml:quotedTriplesMap <#innerTriplesMap>;</b>
    ];
    rml:predicateObjectMap [
        rml:predicate ex:confidence;
        rml:objectMap [ rml:reference "confidence" ];
    ].

# Triples Map that generates "predicted by" triples
<#outerTriplesMap>
    a rml:AssertedTriplesMap;
    rml:logicalSource ex:PredictionsSource;
    rml:subjectMap [
        <b>rml:quotedTriplesMap <#middleTriplesMap>;</b>
    ];
    rml:predicateObjectMap [
        rml:predicate ex:predictedBy;
        rml:objectMap [ rml:template "http://example.com/{predictor}" ];
    ].
</pre>

<pre class="ex-output">
<< << ex:Alice a ex:Person >> ex:confidence 0.8 >> ex:predictedBy ex:alpha .
<< << ex:Alice a ex:Giraffe >> ex:confidence 1.0 >> ex:predictedBy ex:beta .
<< << ex:Bobby a ex:Dog >> ex:confidence 0.6 >> ex:predictedBy ex:alpha .
<< << ex:Bobby a ex:Giraffe >> ex:confidence 1.0 >> ex:predictedBy ex:beta .
</pre>
