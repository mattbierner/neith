define(['neith/zipper',
        'binary',
        'nary'],
function(zipper,
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
        'module':  "Edit",
        'tests': [
            ["Simple Remove",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.removeNode(zipper.down(binary.zipper(binary1)))))),
                    [1, 6, 7, 8]);
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.removeNode(zipper.right(zipper.down(zipper.down(binary.zipper(binary1)))))))),
                    [1, 2, 3, 6, 7, 8]);
            }],
            ["Remove returns DFS",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(
                            zipper.removeNode(zipper.right(zipper.down(binary.zipper(binary1)))))),
                    [2, 3, 4, 5]);
            }],
            
            ["Set Node",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.setNode(
                                    zipper.right(zipper.down(binary.zipper(binary1))),
                                    $(10,
                                        $(11, null, null),
                                        $(12, null, null)))))),
                    [1, 2, 3, 4, 5, 10, 11, 12]);
            }],
            ["Set to empty",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.setNode(
                                    zipper.right(zipper.down(binary.zipper(binary1))),
                                    null)))),
                    [1, 2, 3, 4, 5]);
            }],
            ["modify Node",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.modifyNode(
                                    zipper.right(zipper.down(binary.zipper(binary1))),
                                    function(x) {
                                        return $(x.value * 10, x.left, x.right)
                                    })))),
                    [1, 2, 3, 4, 5, 60, 7, 8]);
            }],
            
            ["Replace Nary",
            function(){
                assert.deepEqual(
                    nary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.setNode(
                                    zipper.right(zipper.down(nary.zipper(nary1))),
                                    $n(100, {}))))),
                    [1, 2, 3, 4, 5, 100, 8]);
            }],
            ["Insert Left Nary",
            function(){
                assert.deepEqual(
                    nary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.insertLeft(
                                    zipper.right(zipper.down(nary.zipper(nary1))),
                                    100,
                                    $n(100, {
                                        101: $n(101, {})
                                    }))))),
                    [1, 2, 3, 4, 5, 100, 101, 6, 7, 8]);
            }],
        ],
    };
});
