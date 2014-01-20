# ChangeLog #

## 1.2.0 - November 16, 2014
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