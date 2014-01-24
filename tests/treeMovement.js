var zipper = require('../index').zipper;
var tree = require('../index').tree;

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


exports.moveToChild = function(test) {
    test.deepEqual(
        tree.node(
            tree.child('7', tree.child('6', nary.zipper(nary1)))).value,
        7);
    test.done();
};

exports.nonExistantChild = function(test) {
    test.deepEqual(
        tree.child('x', tree.child('6', nary.zipper(nary1))),
        null);
    
    test.done();
};

exports.sibling = function(test) {
    test.deepEqual(
        tree.node(
            tree.sibling('2', tree.child('6', nary.zipper(nary1)))).value,
        2);
    test.deepEqual(
        tree.node(
            tree.sibling('8', tree.child('6', nary.zipper(nary1)))).value,
        8);
    test.done();
};

exports.emptySibling = function(test) {
    test.deepEqual(
        tree.sibling('x', tree.child('6', nary.zipper(nary1))),
        null);
    test.done();
};

