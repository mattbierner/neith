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
    
    var walk = function(root, path) {
        path = path || [];
        return (root ?
            walk(root.right, walk(root.left, path.concat(root.value))) :
            path);
    };

    return {
        'module': "Movement",
        'tests': [
            ["Simple down",
            function(){
                assert.deepEqual(
                    walk(zipper.getNode(zipper.down(zipper.zipper(binary1)))),
                    [2, 3, 4, 5]);
                assert.deepEqual(
                    walk(zipper.getNode(zipper.down(zipper.down(zipper.zipper(binary1))))),
                    [3]);
            }],
            ["Empty",
            function(){
                assert.equal(
                    zipper.getNode(zipper.down(zipper.zipper($(10, null, null)))),
                    null);
            }],
            ["Edit",
            function(){
                assert.deepEqual(
                    walk(zipper.getNode(zipper.root(
                        zipper.setNode(zipper.down(zipper.zipper(binary1)), $(10, null, $(11, null, null)))))),
                    [1, 10, 11, 6, 7, 8]);
            }],
            
            ["Simple up",
            function(){
                assert.deepEqual(
                    walk(zipper.getNode(zipper.up(zipper.down(zipper.zipper(binary1))))),
                    [1, 2, 3, 4, 5, 6, 7, 8]);
                assert.deepEqual(
                    walk(zipper.getNode(zipper.up(zipper.down(zipper.down(zipper.zipper(binary1)))))),
                    [2, 3, 4, 5]);
            }],
            ["Empty",
            function(){
                assert.equal(
                    zipper.up(zipper.zipper($(10, null, null))),
                    null);
            }],
            
            ["Simple Right",
            function(){
                assert.deepEqual(
                    walk(zipper.getNode(zipper.right(zipper.down(zipper.zipper(binary1))))),
                    [6, 7, 8]);
                assert.deepEqual(
                    walk(zipper.getNode(zipper.right(zipper.down(zipper.down(zipper.zipper(binary1)))))),
                    [4, 5]);
            }],
            ["Empty",
            function(){
                assert.equal(
                    zipper.up(zipper.zipper($(10, null, null))),
                    null);
            }],
        ],
    };
});
