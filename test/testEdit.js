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
        'module':  "Edit",
        'tests': [
              ["Edit",
            function(){
                assert.deepEqual(
                    binary.walk(tree.node(zipper.root(
                        tree.setNode(
                            $(10, null, $(11, null, null)),
                            zipper.down(binary.zipper(binary1)))))),
                    [1, 10, 11, 6, 7, 8]);
            }],
            
            ["Edit Left",
            function(){
                assert.deepEqual(
                    binary.walk(
                        tree.node(zipper.root(
                            tree.setNode(
                                $(10, null, null),
                                zipper.left(zipper.right(zipper.down(binary.zipper(binary1)))))))),
                    [1, 10, 6, 7, 8]);
            }],
            
            ["Edit Right",
            function(){
                assert.deepEqual(
                    binary.walk(
                        tree.node(zipper.root(
                            tree.setNode(
                                $(10, null, null),
                                zipper.right(zipper.down(binary.zipper(binary1))))))),
                    [1, 2, 3, 4, 5, 10]);
            }],
            
            
            
            ["Simple Remove",
            function(){
                assert.deepEqual(
                    binary.walk(
                        tree.node(
                            zipper.root(
                                zipper.remove(zipper.down(binary.zipper(binary1)))))),
                    [1, 6, 7, 8]);
                assert.deepEqual(
                    binary.walk(
                        tree.node(
                            zipper.root(
                                zipper.remove(zipper.right(zipper.down(zipper.down(binary.zipper(binary1)))))))),
                    [1, 2, 3, 6, 7, 8]);
            }],
            ["Remove returns DFS",
            function(){
                assert.deepEqual(
                    binary.walk(
                        tree.node(
                            zipper.remove(zipper.right(zipper.down(binary.zipper(binary1)))))),
                    [2, 3, 4, 5]);
            }],
            
            ["Set Node",
            function(){
                assert.deepEqual(
                    binary.walk(
                        tree.node(
                            zipper.root(
                                tree.setNode(
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
                        tree.node(
                            zipper.root(
                                tree.setNode(
                                    null,
                                    zipper.right(zipper.down(binary.zipper(binary1))))))),
                    [1, 2, 3, 4, 5]);
            }],
            ["modify Node",
            function(){
                assert.deepEqual(
                    binary.walk(
                        tree.node(
                            zipper.root(
                                tree.modifyNode(
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
                        tree.node(
                            zipper.root(
                                tree.setNode(
                                    $n(100, {}),
                                    zipper.right(zipper.down(nary.zipper(nary1))))))),
                    [1, 2, 3, 4, 5, 100, 8]);
            }],
            ["Insert Left Nary",
            function(){
                assert.deepEqual(
                    nary.walk(
                        tree.node(
                            zipper.root(
                                tree.insertLeft(
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
                        tree.node(
                                tree.insertLeft(
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
                        tree.node(
                            zipper.root(
                                tree.insertLeft(
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
                        tree.node(
                            zipper.root(
                                tree.insertRight(
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
                        tree.node(
                            zipper.root(
                                tree.appendChild(
                                    100,
                                    $n(100, {
                                        101: $n(101, {})
                                    }),
                                    zipper.right(zipper.down(nary.zipper(nary1))))))),
                    [1, 2, 3, 4, 5, 6, 7, 100, 101, 8]);
                
                assert.deepEqual(
                    nary.walk(
                        tree.node(
                            zipper.root(
                                tree.appendChild(
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
