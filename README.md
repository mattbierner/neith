# Neith - Javascript Zipper Library #

## About
Neith is a zipper library for Javascript. [Zippers][zippers] allow efficient
manipulation of immutable, hierarchical data structures through a formalized 
interface.

Neith supports zippers for lazy, infinite data structures. The tree module
supports zippers for variations of n-ary ordered trees with labeled edges.

### Links
* [Documentation][documentation] - API documentation


### Overview
Example are written in [Khepri][khepri] but regular JS will work fine with Neith.

```
with
    import 'neith::zipper' zipper,
    import 'neith::tree' tree,
    import 'neith::walk' walk,
    
    import 'nu::stream' stream
in {

/// Define a new zipper type for json type objects.
var objZipper = tree.treeZipper @ (
    Object.keys \> stream.from,
    (.)
    \_ _ children -> children());

/// Create a new zipper
var o = {'a': 1, 'b': {'c': 2, 'd': 3}};
var z = objZipper o;

/// Move around and extract info
z
    |> zipper.down
    |> tree.node; // 1

z
    |> zipper.down
    |> zipper.right
    |> tree.node; // {'c': 2, 'd': 3}
    
z
    |> zipper.down
    |> zipper.right
    |> zipper.down
    |> tree.edge; // 'c'


/// Labeled movement for trees
z
    |> tree.child @ 'b'
    |> tree.child @ 'd'
    |> tree.node; // 3

/// Editing
// The original object is never modified.
// Neith zippers and operations are persistent.
z
    |> tree.child @ 'b'
    |> tree.child @ 'd'
    |> tree.modifyNode @ (+, 10)
    |> tree.sibling @ 'c'
    |> (tree.modifyEdge @ \e -> e + 'xyz')
    |> zipper.up
    |> tree.sibling @ 'a'
    |> zipper.remove
    |> zipper.root
    |> tree.node; // {'b': {'cxyz': 2, 'd': 13}}

/// Walk in DFS order
walk.preWalk(console.log, z);
/*
Output:
Pair(null, {'a': 1, 'b': {'c': 2, 'd': 3}});
Pair('a', 1)
Pair('b', {'c': 2, 'd': 3})
Pair('c', 2)
Pair('d', 3)
*/
}

```


# Using Neith

## With node
Library code is in `dist_node` directory.

    $ npm install neith

    var zipper = require('neith').zipper;
    var listZipper = require('neith').list;
    
    var z = listZipper.arrayZipper([1, 2, 3]);
    zipper.extract(zipper.down(z)); // 1

## With AMD
Library code is in `dist` directory.
Include any AMD style module loader and load neith:

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="require.js"></script>
        <script type="application/javascript">
            requirejs.config({
                paths: {
                    'nu-stream': 'nu/dist',
                    'neith': 'neith/dist'
                }
            });
            require(['neith/zipper'], function(zipper) {
                ...
            });
        </script>
    </body>


## Code
Neith is written in Javascript / Khepri. [Khepri][khepri] is a ECMAScript subset
that, among other things, adds a shorted lambda function syntax. `dist` contains
the generated Javascript files while `lib` contains the source Khepri files.


[Zippers]: http://www.haskell.org/haskellwiki/Zipper
[khepri]: http://khepri-lang.com
[nu]: https://github.com/mattbierner/nu
[documentation]: https://github.com/mattbierner/neith/wiki