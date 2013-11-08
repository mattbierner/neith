define(['neith/zipper',
        'neith/list',
        'nu/stream',
        'nu/gen',
        'binary',
        'nary'],
function(zipper,
        list,
        stream,
        gen,
        binary,
        nary){
    
    var list1 = stream.from([1, 2, 3]);
    
    var nestedList = stream.from([
        stream.from([1, 2, 3]),
        stream.from([4, 5, 6])]);

    
    return {
        'module': "List",
        'tests': [
            ["Extract",
            function(){
                assert.deepEqual(
                     zipper.extract(
                        zipper.down(list.listZipper(list1))),
                    1);
                assert.deepEqual(
                     zipper.extract(
                        zipper.right(zipper.down(list.listZipper(list1)))),
                    2);
            }],
            
            ["Move to down and zip up",
            function(){
                assert.deepEqual(
                    stream.toArray(zipper.extract(
                        zipper.up(zipper.down(list.listZipper(list1))))),
                    [1, 2, 3]);
            }],
            
            ["Move off left",
            function(){
                assert.deepEqual(
                    zipper.left(zipper.down(list.listZipper(list1))),
                    null);
            }],
            ["Move off right",
            function(){
                assert.deepEqual(
                    zipper.right(zipper.right(zipper.right(zipper.down(list.listZipper(list1))))),
                    null);
            }],
            
            ["Nexted move down down to inner",
            function(){
                assert.deepEqual(
                    stream.toArray(zipper.extract(
                        zipper.down(list.listZipper(nestedList)))),
                    [1, 2, 3]);
            }],
            ["Move to down to inner",
            function(){
                assert.deepEqual(
                    zipper.extract(
                        zipper.down(zipper.down(list.listZipper(nestedList)))),
                    1);
            }],
            ["edit inner zip up",
            function(){
                assert.deepEqual(
                    stream.toArray(stream.concat(zipper.extract(
                        zipper.root(
                            zipper.insertLeft(0, zipper.down(zipper.down(list.listZipper(nestedList)))))))),
                    [0, 1, 2, 3, 4, 5, 6]);
            }],
            
            ["Inf right",
            function(){
                var z = zipper.down(list.listZipper(gen.range(0, Infinity)));
                
                assert.deepEqual(
                     zipper.extract(z),
                    0);
                
                assert.deepEqual(
                     zipper.extract(
                        zipper.right(z)),
                    1);
                
               assert.deepEqual(
                     zipper.extract(
                        zipper.right(zipper.right(zipper.right(z)))),
                    3);
               
               var s = zipper.extract(zipper.up(zipper.insertRight(100, z)));
               assert.deepEqual(
                   stream.first(s),
                   0);
                 assert.deepEqual(
                   stream.first(stream.rest(s)),
                   100);
                  assert.deepEqual(
                   stream.first(stream.rest(stream.rest(s))),
                   1);
            }],
            ["Inf Bidirectional",
            function(){
                var z = list.listZipperIn(
                        gen.range(-1, -Infinity, -1),
                        0,
                        gen.range(1, Infinity));
                
                assert.deepEqual(
                     zipper.extract(z),
                    0);
                 
                assert.deepEqual(
                     zipper.extract(zipper.right(z)),
                    1);
                
                assert.deepEqual(
                     zipper.extract(zipper.left(z)),
                    -1);
            }],
            
            ["Array",
            function(){
                var z = list.arrayZipper([0, 1, 2, 3]);
                assert.deepEqual(
                     zipper.extract(
                        zipper.down(z)),
                    0);
                assert.deepEqual(
                     zipper.extract(
                        zipper.right(zipper.down(z))),
                    1);
                
                 assert.deepEqual(
                     zipper.extract(
                        zipper.up(zipper.down(z))),
                    [0, 1, 2, 3]);
            }],
        ],
    };
});
