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



exports.simple = function(test) {
    test.deepEqual(
        binary.walk(tree.node(zipper.root(
            tree.setNode(
                $(10, null, $(11, null, null)),
                zipper.down(binary.zipper(binary1)))))),
        [1, 10, 11, 6, 7, 8]);
    
    test.done();
};


exports.set_falsy = function(test) {
    var n = tree.node(zipper.root(
        tree.setNode(null,
            zipper.down(binary.zipper(binary1)))));
    
    test.equal(
        n.value,
        1);
    
    test.equal(
        n.left,
        null);
    
    test.equal(
        n.right.value,
        6);
    
    test.done();
};

exports.editLeft = function(test) {
    test.deepEqual(
        binary.walk(
            tree.node(zipper.root(
                tree.setNode(
                    $(10, null, null),
                    zipper.left(zipper.right(zipper.down(binary.zipper(binary1)))))))),
        [1, 10, 6, 7, 8]);
    test.done();
};

exports.editRight = function(test) {
    test.deepEqual(
        binary.walk(
            tree.node(zipper.root(
                tree.setNode(
                    $(10, null, null),
                    zipper.right(zipper.down(binary.zipper(binary1))))))),
        [1, 2, 3, 4, 5, 10]);
    test.done();
};

exports.simpleRemove = function(test) {
    test.deepEqual(
        binary.walk(
            tree.node(
                zipper.root(
                    zipper.remove(zipper.down(binary.zipper(binary1)))))),
        [1, 6, 7, 8]);
    test.deepEqual(
        binary.walk(
            tree.node(
                zipper.root(
                    zipper.remove(zipper.right(zipper.down(zipper.down(binary.zipper(binary1)))))))),
        [1, 2, 3, 6, 7, 8]);
    
    test.done();
};

exports.removeReturnsDFS = function(test) {
    test.deepEqual(
        binary.walk(
            tree.node(
                zipper.remove(zipper.right(zipper.down(binary.zipper(binary1)))))),
        [2, 3, 4, 5]);
    
    test.done();
};

exports.removeMovesToParentOnEmpty = function(test) {
    test.deepEqual(
        binary.walk(
            tree.node(
                zipper.root(
                    zipper.remove(zipper.down(zipper.down(binary.zipper(binary1))))))),
        [1, 2, 4, 5, 6, 7, 8]);
    
    test.done();
};

exports.set = function(test) {
    test.deepEqual(
        binary.walk(
            tree.node(
                zipper.root(
                    tree.setNode(
                        $(10,
                            $(11, null, null),
                            $(12, null, null)),
                        zipper.right(zipper.down(binary.zipper(binary1))))))),
        [1, 2, 3, 4, 5, 10, 11, 12]);
    
    test.done();
};

exports.setToEmpty = function(test) {
    test.deepEqual(
        binary.walk(
            tree.node(
                zipper.root(
                    tree.setNode(
                        null,
                        zipper.right(zipper.down(binary.zipper(binary1))))))),
        [1, 2, 3, 4, 5]);
    
    test.done();
};

exports.modify = function(test) {
    test.deepEqual(
        binary.walk(
            tree.node(
                zipper.root(
                    tree.modifyNode(
                        function(x) {
                            return $(x.value * 10, x.left, x.right)
                        },
                        zipper.right(zipper.down(binary.zipper(binary1))))))),
        [1, 2, 3, 4, 5, 60, 7, 8]);
    
    test.done();
};

exports.replaceNary = function(test) {
    test.deepEqual(
        nary.walk(
            tree.node(
                zipper.root(
                    tree.setNode(
                        $n(100, {}),
                        zipper.right(zipper.down(nary.zipper(nary1))))))),
        [1, 2, 3, 4, 5, 100, 8]);
    test.done();
};

exports.insertLeftNary = function(test) {
    test.deepEqual(
        nary.walk(
            tree.node(
                zipper.root(
                    tree.insertLeft(
                        100,
                        $n(100, {
                            101: $n(101, {})
                        }),
                        zipper.right(zipper.down(nary.zipper(nary1))))))),
        [1, 2, 3, 4, 5, 100, 101, 6, 7, 8]);
    
    test.done();
};

exports.insertLeftSaysOnCurrentNode = function(test) {
    test.deepEqual(
        nary.walk(
            tree.node(
                    tree.insertLeft(
                        100,
                        $n(100, {
                            101: $n(101, {})
                        }),
                        zipper.right(zipper.down(nary.zipper(nary1)))))),
        [6, 7]);
    
    test.done();
};

exports.insertLeftAtLeftmost = function(test) {
    test.deepEqual(
        nary.walk(
            tree.node(
                zipper.root(
                    tree.insertLeft(
                        100,
                        $n(100, {
                            101: $n(101, {})
                        }),
                        zipper.down(nary.zipper(nary1)))))),
        [1, 100, 101, 2, 3, 4, 5, 6, 7, 8]);
    
    test.done();
};

exports.insertRightNary = function(test) {
    test.deepEqual(
        nary.walk(
            tree.node(
                zipper.root(
                    tree.insertRight(
                        100,
                        $n(100, {
                            101: $n(101, {})
                        }),
                        zipper.right(zipper.down(nary.zipper(nary1))))))),
        [1, 2, 3, 4, 5, 6, 7, 100, 101, 8]);
    
    test.done();
};

exports.insertChild = function(test) {
    var z = zipper.down(nary.zipper(nary1));
    
    test.deepEqual(
        nary.walk(
            tree.node(
                zipper.root(
                    tree.insertChild(
                        100,
                        $n(100, {
                            101: $n(101, {})
                        }),
                        z)))),
        [1, 2, 100, 101, 3, 4, 5, 6, 7, 8]);
    
    test.done();
};

exports.insertChildOnLeaf = function(test) {
    var z = zipper.down(zipper.down(nary.zipper(nary1)));
    test.equal(
        zipper.isLeaf(z), 
        true)
        
    test.deepEqual(
        nary.walk(
            tree.node(
                zipper.root(
                    tree.insertChild(
                        100,
                        $n(100, {
                            101: $n(101, {})
                        }),
                        z)))),
        [1, 2, 3, 100, 101, 4, 5, 6, 7, 8]);
    
    test.done();
};

exports.append = function(test) {
    test.deepEqual(
        nary.walk(
            tree.node(
                zipper.root(
                    tree.appendChild(
                        100,
                        $n(100, {
                            101: $n(101, {})
                        }),
                        zipper.right(zipper.down(nary.zipper(nary1))))))),
        [1, 2, 3, 4, 5, 6, 7, 100, 101, 8]);
    
    test.done();
};

exports.appendLeaf = function(test) {
    test.deepEqual(
        nary.walk(
            tree.node(
                zipper.root(
                    tree.appendChild(
                        100,
                        $n(100, {
                            101: $n(101, {})
                        }),
                        zipper.down(zipper.down(nary.zipper(nary1))))))),
        [1, 2, 3, 100, 101, 4, 5, 6, 7, 8]);
    
    test.done();
};

