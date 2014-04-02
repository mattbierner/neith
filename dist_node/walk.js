/*
 * THIS FILE IS AUTO GENERATED from 'lib/walk.kep'
 * DO NOT EDIT
*/"use strict";
var zipper = require("./zipper"),
    isLeaf = zipper["isLeaf"],
    up = zipper["up"],
    down = zipper["down"],
    right = zipper["right"],
    seq = zipper["seq"],
    whilst = zipper["whilst"],
    forChildren, walk, postWalk, preWalk, id = (function(x) {
        return x;
    });
(forChildren = (function(f, ctx) {
    return (((!ctx) || isLeaf(ctx)) ? ctx : up(f(whilst(right, seq(f, right), down(ctx)))));
}));
(walk = (function(pre, post, ctx) {
    var walkImpl = (function(ctx) {
        return post(forChildren(walkImpl, pre(ctx)));
    });
    return walkImpl(ctx);
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