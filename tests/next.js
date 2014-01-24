var zipper = require('../index').zipper;
var tree = require('../index').tree;

var binary = require('../examples/binary');

var $ = function(val, l, r) {
    return new binary.Binary(val, l, r);
};


exports.leftChild = function(test) {
    test.deepEqual(
        tree.node(zipper.nextDfs(binary.zipper($(1, $(2, null, null), null)))).value,
        2);
    
    test.deepEqual(
        tree.node(zipper.nextDfs(binary.zipper($(1, $(2, null, null), $(3, null, null))))).value,
        2);
    
    test.done();
};

exports.rightChild = function(test) {
    test.deepEqual(
        tree.node(zipper.nextDfs(binary.zipper($(1, null, $(2, null, null))))).value,
        2);
    test.done();
};

exports.backtrack = function(test) {
    test.deepEqual(
        tree.node(zipper.nextDfs(zipper.down(binary.zipper($(1, $(2, null, null), $(3, null, null)))))).value,
        3);
    
    test.deepEqual(
        tree.node(zipper.nextDfs(zipper.down(zipper.down(binary.zipper($(1, $(2, $(3, null, null), null), $(4, null, null))))))).value,
        4);
    
    test.deepEqual(
        tree.node(zipper.nextDfs(zipper.down(zipper.down(binary.zipper($(1, $(2, $(3, null, null), $(4, null, null)), $(5, null, null))))))).value,
        4);
    test.done();
};

exports.empty = function(test) {
    test.equal(
        zipper.nextDfs(binary.zipper($(1, null, null))),
        null);
    
    test.equal(
        zipper.nextDfs(zipper.down(binary.zipper($(1, $(2, null, null), null)))),
        null);
    test.done();
};
