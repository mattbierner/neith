/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/walk.kep'
 * DO NOT EDIT
*/
"use strict";
var forChildren, walk, postWalk, preWalk, zipper = require("./zipper"),
    isLeaf = zipper["isLeaf"],
    up = zipper["up"],
    down = zipper["down"],
    right = zipper["right"],
    seq = zipper["seq"],
    whilst = zipper["whilst"],
    id = (function(x) {
        return x;
    });
(forChildren = (function(f, ctx) {
    return (((!ctx) || isLeaf(ctx)) ? ctx : up(f(whilst(right, seq(f, right), down(ctx)))));
}));
(walk = (function(pre, post, ctx) {
    var walkImpl = (function(ctx0) {
        return post(forChildren(walkImpl, pre(ctx0)));
    });
    return post(forChildren(walkImpl, pre(ctx)));
}));
(postWalk = (function(post, ctx) {
    return walk(id, post, ctx);
}));
(preWalk = (function(pre, ctx) {
    return walk(pre, id, ctx);
}));
(exports["forChildren"] = forChildren);
(exports["walk"] = walk);
(exports["postWalk"] = postWalk);
(exports["preWalk"] = preWalk);