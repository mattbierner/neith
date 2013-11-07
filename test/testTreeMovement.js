define(['neith/zipper',
        'neith/tree',
        'binary',
        'nary'],
function(zipper,
        tree,
        binary,
        nary){
    
    var $ = function(val, l, r) {
        return new binary.Binary(val, l, r);
    };
    
    var $n = function(val, children) {
        return new nary.Nary(val, Object.keys(children), children);
    };
    
    var binary1 = $(1,
        $(2,
            $(3, null, null),
            $(4,
                $(5, null, null))),
        $(6,
            null,
            $(7,
                $(8, null, null),
                null)));
    
    var nary1 = $n(1, {
        2: $n(2, {
            3: $n(3, {}),
            4: $n(4, {
                5: $n(5, {}),
            }),
        }),
        6: $n(6, {
            7: $n(7, {}),
        }),
        8: $n(8, {})
    });
    
    return {
        'module': "Tree Movement",
        'tests': [
            

            ["Move to child",
            function(){
                assert.deepEqual(
                    tree.node(
                        tree.child('7', tree.child('6', nary.zipper(nary1)))).value,
                    7);
            }],
            ["Move to non existant child",
            function(){
                assert.deepEqual(
                    tree.child('x', tree.child('6', nary.zipper(nary1))),
                    null);
            }],
            
            ["Sibling",
            function(){
                assert.deepEqual(
                    tree.node(
                        tree.sibling('2', tree.child('6', nary.zipper(nary1)))).value,
                    2);
                assert.deepEqual(
                    tree.node(
                        tree.sibling('8', tree.child('6', nary.zipper(nary1)))).value,
                    8);
            }],
            ["Empty Sibling",
            function(){
                assert.deepEqual(
                    tree.sibling('x', tree.child('6', nary.zipper(nary1))),
                    null);
            }]
        ],
    };
});
