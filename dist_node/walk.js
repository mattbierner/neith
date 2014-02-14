/*
 * THIS FILE IS AUTO GENERATED from 'lib/walk.kep'
 * DO NOT EDIT
*/
"use strict";
var zipper = require("./zipper"),
    isLeaf = zipper["isLeaf"],
    isLast = zipper["isLast"],
    isRoot = zipper["isRoot"],
    detach = zipper["detach"],
    up = zipper["up"],
    down = zipper["down"],
    right = zipper["right"],
    walk, postWalk, preWalk, id = (function(x) {
        return x;
    }),
    merge = (function(ctx, o) {
        return (o ? ctx.setLoc(ctx.loc.setFocus((o && o.loc.focus))) : o);
    }),
    impl = (function(pre, post, ctx) {
        var t = pre(ctx);
        if (isLeaf(t)) {
            do {
                (t = post(t));
                if (isLast(t)) {
                    if (isRoot(t)) return t;
                    (t = up(t));
                } else {
                    return impl(pre, post, right(t));
                }
            }
            while (true);
        }
        return impl(pre, post, down(t));
    });
(walk = (function(pre, post, ctx) {
    return merge(ctx, impl(pre, post, detach(ctx)));
}));
(postWalk = (function(post, ctx) {
    return walk(id, post, ctx);
}));
(preWalk = (function(pre, ctx) {
    return walk(pre, id, ctx);
}));
(exports.walk = walk);
(exports.postWalk = postWalk);
(exports.preWalk = preWalk);