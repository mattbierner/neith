define(["require", "exports", "./zipper", "nu-stream::stream", "nu-stream::select"], (function(require, exports, zipper,
    stream, __o) {
    "use strict";
    var edgePath, nodePath, node, edge, childNode, parentNode, childNodes, child, nthChild, sibling, setNode,
            modifyNode, setEdge, modifyEdge, insertLeft, insertRight, insertChild, appendChild, treeZipper;
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
        return foldl((function(p, __o0) {
            var i = __o0[0],
                c = __o0[1];
            return ((p >= 0) ? p : ((c === e) ? i : p));
        }), -1, indexed(s));
    });
    var Pair = (function(key, value) {
        return ({
            "key": key,
            "value": value
        });
    });
    var key = (function(__o0) {
        var key = __o0["key"];
        return key;
    });
    var value = (function(__o0) {
        var value = __o0["value"];
        return value;
    });
    (node = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(value, zipper.extract));
    (edge = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(key, zipper.extract));
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
    (childNode = (function(edge, ctx) {
        var c = child(edge, ctx);
        return (c ? node(c) : null);
    }));
    (nthChild = (function() {
            var goRight = (function(ctx, count) {
                return ((count <= 0) ? ctx : goRight(right(ctx), (count - 1)));
            });
            return (function(index, ctx) {
                var child = down(ctx);
                return (child ? goRight(child, index) : null);
            });
        })
        .call(this));
    (child = (function(edge, ctx) {
        return (!ctx ? null : (function() {
                var children = zipper.children(ctx),
                    index = indexOf(edge, map(key, children));
                return ((index === -1) ? null : nthChild(index, ctx));
            })
            .call(this));
    }));
    (sibling = (function(edge, ctx) {
        return child(edge, up(ctx));
    }));
    (setNode = (function(node, ctx) {
        return zipper.replace(Pair(key(zipper.extract(ctx)), node), ctx);
    }));
    (modifyNode = (function(f, ctx) {
        return setNode(f(node(ctx)), ctx);
    }));
    (setEdge = (function(edge, ctx) {
        return zipper.replace(Pair(key(zipper.extract(ctx)), node), ctx);
    }));
    (modifyEdge = (function(f, ctx) {
        return setNode(f(edge(ctx)), ctx);
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
            var reducer = (function(p, __o0) {
                var key = __o0["key"],
                    value = __o0["value"];
                (p[key] = value);
                return p;
            });
            return (function(edges, getChild, constructNode, focus) {
                var children = (function(__o0) {
                    var value = __o0["value"];
                    return map((function(x) {
                        return Pair(x, getChild(value, x));
                    }), toStream(edges(value)));
                }),
                    _constructNode = (function(parent, children) {
                        return Pair(key(parent), constructNode(value(parent), children, toArray(map(
                            key, children)), foldl(reducer, ({}), children)));
                    });
                return zipper.zipper(children, _constructNode, Pair(null, focus));
            });
        })
        .call(this));
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
}))