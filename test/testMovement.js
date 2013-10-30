define(['neith/zipper', 'binary', 'nary'], function(zipper, binary, nary){
    
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
        'module': "Movement",
        'tests': [
            ["Simple down",
            function(){
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.down(binary.zipper(binary1)))),
                    [2, 3, 4, 5]);
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.down(zipper.down(binary.zipper(binary1))))),
                    [3]);
            }],
            ["Empty",
            function(){
                assert.equal(
                    zipper.down(binary.zipper($(10, null, null))),
                    null);
            }],
            ["Edit",
            function(){
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.root(
                        zipper.setNode(
                            $(10, null, $(11, null, null)),
                            zipper.down(binary.zipper(binary1)))))),
                    [1, 10, 11, 6, 7, 8]);
            }],
            
            ["Simple up",
            function(){
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.up(zipper.down(binary.zipper(binary1))))),
                    [1, 2, 3, 4, 5, 6, 7, 8]);
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.up(zipper.down(zipper.down(binary.zipper(binary1)))))),
                    [2, 3, 4, 5]);
            }],
            ["Empty Up",
            function(){
                assert.equal(
                    zipper.up(binary.zipper($(10, null, null))),
                    null);
            }],
            
            ["Simple Left",
            function(){
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.left(zipper.right(zipper.down(binary.zipper(binary1)))))),
                    [2, 3, 4, 5]);
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.left(zipper.right(zipper.down(zipper.left(zipper.right(zipper.down(binary.zipper(binary1))))))))),
                    [3]);
            }],
            ["Empty Left",
            function(){
                assert.equal(
                    zipper.left(binary.zipper(binary1)),
                    null);
            }],
            ["Edit Left",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(zipper.root(
                            zipper.setNode(
                                $(10, null, null),
                                zipper.left(zipper.right(zipper.down(binary.zipper(binary1)))))))),
                    [1, 10, 6, 7, 8]);
            }],
            
            ["Simple Right",
            function(){
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.right(zipper.down(binary.zipper(binary1))))),
                    [6, 7, 8]);
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.right(zipper.down(zipper.down(binary.zipper(binary1)))))),
                    [4, 5]);
            }],
            ["Empty",
            function(){
                assert.equal(
                    zipper.right(binary.zipper(binary1)),
                    null);
            }],
            ["Edit Right",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(zipper.root(
                            zipper.setNode(
                                $(10, null, null),
                                zipper.right(zipper.down(binary.zipper(binary1))))))),
                    [1, 2, 3, 4, 5, 10]);
            }],
            
            ["Move to child",
            function(){
                assert.deepEqual(
                    zipper.getNode(
                        zipper.child('7', zipper.child('6', nary.zipper(nary1)))).value,
                    7);
            }],
            ["Move to non existant child",
            function(){
                assert.deepEqual(
                    zipper.child('x', zipper.child('6', nary.zipper(nary1))),
                    null);
            }],
            
            ["Sibling",
            function(){
                assert.deepEqual(
                    zipper.getNode(
                        zipper.sibling('2', zipper.child('6', nary.zipper(nary1)))).value,
                    2);
                assert.deepEqual(
                    zipper.getNode(
                        zipper.sibling('8', zipper.child('6', nary.zipper(nary1)))).value,
                    8);
            }],
            ["Empty Sibling",
            function(){
                assert.deepEqual(
                    zipper.sibling('x', zipper.child('6', nary.zipper(nary1))),
                    null);
            }]
        ],
    };
});
