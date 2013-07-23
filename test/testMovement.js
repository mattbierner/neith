define(['neith/zipper', 'binary'], function(zipper, binary){
    
    var $ = function(val, l, r) {
        return new binary.Binary(val, l, r);
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

    return {
        'module': "Movement",
        'tests': [
            ["Simple down",
            function(){
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.down(zipper.treeZipper(binary1)))),
                    [2, 3, 4, 5]);
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.down(zipper.down(zipper.treeZipper(binary1))))),
                    [3]);
            }],
            ["Empty",
            function(){
                assert.equal(
                    zipper.getNode(zipper.down(zipper.treeZipper($(10, null, null)))),
                    null);
            }],
            ["Edit",
            function(){
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.root(
                        zipper.setNode(zipper.down(zipper.treeZipper(binary1)), $(10, null, $(11, null, null)))))),
                    [1, 10, 11, 6, 7, 8]);
            }],
            
            ["Simple up",
            function(){
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.up(zipper.down(zipper.treeZipper(binary1))))),
                    [1, 2, 3, 4, 5, 6, 7, 8]);
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.up(zipper.down(zipper.down(zipper.treeZipper(binary1)))))),
                    [2, 3, 4, 5]);
            }],
            ["Empty Up",
            function(){
                assert.equal(
                    zipper.up(zipper.treeZipper($(10, null, null))),
                    null);
            }],
            
            ["Simple Right",
            function(){
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.right(zipper.down(zipper.treeZipper(binary1))))),
                    [6, 7, 8]);
                assert.deepEqual(
                    binary.walk(zipper.getNode(zipper.right(zipper.down(zipper.down(zipper.treeZipper(binary1)))))),
                    [4, 5]);
            }],
            ["Empty",
            function(){
                assert.equal(
                    zipper.right(zipper.treeZipper(binary1)),
                    null);
            }],
            ["Edit Right",
            function(){
                assert.deepEqual(
                    binary.walk(
                        zipper.getNode(zipper.root(
                            zipper.setNode(
                                zipper.right(zipper.down(zipper.treeZipper(binary1))),
                                $(10, null, null))))),
                    [1, 2, 3, 4, 5, 10]);
            }],
        ],
    };
});
