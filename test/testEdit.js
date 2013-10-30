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
                                    $(10,
                                        $(11, null, null),
                                        $(12, null, null)),
                                    zipper.right(zipper.down(binary.zipper(binary1))))))),
                    [1, 2, 3, 4, 5, 10, 11, 12]);
            }],
            ["Set to empty",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.setNode(
                                    null,
                                    zipper.right(zipper.down(binary.zipper(binary1))))))),
                    [1, 2, 3, 4, 5]);
            }],
            ["modify Node",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.modifyNode(
                                    function(x) {
                                        return $(x.value * 10, x.left, x.right)
                                    },
                                    zipper.right(zipper.down(binary.zipper(binary1))))))),
                    [1, 2, 3, 4, 5, 60, 7, 8]);
            }],
            
            ["Replace Nary",
            function(){
                assert.deepEqual(
                    nary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.setNode(
                                    $n(100, {}),
                                    zipper.right(zipper.down(nary.zipper(nary1))))))),
                    [1, 2, 3, 4, 5, 100, 8]);
            }],
            ["Insert Left Nary",
            function(){
                assert.deepEqual(
                    nary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.insertLeft(
                                    100,
                                    $n(100, {
                                        101: $n(101, {})
                                    }),
                                    zipper.right(zipper.down(nary.zipper(nary1))))))),
                    [1, 2, 3, 4, 5, 100, 101, 6, 7, 8]);
            }],
            ["Insert Left Nary Stays on current node",
            function(){
                assert.deepEqual(
                    nary.walk(
                        zipper.getNode(
                                zipper.insertLeft(
                                    100,
                                    $n(100, {
                                        101: $n(101, {})
                                    }),
                                    zipper.right(zipper.down(nary.zipper(nary1)))))),
                    [6, 7]);
            }],
            ["Insert Left Nary at leftmost",
            function(){
                assert.deepEqual(
                    nary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.insertLeft(
                                    100,
                                    $n(100, {
                                        101: $n(101, {})
                                    }),
                                    zipper.down(nary.zipper(nary1)))))),
                    [1, 100, 101, 2, 3, 4, 5, 6, 7, 8]);
            }],
            
            ["Insert Right Nary",
            function(){
                assert.deepEqual(
                    nary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.insertRight(
                                    100,
                                    $n(100, {
                                        101: $n(101, {})
                                    }),
                                    zipper.right(zipper.down(nary.zipper(nary1))))))),
                    [1, 2, 3, 4, 5, 6, 7, 100, 101, 8]);
            }],
            
            
            ["Append Child",
            function(){
                assert.deepEqual(
                    nary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.appendChild(
                                    100,
                                    $n(100, {
                                        101: $n(101, {})
                                    }),
                                    zipper.right(zipper.down(nary.zipper(nary1))))))),
                    [1, 2, 3, 4, 5, 6, 7, 100, 101, 8]);
                
                assert.deepEqual(
                    nary.walk(
                        zipper.getNode(
                            zipper.root(
                                zipper.appendChild(
                                    100,
                                    $n(100, {
                                        101: $n(101, {})
                                    }),
                                    zipper.down(zipper.down(nary.zipper(nary1))))))),
                    [1, 2, 3, 100, 101, 4, 5, 6, 7, 8]);
            }],
        ],
    };
});
