var zipper = require('../index').zipper;
var tree = require('../index').tree;
var walk = require('../index').walk;

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
            3: $n(5, {}),
        }),
    }),
    6: $n(6, {
        7: $n(7, {}),
    }),
    8: $n(8, {})
});


exports.walk = function(test) {
    var z = walk.postWalk(
        tree.modifyNode.bind(null, function(x) {
            return new binary.Binary(x.value * 10, x.left, x.right);
        }), binary.zipper(binary1));
    
    test.deepEqual(
        binary.walk(tree.node(z)),
        [10, 20, 30, 40, 50, 60, 70, 80]);
    
    test.done();
};

exports.walk_sub = function(test) {
    var z = walk.postWalk(
        tree.modifyNode.bind(null, function(x) {
            return new binary.Binary(x.value * 10, x.left, x.right);
        }), zipper.down(binary.zipper(binary1)));
    
    test.deepEqual(
        binary.walk(tree.node(zipper.up(z))),
        [1, 20, 30, 40, 50, 6, 7, 8]);
    
    test.done();
};

exports.pre_order = function(test) {
    var p = []
    var z = walk.preWalk(
        tree.modifyNode.bind(null, function(x) {
            p.push(x.value);
            return x;
        }), binary.zipper(binary1));
    
    test.deepEqual(
        p,
        [1, 2, 3, 4, 5, 6, 7, 8]);
    
    test.done();
};

exports.post_order = function(test) {
    var p = []
    var z = walk.postWalk(
        tree.modifyNode.bind(null, function(x) {
            p.push(x.value);
            return x;
        }), binary.zipper(binary1));
    
    test.deepEqual(
        p,
        [3, 5, 4, 2, 8, 7, 6, 1]);
    
    test.done();
};

exports.post_using_previous_edit = function(test) {
    var z = walk.postWalk(
        tree.modifyNode.bind(null, function(x) {
            return new binary.Binary(x.value + (x.left ? x.left.value : 0) + (x.right ? x.right.value : 0), x.left, x.right);
        }), binary.zipper(binary1));
    
    test.deepEqual(
        binary.walk(tree.node(z)),
        [36, 14, 3, 9, 5, 21, 15, 8]);
    
    test.done();
};



