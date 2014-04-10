/*
 * THIS FILE IS AUTO GENERATED from 'lib/tree.kep'
 * DO NOT EDIT
*/define(["require", "exports", "./zipper", "nu-stream/stream"], (function(require, exports, zipper, stream) {
    "use strict";
    var right = zipper["right"],
        left = zipper["left"],
        up = zipper["up"],
        down = zipper["down"],
        foldl = stream["foldl"],
        map = stream["map"],
        Pair, pairKey, pairValue, edgePath, nodePath, node, edge, childNode, parentNode, childNodes, edges,
            child, sibling, setNode, modifyNode, setEdge, modifyEdge, insertLeft, insertRight, insertChild,
            appendChild, treeZipper;
    (Pair = (function(key, value) {
        return ({
            key: key,
            value: value
        });
    }));
    (pairKey = (function(x) {
        return x.key;
    }));
    (pairValue = (function(x) {
        return x.value;
    }));
    var x = zipper.extract;
    (node = (function(x0) {
        var x1 = x(x0);
        return x1.value;
    }));
    var x0 = zipper.extract;
    (edge = (function(x1) {
        var x2 = x0(x1);
        return x2.key;
    }));
    var x1 = zipper.path,
        y = map.bind(null, pairValue);
    (nodePath = (function(x2) {
        return y(x1(x2));
    }));
    var x2 = zipper.path,
        y0 = map.bind(null, pairKey);
    (edgePath = (function(x3) {
        return y0(x2(x3));
    }));
    var x3 = zipper.parent;
    (parentNode = (function(x4) {
        var x5 = x3(x4);
        return x5.value;
    }));
    var x4 = zipper.children,
        y1 = map.bind(null, pairValue);
    (childNodes = (function(x5) {
        return y1(x4(x5));
    }));
    var x5 = zipper.children,
        y2 = map.bind(null, pairKey);
    (edges = (function(x6) {
        return y2(x5(x6));
    }));
    (childNode = (function(edge0, ctx) {
        var c = child(edge0, ctx);
        return (c && node(c));
    }));
    (sibling = (function(e, ctx) {
        var op, op0, ctx0;
        return (((op = left), zipper.whilst((function(x6) {
            var y3 = edge(x6);
            return (e !== y3);
        }), op, ctx)) || ((op0 = right), (ctx0 = right(ctx)), zipper.whilst((function(x6) {
            var y3 = edge(x6);
            return (e !== y3);
        }), op0, ctx0)));
    }));
    (child = (function(edge0, ctx) {
        return sibling(edge0, down(ctx));
    }));
    (setNode = (function(node0, ctx) {
        var key;
        return zipper.replace(((key = edge(ctx)), ({
            key: key,
            value: node0
        })), ctx);
    }));
    (modifyNode = (function(f, ctx) {
        return setNode(f(node(ctx)), ctx);
    }));
    (setEdge = (function(edge0, ctx) {
        var value;
        return zipper.replace(((value = node(ctx)), ({
            key: edge0,
            value: value
        })), ctx);
    }));
    (modifyEdge = (function(f, ctx) {
        return setEdge(f(edge(ctx)), ctx);
    }));
    (insertLeft = (function(edge0, node0, ctx) {
        return zipper.insertLeft(({
            key: edge0,
            value: node0
        }), ctx);
    }));
    (insertRight = (function(edge0, node0, ctx) {
        return zipper.insertRight(({
            key: edge0,
            value: node0
        }), ctx);
    }));
    (insertChild = (function(edge0, node0, ctx) {
        return zipper.insertChild(({
            key: edge0,
            value: node0
        }), ctx);
    }));
    (appendChild = (function(edge0, node0, ctx) {
        return zipper.appendChild(({
            key: edge0,
            value: node0
        }), ctx);
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
                var value0 = getChild(value, x6);
                return ({
                    key: x6,
                    value: value0
                });
            }), edges0(value));
        }),
            _constructNode = (function(parent, children0) {
                var key = parent.key,
                    value = constructNode(parent.value, children0, foldl.bind(null, reducer, ({}),
                        children0));
                return ({
                    key: key,
                    value: value
                });
            });
        return zipper.zipper(children, _constructNode, ({
            key: null,
            value: focus
        }));
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
}));