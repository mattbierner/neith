/**
 * @fileOverview Basic binary tree for testing purposes.
 */
define(['neith/zipper'],
function(zipper){

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

Nary.construct = function(x, children, values) {
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
    return zipper.zipper(
        function(x) { return x.children; },
        function(x, k) { return x.childValues[k]; },
        Nary.construct,
        root);
};

/* Export
 ******************************************************************************/
return {
    'Nary': Nary,
    'walk': walk,
    'zipper': naryZipper
};

});