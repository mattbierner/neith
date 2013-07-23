define([], function(){

var Binary = function(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
};
Binary.prototype.children = ['left', 'right'];

Binary.prototype.print = function() {
    return '{' + this.value + " " +
        (this.left ? this.left.print() : '{}')  + " "+
        (this.right ? this.right.print() : '{}') + '}';
};

Binary.prototype.setChild = function(name, child) {
    switch (name) {
    case 'left':
        return new Binary(this.value, child, this.right);
    case 'right':
        return new Binary(this.value, this.left, child);
    }
    throw name;
};

Binary.prototype.construct = function(x, children) {
    return new Binary(x.value,
        children.hasOwnProperty('left') ? children.left : null,
        children.hasOwnProperty('right') ? children.right : null)
};


var walk = function(root, path) {
    path = path || [];
    return (root ?
        walk(root.right, walk(root.left, path.concat(root.value))) :
        path);
};

return {
    'Binary': Binary,
    'walk': walk
};

});