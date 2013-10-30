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
        return new nary.Nary(val, children);
    };
   
    return {
        'module': "Prev",
        'tests': [
            ["Prev Parent",
            function(){
                assert.deepEqual(
                    zipper.getNode(zipper.prevDfs(zipper.down(binary.zipper($(1, $(2, null, null), null))))).value,
                    1);
            }],
            ["Prev Right Sibling",
            function(){
                var tree = $(1,
                    $(2,
                        $(3, null, null),
                        $(4, null, null)),
                    $(5, null, null));
                assert.deepEqual(
                    zipper.getNode(
                        zipper.prevDfs(
                            zipper.right(
                                zipper.down(
                                    binary.zipper(tree)))))
                        .value,
                    4);
            }],
            ["Empty Prev",
            function(){
                assert.equal(
                    zipper.prevDfs(binary.zipper($(1, null, null))),
                    null);
            }],
            
        ],
    };
});
