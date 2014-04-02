/*
 * THIS FILE IS AUTO GENERATED from 'lib/tree.kep'
 * DO NOT EDIT
*/"use strict";
var zipper = require("./zipper"),
    right = zipper["right"],
    left = zipper["left"],
    up = zipper["up"],
    down = zipper["down"],
    stream = require("nu-stream")["stream"],
    foldl = stream["foldl"],
    map = stream["map"],
    Pair, pairKey, pairValue, edgePath, nodePath, node, edge, childNode, parentNode, childNodes, edges, child, sibling,
        setNode, modifyNode, setEdge, modifyEdge, insertLeft, insertRight, insertChild, appendChild, treeZipper;
(Pair = (function(key, value) {
    return ({
        "key": key,
        "value": value
    });
}));
(pairKey = (function(__o) {
    var key = __o["key"];
    return key;
}));
(pairValue = (function(__o) {
    var value = __o["value"];
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
(edges = (function(f, g) {
    return (function(x) {
        return f(g(x));
    });
})(map.bind(null, pairKey), zipper.children));
(childNode = (function(edge, ctx) {
    var c = child(edge, ctx);
    return (c && node(c));
}));
var findEdge = (function(e, op, ctx) {
    var x;
    return zipper.whilst((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(((x = e), (function(y) {
        return (x !== y);
    })), edge), op, ctx);
});
(sibling = (function(e, ctx) {
    return (findEdge(e, left, ctx) || findEdge(e, right, right(ctx)));
}));
(child = (function(edge, ctx) {
    return sibling(edge, down(ctx));
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
var reducer = (function(p, __o) {
    var key = __o["key"],
        value = __o["value"];
    if ((!p.hasOwnProperty(key)))(p[key] = value);
    return p;
});
(treeZipper = (function(edges, getChild, constructNode, focus) {
    var children = (function(__o) {
        var value = __o["value"];
        return map((function(x) {
            return Pair(x, getChild(value, x));
        }), edges(value));
    }),
        _constructNode = (function(parent, children) {
            return Pair(pairKey(parent), constructNode(pairValue(parent), children, (function() {
                return foldl(reducer, ({}), children);
            })));
        });
    return zipper.zipper(children, _constructNode, Pair(null, focus));
}));
(exports["Pair"] = Pair);
(exports["pairKey"] = pairKey);
(exports["pairValue"] = pairValue);
(exports["edgePath"] = edgePath);
(exports["nodePath"] = nodePath);
(exports["node"] = node);
(exports["edge"] = edge);
(exports["childNode"] = childNode);
(exports["parentNode"] = parentNode);
(exports["childNodes"] = childNodes);
(exports["edges"] = edges);
(exports["child"] = child);
(exports["sibling"] = sibling);
(exports["setNode"] = setNode);
(exports["modifyNode"] = modifyNode);
(exports["setEdge"] = setEdge);
(exports["modifyEdge"] = modifyEdge);
(exports["insertLeft"] = insertLeft);
(exports["insertRight"] = insertRight);
(exports["insertChild"] = insertChild);
(exports["appendChild"] = appendChild);
(exports["treeZipper"] = treeZipper);