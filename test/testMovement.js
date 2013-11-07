define(['neith/zipper',
        'neith/tree',
        'nu/stream',
        'binary',
        'nary'],
function(zipper,
        tree,
        stream,
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
        'module': "Movement",
        'tests': [
            ["Simple down",
            function(){
                var z = zipper.down(binary.zipper(binary1));
                
                assert.deepEqual(
                    binary.walk(tree.node(z)),
                    [2, 3, 4, 5]);
                assert.deepEqual(
                    stream.toArray(tree.edgePath(z)),
                    ['left', null]);
                
                var z2 = zipper.down(z);
                assert.deepEqual(
                    binary.walk(tree.node(z2)),
                    [3]);
                assert.deepEqual(
                    stream.toArray(tree.edgePath(z2)),
                    ['left', 'left', null]);
            }],
            ["Empty down",
            function(){
                var z = zipper.down(binary.zipper($(10, null, null)));
                assert.equal(
                    z,
                    null);
            }],

            ["Simple up",
            function(){
                var z = zipper.up(zipper.down(binary.zipper(binary1)));
                
                assert.deepEqual(
                    binary.walk(tree.node(z)),
                    [1, 2, 3, 4, 5, 6, 7, 8]);
                assert.deepEqual(
                    stream.toArray(tree.edgePath(z)),
                    [null]);
                
                var z2 = zipper.up(zipper.down(zipper.down(binary.zipper(binary1))));
                assert.deepEqual(
                    binary.walk(tree.node(z2)),
                    [2, 3, 4, 5]);
                assert.deepEqual(
                    stream.toArray(tree.edgePath(z2)),
                    ['left', null]);
            }],
            ["Empty Up",
            function(){
                assert.equal(
                    zipper.up(binary.zipper($(10, null, null))),
                    null);
            }],
            
            ["Simple Left",
            function(){
                var z = zipper.left(zipper.right(zipper.down(binary.zipper(binary1))));
                assert.deepEqual(
                    binary.walk(tree.node(z)),
                    [2, 3, 4, 5]);
                assert.deepEqual(
                    stream.toArray(tree.edgePath(z)),
                    ['left', null]);
                
                var z2 = zipper.left(zipper.right(zipper.down(zipper.left(zipper.right(zipper.down(binary.zipper(binary1)))))));
                assert.deepEqual(
                    binary.walk(tree.node(z2)),
                    [3]);
                assert.deepEqual(
                    stream.toArray(tree.edgePath(z2)),
                    ['left', 'left', null]);
            }],
            ["Empty Left",
            function(){
                assert.equal(
                    zipper.left(binary.zipper(binary1)),
                    null);
            }],

            ["Simple Right",
            function(){
                var z = zipper.right(zipper.down(binary.zipper(binary1)));
                assert.deepEqual(
                    binary.walk(tree.node(z)),
                    [6, 7, 8]);
                assert.deepEqual(
                    stream.toArray(tree.edgePath(z)),
                    ['right', null]);
                
                var z2 = zipper.right(zipper.down(zipper.down(binary.zipper(binary1))));
                assert.deepEqual(
                    binary.walk(tree.node(z2)),
                    [4, 5]);
                assert.deepEqual(
                    stream.toArray(tree.edgePath(z2)),
                    ['right', 'left', null]);
            }],
            ["Empty",
            function(){
                assert.equal(
                    zipper.right(binary.zipper(binary1)),
                    null);
            }],

            
        ],
    };
});
