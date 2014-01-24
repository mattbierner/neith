var zipper = require('../index').zipper;
var tree = require('../index').tree;

var binary = require('../examples/binary');

var $ = function(val, l, r) {
    return new binary.Binary(val, l, r);
};


exports.parent = function(test){
    test.deepEqual(
        tree.node(zipper.prevDfs(zipper.down(binary.zipper($(1, $(2, null, null), null))))).value,
        1);
    test.done();
};

exports.rightSibling = function(test) {
    var t = $(1,
        $(2,
            $(3, null, null),
            $(4, null, null)),
        $(5, null, null));
    test.deepEqual(
        tree.node(
            zipper.prevDfs(
                zipper.right(
                    zipper.down(
                        binary.zipper(t)))))
            .value,
        4);
    test.done();
};

exports.emptyPrev = function(test){
    test.equal(
        zipper.prevDfs(binary.zipper($(1, null, null))),
        null);
    
    test.done();
};
