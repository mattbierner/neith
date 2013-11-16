/*
 * THIS FILE IS AUTO GENERATED from 'lib/tree.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "neith/zipper", "nu/stream", "nu/select"], (function(require, exports, zipper, stream, __o) {
    "use strict";
    var edgePath, nodePath, node, childNode, parentNode, childNodes, child, nthChild, sibling, setNode, modifyNode, insertLeft, insertRight, insertChild, appendChild, treeZipper;
    var zipper = zipper,
        right = zipper["right"],
        left = zipper["left"],
        up = zipper["up"],
        down = zipper["down"],
        stream = stream,
        cons = stream["cons"],
        first = stream["first"],
        foldl = stream["foldl"],
        indexed = stream["indexed"],
        isStream = stream["isStream"],
        map = stream["map"],
        toArray = stream["toArray"],
        __o = __o,
        skip = __o["skip"];
    var toStream = (function(s) {
        return (isStream(s) ? s : stream.from(s));
    });
    var indexOf = (function(e, s) {
        return foldl((function(p, __a) {
            var i = __a[0],
                c = __a[1];
            return ((p >= 0) ? p : ((c === e) ? i : p));
        }), -1, indexed(s));
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
    (edgePath = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(map.bind(null, key), zipper.path));
    (nodePath = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(map.bind(null, value), zipper.path));
    (node = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(value, zipper.extract));
    (childNode = (function(edge, ctx) {
        return (function() {
            {
                var children = zipper.children(ctx),
                    index = indexOf(edge, map(key, children));
                return value(first(skip.bind(null, index)(((index === -1) ? null : children))));
            }
        })();
    }));
    (parentNode = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(value, zipper.parent));
    (childNodes = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(map.bind(null, value), zipper.children));
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
                var children = zipper.children(ctx),
                    index = indexOf(edge, map(key, children));
                return ((index === -1) ? null : nthChild(index, ctx));
            }
        })();
    }));
    (sibling = (function(edge, ctx) {
        return child.bind(null, edge)(up(ctx));
    }));
    (setNode = (function(node, ctx) {
        return zipper.replace(Pair(key(zipper.extract(ctx)), node), ctx);
    }));
    (modifyNode = (function(f, ctx) {
        return setNode(f(node(ctx)), ctx);
    }));
    (insertLeft = (function(edge, node, ctx) {
        return zipper.insertLeft(Pair(edge, node), ctx);
    }));
    (insertRight = (function(edge, node, ctx) {
        return zipper.insertRight(Pair(edge, node), ctx);
    }));
    (insertChild = (function(edge, node, ctx) {
        return zipper.insertChild(Pair(edge, node), ctx);
    }));
    (appendChild = (function(edge, node, ctx) {
        return zipper.appendChild(Pair(edge, node), ctx);
    }));
    (treeZipper = (function() {
        {
            var reducer = (function(p, __o0) {
                var __o0 = __o0,
                    key = __o0["key"],
                    value = __o0["value"];
                (p[key] = value);
                return p;
            });
            return (function(edges, getChild, constructNode, focus) {
                return (function() {
                    {
                        var children = (function(__o0) {
                            var __o0 = __o0,
                                value = __o0["value"];
                            return map((function(x) {
                                return Pair(x, getChild(value, x));
                            }), toStream(edges(value)));
                        }),
                            _constructNode = (function(parent, children) {
                                return Pair(parent.key, constructNode(value(parent), children, toArray(map(key, children)), foldl(reducer, ({}), children)));
                            });
                        return zipper.zipper(children, _constructNode, Pair(null, focus));
                    }
                })();
            });
        }
    })());
    (exports.edgePath = edgePath);
    (exports.nodePath = nodePath);
    (exports.node = node);
    (exports.childNode = childNode);
    (exports.parentNode = parentNode);
    (exports.childNodes = childNodes);
    (exports.child = child);
    (exports.nthChild = nthChild);
    (exports.sibling = sibling);
    (exports.setNode = setNode);
    (exports.modifyNode = modifyNode);
    (exports.insertLeft = insertLeft);
    (exports.insertRight = insertRight);
    (exports.insertChild = insertChild);
    (exports.appendChild = appendChild);
    (exports.treeZipper = treeZipper);
}))