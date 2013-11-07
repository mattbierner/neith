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
        'module': "Movement",
        'tests': [
            ["Simple down",
            function(){
                assert.deepEqual(
                    binary.walk(tree.getNode(zipper.down(binary.zipper(binary1)))),
                    [2, 3, 4, 5]);
                assert.deepEqual(
                    binary.walk(tree.getNode(zipper.down(zipper.down(binary.zipper(binary1))))),
                    [3]);
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
                assert.deepEqual(
                    binary.walk(tree.getNode(zipper.up(zipper.down(binary.zipper(binary1))))),
                    [1, 2, 3, 4, 5, 6, 7, 8]);
                assert.deepEqual(
                    binary.walk(tree.getNode(zipper.up(zipper.down(zipper.down(binary.zipper(binary1)))))),
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
                    binary.walk(tree.getNode(zipper.left(zipper.right(zipper.down(binary.zipper(binary1)))))),
                    [2, 3, 4, 5]);
                assert.deepEqual(
                    binary.walk(tree.getNode(zipper.left(zipper.right(zipper.down(zipper.left(zipper.right(zipper.down(binary.zipper(binary1))))))))),
                    [3]);
            }],
            ["Empty Left",
            function(){
                assert.equal(
                    zipper.left(binary.zipper(binary1)),
                    null);
            }],

            ["Simple Right",
            function(){
                assert.deepEqual(
                    binary.walk(tree.getNode(zipper.right(zipper.down(binary.zipper(binary1))))),
                    [6, 7, 8]);
                assert.deepEqual(
                    binary.walk(tree.getNode(zipper.right(zipper.down(zipper.down(binary.zipper(binary1)))))),
                    [4, 5]);
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
