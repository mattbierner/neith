/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/tree.kep'
 * DO NOT EDIT
*/
"use strict";
var Pair, pairKey, pairValue, edgePath, nodePath, node, edge, childNode, parentNode, childNodes, edges, child, sibling,
        setNode, modifyNode, setEdge, modifyEdge, insertLeft, insertRight, insertChild, appendChild, treeZipper, zipper =
        require("./zipper"),
    right = zipper["right"],
    left = zipper["left"],
    up = zipper["up"],
    down = zipper["down"],
    stream = require("nu-stream")["stream"],
    foldl = stream["foldl"],
    map = stream["map"];
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
var x = zipper.extract,
    y = pairValue;
(node = (function(x0) {
    return y(x(x0));
}));
var x0 = zipper.extract,
    y0 = pairKey;
(edge = (function(x1) {
    return y0(x0(x1));
}));
var x1 = zipper.path,
    y1 = map.bind(null, pairValue);
(nodePath = (function(x2) {
    return y1(x1(x2));
}));
var x2 = zipper.path,
    y2 = map.bind(null, pairKey);
(edgePath = (function(x3) {
    return y2(x2(x3));
}));
var x3 = zipper.parent,
    y3 = pairValue;
(parentNode = (function(x4) {
    return y3(x3(x4));
}));
var x4 = zipper.children,
    y4 = map.bind(null, pairValue);
(childNodes = (function(x5) {
    return y4(x4(x5));
}));
var x5 = zipper.children,
    y5 = map.bind(null, pairKey);
(edges = (function(x6) {
    return y5(x5(x6));
}));
(childNode = (function(edge0, ctx) {
    var c = child(edge0, ctx);
    return (c && node(c));
}));
(sibling = (function(e, ctx) {
    var op, x6, op0, ctx0, x6;
    return (((op = left), zipper.whilst(((x6 = edge), (function(x7) {
        var y6 = x6(x7);
        return (e !== y6);
    })), op, ctx)) || ((op0 = right), (ctx0 = right(ctx)), zipper.whilst(((x6 = edge), (function(x7) {
        var y6 = x6(x7);
        return (e !== y6);
    })), op0, ctx0)));
}));
(child = (function(edge0, ctx) {
    return sibling(edge0, down(ctx));
}));
(setNode = (function(node0, ctx) {
    return zipper.replace(Pair(edge(ctx), node0), ctx);
}));
(modifyNode = (function(f, ctx) {
    return setNode(f(node(ctx)), ctx);
}));
(setEdge = (function(edge0, ctx) {
    return zipper.replace(Pair(edge0, node(ctx)), ctx);
}));
(modifyEdge = (function(f, ctx) {
    return setEdge(f(edge(ctx)), ctx);
}));
(insertLeft = (function(edge0, node0, ctx) {
    return zipper.insertLeft(Pair(edge0, node0), ctx);
}));
(insertRight = (function(edge0, node0, ctx) {
    return zipper.insertRight(Pair(edge0, node0), ctx);
}));
(insertChild = (function(edge0, node0, ctx) {
    return zipper.insertChild(Pair(edge0, node0), ctx);
}));
(appendChild = (function(edge0, node0, ctx) {
    return zipper.appendChild(Pair(edge0, node0), ctx);
}));
var reducer = (function(p, __o) {
    var key = __o["key"],
        value = __o["value"];
    if ((!p.hasOwnProperty(key))) {
        (p[key] = value);
    }
    return p;
});
(treeZipper = (function(edges0, getChild, constructNode, focus) {
    var children = (function(__o) {
        var value = __o["value"];
        return map((function(x6) {
            return Pair(x6, getChild(value, x6));
        }), edges0(value));
    }),
        _constructNode = (function(parent, children0) {
            return Pair(pairKey(parent), constructNode(pairValue(parent), children0, (function() {
                return foldl(reducer, ({}), children0);
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