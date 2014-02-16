/**
 * @fileOverview Very basic binary tree zipper.
 */
var zipper = require('../index').zipper;
var tree = require('../index').tree;

var stream = require('nu-stream').stream;

/* Binary
 ******************************************************************************/
var Binary = function(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
};

Binary.construct = function(x, _, getChilden) {
    var children = getChilden();
    return new Binary(x.value,
        children.left,
        children.right)
};


var walk = function(root, path) {
    path = path || [];
    return (root ?
        walk(root.right, walk(root.left, path.concat(root.value))) :
        path);
};

var binaryZipper = function(root) {
    return tree.treeZipper(
        function(x) {
            if (x.left && x.right)
                return stream.from(['left', 'right']);
            else if (x.left)
                return stream.from(['left']);
            else if (x.right)
                return stream.from(['right']);
            return stream.NIL;
        },
        function(r, c) { return r[c]; },
        Binary.construct,
        root);
};

/* Export
 ******************************************************************************/
exports.Binary = Binary;
exports.walk = walk;
exports.zipper = binaryZipper;
