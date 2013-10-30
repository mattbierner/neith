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
                        zipper.setNode(zipper.down(binary.zipper(binary1)), $(10, null, $(11, null, null)))))),
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
                                zipper.left(zipper.right(zipper.down(binary.zipper(binary1)))),
                                $(10, null, null))))),
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
                                zipper.right(zipper.down(binary.zipper(binary1))),
                                $(10, null, null))))),
                    [1, 2, 3, 4, 5, 10]);
            }],
        ],
    };
});
