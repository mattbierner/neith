/*
 * THIS FILE IS AUTO GENERATED from 'lib/tree.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./zipper", "nu-stream/stream", "nu-stream/select"], (function(require, exports, zipper,
    stream, __o) {
    "use strict";
    var right = zipper["right"],
        left = zipper["left"],
        up = zipper["up"],
        down = zipper["down"],
        cons = stream["cons"],
        first = stream["first"],
        foldl = stream["foldl"],
        indexed = stream["indexed"],
        isStream = stream["isStream"],
        map = stream["map"],
        toArray = stream["toArray"],
        skip = __o["skip"],
        Pair, pairKey, pairValue, edgePath, nodePath, node, edge, childNode, parentNode, childNodes, child,
            nthChild, sibling, setNode, modifyNode, setEdge, modifyEdge, insertLeft, insertRight, insertChild,
            appendChild, treeZipper, toStream = (function(s) {
                return (isStream(s) ? s : stream.from(s));
            }),
        indexOf = (function(e, s) {
            return foldl((function(p, __o0) {
                var i = __o0[0],
                    c = __o0[1];
                return ((p >= 0) ? p : ((c === e) ? i : p));
            }), -1, indexed(s));
        });
    (Pair = (function(key, value) {
        return ({
            "key": key,
            "value": value
        });
    }));
    (pairKey = (function(__o0) {
        var key = __o0["key"];
        return key;
    }));
    (pairValue = (function(__o0) {
        var value = __o0["value"];
        return value;
    }));
    (node = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(pairValue, zipper.extract));
    (edge = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(pairKey, zipper.extract));
    (nodePath = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(map.bind(null, pairValue), zipper.path));
    (edgePath = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(map.bind(null, pairKey), zipper.path));
    (parentNode = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(pairValue, zipper.parent));
    (childNodes = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(map.bind(null, pairValue), zipper.children));
    (childNode = (function(edge, ctx) {
        var c = child(edge, ctx);
        return (c ? node(c) : null);
    }));
    var goRight = (function(ctx, count) {
        return ((count <= 0) ? ctx : goRight(right(ctx), (count - 1)));
    });
    (nthChild = (function(index, ctx) {
        var child = down(ctx);
        return (child ? goRight(child, index) : null);
    }));
    (child = (function(edge, ctx) {
        return ((!ctx) ? null : (function() {
            var children = zipper.children(ctx),
                index = indexOf(edge, map(pairKey, children));
            return ((index >= 0) ? nthChild(index, ctx) : null);
        })());
    }));
    (sibling = (function(edge, ctx) {
        return child(edge, up(ctx));
    }));
    (setNode = (function(node, ctx) {
        return zipper.replace(Pair(edge(ctx), node), ctx);
    }));
    (modifyNode = (function(f, ctx) {
        return setNode(f(node(ctx)), ctx);
    }));
    (setEdge = (function(edge, ctx) {
        return zipper.replace(Pair(edge, node(ctx)), ctx);
    }));
    (modifyEdge = (function(f, ctx) {
        return setEdge(f(edge(ctx)), ctx);
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
    var reducer = (function(p, __o0) {
        var key = __o0["key"],
            value = __o0["value"];
        if ((!p.hasOwnProperty(key)))(p[key] = value);
        return p;
    });
    (treeZipper = (function(edges, getChild, constructNode, focus) {
        var children = (function(__o0) {
            var value = __o0["value"];
            return map((function(x) {
                return Pair(x, getChild(value, x));
            }), toStream(edges(value)));
        }),
            _constructNode = (function(parent, children) {
                return Pair(pairKey(parent), constructNode(pairValue(parent), children, (function() {
                    return foldl(reducer, ({}), children);
                })));
            });
        return zipper.zipper(children, _constructNode, Pair(null, focus));
    }));
    (exports.Pair = Pair);
    (exports.pairKey = pairKey);
    (exports.pairValue = pairValue);
    (exports.edgePath = edgePath);
    (exports.nodePath = nodePath);
    (exports.node = node);
    (exports.edge = edge);
    (exports.childNode = childNode);
    (exports.parentNode = parentNode);
    (exports.childNodes = childNodes);
    (exports.child = child);
    (exports.nthChild = nthChild);
    (exports.sibling = sibling);
    (exports.setNode = setNode);
    (exports.modifyNode = modifyNode);
    (exports.setEdge = setEdge);
    (exports.modifyEdge = modifyEdge);
    (exports.insertLeft = insertLeft);
    (exports.insertRight = insertRight);
    (exports.insertChild = insertChild);
    (exports.appendChild = appendChild);
    (exports.treeZipper = treeZipper);
}));