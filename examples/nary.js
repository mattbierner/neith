/**
 * @fileOverview Basic k-ary tree for testing purposes.
 */
var zipper = require('../index').zipper;
var tree = require('../index').tree;
var stream = require('nu-stream').stream;

/* Nary
 ******************************************************************************/
var Nary = function(value, children, childValues) {
    this.value = value;
    this.children = children;
    this.childValues = childValues;
};

Nary.construct = function(x, edges, children) {
    var c = stream.toArray(edges);
    return new Nary(x.value,
        c.map(tree.pairKey),
        children());
};

var walk = function(root, path) {
    path = path || [];
    return (root ?
        root.children.reduce(function(p, c) {
            return walk(root.childValues[c], p)
        }, path.concat(root.value)) :
        path);
};

var naryZipper = function(root) {
    return tree.treeZipper(
        function(x) { return stream.from(x.children); },
        function(x, k) { return x.childValues[k]; },
        Nary.construct,
        root);
};

/* Export
 ******************************************************************************/
exports.Nary = Nary;
exports.walk = walk;
exports.zipper=  naryZipper;
