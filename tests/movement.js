var zipper = require('../index').zipper;
var tree = require('../index').tree;

var stream = require('nu-stream').stream;

var binary = require('../examples/binary');
var nary = require('../examples/nary');


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



exports.down = function(test) {
    var z = zipper.down(binary.zipper(binary1));
    
    test.deepEqual(
        binary.walk(tree.node(z)),
        [2, 3, 4, 5]);
    test.deepEqual(
        stream.toArray(tree.edgePath(z)),
        ['left', null]);
    
    var z2 = zipper.down(z);
    test.deepEqual(
        binary.walk(tree.node(z2)),
        [3]);
    test.deepEqual(
        stream.toArray(tree.edgePath(z2)),
        ['left', 'left', null]);
    
    test.done();
};

exports.emptyDown = function(test) {
    var z = zipper.down(binary.zipper($(10, null, null)));
    test.equal(
        z,
        null);
    test.done();
};

exports.up = function(test) {
    var z = zipper.up(zipper.down(binary.zipper(binary1)));
    
    test.deepEqual(
        binary.walk(tree.node(z)),
        [1, 2, 3, 4, 5, 6, 7, 8]);
    test.deepEqual(
        stream.toArray(tree.edgePath(z)),
        [null]);
    
    var z2 = zipper.up(zipper.down(zipper.down(binary.zipper(binary1))));
    test.deepEqual(
        binary.walk(tree.node(z2)),
        [2, 3, 4, 5]);
    test.deepEqual(
        stream.toArray(tree.edgePath(z2)),
        ['left', null]);
    
    test.done();
};

exports.emptyUp = function(test) {
    test.equal(
        zipper.up(binary.zipper($(10, null, null))),
        null);
    
    test.done();
};

exports.left = function(test) {
    var z = zipper.left(zipper.right(zipper.down(binary.zipper(binary1))));
    test.deepEqual(
        binary.walk(tree.node(z)),
        [2, 3, 4, 5]);
    test.deepEqual(
        stream.toArray(tree.edgePath(z)),
        ['left', null]);
    
    var z2 = zipper.left(zipper.right(zipper.down(zipper.left(zipper.right(zipper.down(binary.zipper(binary1)))))));
    test.deepEqual(
        binary.walk(tree.node(z2)),
        [3]);
    test.deepEqual(
        stream.toArray(tree.edgePath(z2)),
        ['left', 'left', null]);
    
    test.done();
};

exports.emptyLeft = function(test) {
    test.equal(
        zipper.left(binary.zipper(binary1)),
        null);
    test.done();
};

exports.right = function(test) {
    var z = zipper.right(zipper.down(binary.zipper(binary1)));
    test.deepEqual(
        binary.walk(tree.node(z)),
        [6, 7, 8]);
    test.deepEqual(
        stream.toArray(tree.edgePath(z)),
        ['right', null]);
    
    var z2 = zipper.right(zipper.down(zipper.down(binary.zipper(binary1))));
    test.deepEqual(
        binary.walk(tree.node(z2)),
        [4, 5]);
    test.deepEqual(
        stream.toArray(tree.edgePath(z2)),
        ['right', 'left', null]);
    test.done();
};

exports.emptyRight = function(test) {
    test.equal(
        zipper.right(binary.zipper(binary1)),
        null);
    test.done();
};

