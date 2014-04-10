/*
 * THIS FILE IS AUTO GENERATED from 'lib/walk.kep'
 * DO NOT EDIT
*/define(["require", "exports", "./zipper"], (function(require, exports, __o) {
    "use strict";
    var isLeaf = __o["isLeaf"],
        up = __o["up"],
        down = __o["down"],
        right = __o["right"],
        seq = __o["seq"],
        whilst = __o["whilst"],
        forChildren, walk, postWalk, preWalk, id = (function(x) {
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
}));