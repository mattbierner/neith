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
        children.hasOwnProperty('left') ? children.left : x.left,
        children.hasOwnProperty('right') ? children.right : x.right)
};


return {
    'Binary': Binary
};

});