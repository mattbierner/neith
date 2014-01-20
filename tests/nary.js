/**
 * @fileOverview Basic binary tree for testing purposes.
 */
var zipper = require('../index').zipper;
var tree = require('../index').tree;

/* Binary
 ******************************************************************************/
var Nary = function(value, children, childValues) {
    this.value = value;
    this.children = children;
    this.childValues = childValues;
};

Nary.prototype.print = function() {
    var self = this;
    return '{' + this.value + " " +
        this.children.map(function(x) { return self[x]; }.join(' ') + '}');
};

Nary.construct = function(x, _, children, values) {
    return new Nary(x.value, children, values);
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
        function(x) { return x.children; },
        function(x, k) { return x.childValues[k]; },
        Nary.construct,
        root);
};

/* Export
 ******************************************************************************/
exports.Nary = Nary;
exports.walk = walk;
exports.zipper=  naryZipper;
