# ChangeLog #

## 1.6.4 - April 11, 2014
* Better dirty marking to construct fewer nodes.
* Lazy `path` impl.
* Fixed parent potentially returning the dirty parent value instead of the
  reconstructed one.

## 1.6.3 - April 10, 2014
* Performance improvements though recompile with khepri V0.23.0

## 1.6.2 - April 7, 2014
* Performance improvements though recompile with khepri V0.21.13

## 1.6.0 - Feb 26, 2014
* Added `tree::forChildren` to visit all children.
* Changed behavior of `walk` to be more predictable. This breaks support for some
  previous things, like walking and removing nodes, but that was broken before
  anyways.
* Added `tree::edges` to get child edges of focus.
* Improved `any` and `seq` to not crash for null ctx.

## 1.5.1 - Feb 26, 2014
* Performance improvements.
* Down only calls `children` once.

## 1.5.0 - Feb 16, 2014
* Removed `tree.nthChild` which was not supported to be exported.
* Improved `tree.sibling` to not reconstruct parent during move.
* Added `zipper.whilst` to invoke an operation while a predicate holds.
* Added `zipper.recur` to invoke an operation multiple times until it fails.
* Added `zipper.seq` to perform 2 or more  move operations in order with correctly
  handled failure.
* Added `zipper.any` to perform 2 or more  move operations, getting result from first
  to succeed.

## 1.4.2 - Feb 16, 2014
* Publish from correct branch this time.

## 1.4.1 - Feb 16, 2014
* Only reconstruct dirty nodes.

## 1.4.0 - Feb 15, 2014
* Added `zipper.detach` to make current node the root.
* Added `zipper::walk` module for traversing trees with editing and removal.

## 1.3.0 - January 24, 2014
* Changed the arguments passed to constructNode to be safer for infinite data
  structures.
** 3 arguments instead of 4 are passed: The node, the complete ordered `Pair` 
  stream of child nodes, and a function that returns a map of edges as strings
  to values. This last argument is only for convenience. It assumes unique string
  edges and will hang with if called when a node has infinite children.
* Updated the edge to node map returned to always give the first, instead of the
  last, node for a given edge name.
* Exported `Pair` for tree with `getKey` and `getValue` getter functions for
  simplify to map. `Pair` should only ever be needed in construct functions.
* Fixed `setEdge` and `modifyEdge`.

## 1.2.0 - January 22, 2014
* Added node package

## 1.1.0 - November 16, 2013
* Updated to Nu V3.0.

## 1.0.0 - November 7, 2013
* Split labled tree functionality into own module.
** Core, generic zipper logic made more general.
** Easier to zip things without edge and labels using generic zipper.
** Tree defines a set of operations that only make sense for labled trees.
** Generic operations can also be used on trees but may have slightly different
  behavior (for example, `zipper.path` returns a list of edge node pairs vs
  `tree.path` that returns a list of edges).
* Better support for infinite data structures.
** Can be infinite in all directions (path, lefts, rights).
** Can zip things like the list of all integers.
** Custom zippers should not assume that they can reduce these streams.
* Renamed many generic zipper operations to be clearer.
* Added list zipper package for zipping generic streams and arrays.

## 0.0.0 - October 30, 2013
* Initial release.