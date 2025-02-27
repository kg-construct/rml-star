## RMLSTARTC006b

**Title**: non-asserted quoted triple in object, two sources

**Description**: Tests the creation of a non-asserted quoted triple in the position of object with data from two files

**Error expected?** No

**Input**
```
c1-1,c1-2,c1-3
s,o,1

```

**Input 1**
```
c2-1,c2-2
x,1

```

**Mapping**
```
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rml: <http://w3id.org/rml/> .
@prefix ex: <http://example/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix : <http://example.org/> .
@base <http://example.org/> .

:firstTM a rml:NonAssertedTriplesMap ; # This refers to the y statement in the rdf-star
    rml:logicalSource [
        rml:source [ a rml:Source, rml:RelativePathSource;
            rml:path "data1.csv";
        ];
        rml:referenceFormulation rml:CSV
    ];
    rml:subjectMap [
        rml:template "http://example/{c1-1}"
    ];
    rml:predicateObjectMap [
        rml:predicate ex:p ;
        rml:objectMap [
            rml:template "http://example/{c1-2}"
        ]
    ] .

:secondTM a rml:AssertedTriplesMap ; # This refers to the x statement in the rdf-star
    rml:logicalSource [
        rml:source [ a rml:Source, rml:RelativePathSource;
            rml:path "data2.csv";
        ];
        rml:referenceFormulation rml:CSV
    ];
    rml:subjectMap [
            rml:template "http://example/{c2-1}"
    ];
    rml:predicateObjectMap [
        rml:predicate ex:p; ;
        rml:objectMap [
            rml:quotedTriplesMap :firstTM ;
            rml:joinCondition [
              rml:child "c2-2" ;
              rml:parent "c1-3" ;
            ];
        ]
    ] .

```

**Output**
```
<http://example/x> <http://example/p> << <http://example/s> <http://example/p> <http://example/o> >> .

```

