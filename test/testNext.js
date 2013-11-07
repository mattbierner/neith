define(['neith/zipper',
        'neith/tree',
        'binary'],
function(zipper,
        tree,
        binary){
    
    var $ = function(val, l, r) {
        return new binary.Binary(val, l, r);
    };
    
    return {
        'module': "Next",
        'tests': [
            ["Next Left Child",
            function(){
                assert.deepEqual(
                    tree.node(zipper.nextDfs(binary.zipper($(1, $(2, null, null), null)))).value,
                    2);
                
                assert.deepEqual(
                    tree.node(zipper.nextDfs(binary.zipper($(1, $(2, null, null), $(3, null, null))))).value,
                    2);
            }],
            ["Next Right Child",
            function(){
                assert.deepEqual(
                    tree.node(zipper.nextDfs(binary.zipper($(1, null, $(2, null, null))))).value,
                    2);
            }],
            ["Next backtrack",
            function(){
                assert.deepEqual(
                    tree.node(zipper.nextDfs(zipper.down(binary.zipper($(1, $(2, null, null), $(3, null, null)))))).value,
                    3);
                
                assert.deepEqual(
                    tree.node(zipper.nextDfs(zipper.down(zipper.down(binary.zipper($(1, $(2, $(3, null, null), null), $(4, null, null))))))).value,
                    4);
                
                assert.deepEqual(
                    tree.node(zipper.nextDfs(zipper.down(zipper.down(binary.zipper($(1, $(2, $(3, null, null), $(4, null, null)), $(5, null, null))))))).value,
                    4);
            }],
            ["Empty Next",
            function(){
                assert.equal(
                    zipper.nextDfs(binary.zipper($(1, null, null))),
                    null);
                
                assert.equal(
                    zipper.nextDfs(zipper.down(binary.zipper($(1, $(2, null, null), null)))),
                    null);
            }],
            
        ],
    };
});
