# Neith - Javascript Zipper Library #

## About
Neith is a zipper library for Javascript. [Zippers][zippers] allow efficient
manipulation of immutable, hierarchical data structures through a formalized 
interface.

Neith supports zippers for lazy, infinite data structures. The tree module
supports zippers for variations of n-ary ordered trees with labeled edges.


## To Clone
    git clone https://github.com/mattbierner/neith neith
    cd neith
    git submodule update --init

# Using Neith

## Dependencies
* [Nu][nu] 3.1.x - Small functional, lazy stream library.


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
[khepri]: https://github.com/mattbierner/khepri
[nu]: https://github.com/mattbierner/nu
