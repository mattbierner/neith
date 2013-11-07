/*
 * THIS FILE IS AUTO GENERATED from 'lib/tree.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "neith/zipper", "nu/stream"], (function(require, exports, zipper, stream) {
    "use strict";
    var getNode, getChild, setNode, modifyNode, child, nthChild, sibling, insertLeft, insertRight, insertChild, appendChild, treeZipper;
    var zipper = zipper,
        right = zipper["right"],
        left = zipper["left"],
        up = zipper["up"],
        down = zipper["down"],
        getChildren = zipper["getChildren"],
        stream = stream,
        foldl = stream["foldl"],
        cons = stream["cons"],
        map = stream["map"],
        toArray = stream["toArray"];
    var indexOf = (function(e, s) {
        return foldl((function(p, c, i) {
            return ((p >= 0) ? p : ((c === e) ? i : p));
        }), -1, s);
    });
    var Pair = (function(key, value) {
        return ({
            "key": key,
            "value": value
        });
    });
    var key = (function(x) {
        return x.key;
    });
    var value = (function(x) {
        return x.value;
    });
    (getNode = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(value, zipper.getNode));
    (getChild = (function(edge, ctx) {
        return ctx.getChild(ctx.focus, edge);
    }));
    (setNode = (function(node, ctx) {
        return zipper.setNode(Pair(key(zipper.getNode(ctx)), node), ctx);
    }));
    (modifyNode = (function(f, ctx) {
        return setNode(f(getNode(ctx)), ctx);
    }));
    (nthChild = (function() {
        {
            var goRight = (function(ctx, count) {
                return ((count <= 0) ? ctx : goRight(right(ctx), (count - 1)));
            });
            return (function(index, ctx) {
                return (function() {
                    {
                        var child = down(ctx);
                        return (child ? goRight(child, index) : child);
                    }
                })();
            });
        }
    })());
    (child = (function(edge, ctx) {
        return (function() {
            {
                var children = getChildren(ctx),
                    index = indexOf(edge, map(key, children));
                return ((index === -1) ? null : nthChild(index, ctx));
            }
        })();
    }));
    (sibling = (function(edge, ctx) {
        return child.bind(null, edge)(up(ctx));
    }));
    (insertLeft = (function(edge, node, ctx) {
        return zipper.insertLeft(Pair(edge, node), ctx);
    }));
    (insertRight = (function(edge, node, ctx) {
        return zipper.insertRight(Pair(edge, node), ctx);
    }));
    (insertChild = (function(edge, node, ctx) {
        return up(insertLeft.bind(null, edge, node)(down(ctx)));
    }));
    (appendChild = (function(edge, node, ctx) {
        return zipper.appendChild(Pair(edge, node), ctx);
    }));
    (treeZipper = (function(edges, getChild, constructNode, focus) {
        return (function() {
            {
                var children = (function(__o) {
                    var __o = __o,
                        k = __o["key"],
                        v = __o["value"];
                    return map((function(x) {
                        return Pair(x, getChild(v, x));
                    }), stream.from(edges(v)));
                }),
                    _constructNode = (function(parent, children) {
                        return (function() {
                            {
                                var reducer = (function(p, c) {
                                    (p[key(c)] = value(c));
                                    return p;
                                });
                                return Pair(parent.key, constructNode(value(parent), children, toArray(map(key, children)), foldl(reducer, ({}), children)));
                            }
                        })();
                    });
                return zipper.zipper(children, getChild, _constructNode, Pair(null, focus));
            }
        })();
    }));
    (exports.getNode = getNode);
    (exports.getChild = getChild);
    (exports.setNode = setNode);
    (exports.modifyNode = modifyNode);
    (exports.child = child);
    (exports.nthChild = nthChild);
    (exports.sibling = sibling);
    (exports.insertLeft = insertLeft);
    (exports.insertRight = insertRight);
    (exports.insertChild = insertChild);
    (exports.appendChild = appendChild);
    (exports.treeZipper = treeZipper);
}))