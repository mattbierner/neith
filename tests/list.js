var zipper = require('../index').zipper;
var list = require('../index').list;

var stream = require('nu-stream').stream;
var gen = require('nu-stream').gen;


var list1 = stream.from([1, 2, 3]);

var nestedList = stream.from([
    stream.from([1, 2, 3]),
    stream.from([4, 5, 6])]);


exports.extract = function(test) {
    test.deepEqual(
         zipper.extract(
            zipper.down(list.listZipper(list1))),
        1);
    test.deepEqual(
         zipper.extract(
            zipper.right(zipper.down(list.listZipper(list1)))),
        2);
    
    test.done();
};

exports.moveToDownAndZipUp = function(test) {
    test.deepEqual(
        stream.toArray(zipper.extract(
            zipper.up(zipper.down(list.listZipper(list1))))),
        [1, 2, 3]);
    test.done();
};

exports.moveOffLeft = function(test) {
    test.deepEqual(
        zipper.left(zipper.down(list.listZipper(list1))),
        null);
    test.done();
};

exports.moveOffRight = function(test) {
    test.deepEqual(
        zipper.right(zipper.right(zipper.right(zipper.down(list.listZipper(list1))))),
        null);
    test.done();
};

exports.moveDownDownToInner = function(test) {
    test.deepEqual(
        stream.toArray(zipper.extract(
            zipper.down(list.listZipper(nestedList)))),
        [1, 2, 3]);
    test.done();
};

exports.moveDownToInner = function(test) {
    test.deepEqual(
        zipper.extract(
            zipper.down(zipper.down(list.listZipper(nestedList)))),
        1);
    test.done();
};

exports.editInner = function(test) {
    test.deepEqual(
        stream.toArray(stream.concat(zipper.extract(
            zipper.root(
                zipper.insertLeft(0, zipper.down(zipper.down(list.listZipper(nestedList)))))))),
        [0, 1, 2, 3, 4, 5, 6]);
    test.done();
};

exports.infRight = function(test) {
    var z = zipper.down(list.listZipper(gen.range(0, Infinity)));
    
    test.deepEqual(
         zipper.extract(z),
        0);
    
    test.deepEqual(
         zipper.extract(
            zipper.right(z)),
        1);
    
   test.deepEqual(
         zipper.extract(
            zipper.right(zipper.right(zipper.right(z)))),
        3);
   
   var s = zipper.extract(zipper.up(zipper.insertRight(100, z)));
   test.deepEqual(
       stream.first(s),
       0);
     test.deepEqual(
       stream.first(stream.rest(s)),
       100);
      test.deepEqual(
       stream.first(stream.rest(stream.rest(s))),
       1);
      test.done();
};

exports.infBidirectional = function(test) {
    var z = list.listZipperIn(
            gen.range(-1, -Infinity, -1),
            0,
            gen.range(1, Infinity));
    
    test.deepEqual(
         zipper.extract(z),
        0);
     
    test.deepEqual(
         zipper.extract(zipper.right(z)),
        1);
    
    test.deepEqual(
         zipper.extract(zipper.left(z)),
        -1);
    
    test.done();
};

exports.array = function(test) {
    var z = list.arrayZipper([0, 1, 2, 3]);
    test.deepEqual(
         zipper.extract(
            zipper.down(z)),
        0);
    test.deepEqual(
         zipper.extract(
            zipper.right(zipper.down(z))),
        1);
    
     test.deepEqual(
         zipper.extract(
            zipper.up(zipper.down(z))),
        [0, 1, 2, 3]);
     
     test.done();
};
