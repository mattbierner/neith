/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/zipper.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu-stream/stream", "nu-stream/select"], (function(require, exports, __o, __o0) {
    "use strict";
    var append = __o["append"],
        cons = __o["cons"],
        first = __o["first"],
        rest = __o["rest"],
        isEmpty = __o["isEmpty"],
        NIL = __o["NIL"],
        reverse = __o["reverse"],
        skip = __o0["skip"],
        extract, children, parent, path, lefts, rights, hasChildren, hasParent, isRoot, isChild, isLeaf,
            isFirst, isLast, up, down, left, right, whilst, recur, seq, any, root, leftmost, rightmost,
            leftLeaf, rightLeaf, nextUpDfs, nextDfs, prevDfs, replace, modify, remove, setLefts, modifyLefts,
            setRights, modifyRights, insertLeft, insertRight, insertChild, appendChild, detach, zipper,
            reduceRight = Function.prototype.call.bind(Array.prototype.reduceRight),
        Context = (function(loc, children, constructNode) {
            var self = this;
            (self.loc = loc);
            (self.children = children);
            (self.constructNode = constructNode);
        });
    (Context.prototype.setLoc = (function(loc) {
        var self = this;
        return new(Context)(loc, self.children, self.constructNode);
    }));
    var Loc = (function(focus, parent, path, left, right, dirty) {
        var self = this;
        (self.focus = focus);
        (self.parent = parent);
        (self.path = path);
        (self.left = left);
        (self.right = right);
        (self.dirty = dirty);
    });
    (Loc.empty = new(Loc)(null, null, NIL, NIL, NIL, false));
    (Loc.prototype.setFocus = (function(focus) {
        var self = this;
        return new(Loc)(focus, self.parent, self.path, self.left, self.right, self.dirty);
    }));
    (Loc.prototype.setLeft = (function(left) {
        var self = this;
        return new(Loc)(self.focus, self.parent, self.path, left, self.right, self.dirty);
    }));
    (Loc.prototype.setRight = (function(right) {
        var self = this;
        return new(Loc)(self.focus, self.parent, self.path, self.left, right, self.dirty);
    }));
    (Loc.prototype.setDirty = (function(dirty) {
        var self = this;
        return new(Loc)(self.focus, self.parent, self.path, self.left, self.right, dirty);
    }));
    (Loc.prototype.setSurround = (function(left, focus, right) {
        var self = this;
        return new(Loc)(focus, self.parent, self.path, left, right, self.dirty);
    }));
    var getLoc = (function(ctx) {
        return ctx.loc;
    }),
        setLoc = (function(ctx, loc) {
            return ctx.setLoc(loc);
        }),
        modifyLoc = (function(ctx, f) {
            return setLoc(ctx, f(getLoc(ctx)));
        }),
        dirty = (function(ctx) {
            return getLoc(ctx)
                .dirty;
        }),
        getPath = (function(ctx) {
            return getLoc(ctx)
                .path;
        }),
        pushPath = (function(x, ctx) {
            return cons(x, getPath(ctx));
        }),
        construct = (function(ctx, parent, children) {
            return ctx.constructNode(parent, children);
        }),
        constructParent = (function(ctx) {
            return construct(ctx, parent(ctx)
                .focus, append(reverse(lefts(ctx)), cons(extract(ctx), NIL), rights(ctx)));
        });
    (extract = (function(ctx) {
        return getLoc(ctx)
            .focus;
    }));
    (path = (function(ctx) {
        return cons(extract(ctx), getPath(ctx));
    }));
    (lefts = (function(ctx) {
        return getLoc(ctx)
            .left;
    }));
    (rights = (function(ctx) {
        return getLoc(ctx)
            .right;
    }));
    (children = (function(ctx) {
        return ctx.children(extract(ctx));
    }));
    (parent = (function(ctx) {
        return getLoc(ctx)
            .parent;
    }));
    var y = isEmpty,
        y0 = children;
    (hasChildren = (function(x) {
        var x0 = y0(x),
            x1 = y(x0);
        return (!x1);
    }));
    var x = parent;
    (hasParent = (function(x0) {
        var y1 = x(x0);
        return (null !== y1);
    }));
    var y1 = hasParent;
    (isRoot = (function(x0) {
        var x1 = y1(x0);
        return (!x1);
    }));
    (isChild = hasParent);
    var y2 = hasChildren;
    (isLeaf = (function(x0) {
        var x1 = y2(x0);
        return (!x1);
    }));
    var x0 = lefts,
        y3 = isEmpty;
    (isFirst = (function(x1) {
        return y3(x0(x1));
    }));
    var x1 = rights,
        y4 = isEmpty;
    (isLast = (function(x2) {
        return y4(x1(x2));
    }));
    (up = (function(ctx) {
        return (isRoot(ctx) ? null : setLoc(ctx, (dirty(ctx) ? parent(ctx)
            .setFocus(constructParent(ctx))
            .setDirty(true) : parent(ctx))));
    }));
    (down = (function(ctx) {
        var cs = children(ctx);
        return (isEmpty(cs) ? null : setLoc(ctx, new(Loc)(first(cs), getLoc(ctx), pushPath(extract(ctx),
            ctx), NIL, rest(cs), false)));
    }));
    (left = (function(ctx) {
        var ls;
        return (isFirst(ctx) ? null : ((ls = lefts(ctx)), setLoc(ctx, getLoc(ctx)
            .setSurround(rest(ls), first(ls), cons(extract(ctx), rights(ctx))))));
    }));
    (right = (function(ctx) {
        var rs;
        return (isLast(ctx) ? null : ((rs = rights(ctx)), setLoc(ctx, getLoc(ctx)
            .setSurround(cons(extract(ctx), lefts(ctx)), first(rs), rest(rs)))));
    }));
    (whilst = (function(pred, op, ctx) {
        return ((ctx && pred(ctx)) ? whilst(pred, op, op(ctx)) : ctx);
    }));
    (recur = (function(op, ctx) {
        var next = op(ctx);
        return (next ? recur(op, next) : ctx);
    }));
    var and = (function(p, c) {
        return (function(ctx) {
            var next;
            return (ctx ? ((next = c(ctx)), (next && p(next))) : ctx);
        });
    });
    (seq = (function() {
        var ops = arguments;
        return reduceRight(ops, and);
    }));
    var or = (function(p, c) {
        return (function(ctx) {
            return (ctx && (c(ctx) || p(ctx)));
        });
    });
    (any = (function() {
        var ops = arguments;
        return reduceRight(ops, or);
    }));
    (root = recur.bind(null, up));
    (leftmost = recur.bind(null, left));
    (rightmost = recur.bind(null, right));
    (leftLeaf = recur.bind(null, down));
    (rightLeaf = recur.bind(null, seq(down, rightmost)));
    (nextUpDfs = (function(ctx) {
        var parent0 = up(ctx);
        return (parent0 ? (right(parent0) || nextUpDfs(parent0)) : parent0);
    }));
    (nextDfs = any(down, right, nextUpDfs));
    (prevDfs = (function(ctx) {
        var l = left(ctx);
        return (l ? rightLeaf(l) : up(ctx));
    }));
    var x2 = (function(x3, y5) {
        return modifyLoc(y5, (function(loc) {
            return loc.setFocus(x3);
        }));
    });
    (replace = (function() {
        var ctx = x2.apply(null, arguments);
        return ctx.setLoc(ctx.loc.setDirty(true));
    }));
    (modify = (function(f, ctx) {
        return replace(f(extract(ctx)), ctx);
    }));
    (remove = (function(ctx) {
        return (isLast(ctx) ? (isFirst(ctx) ? (hasParent(ctx) ? constructParent(ctx) : null) :
            setRights(NIL, left(ctx))) : modifyLefts(skip.bind(null, 1), right(ctx)));
    }));
    (setLefts = (function(ls, ctx) {
        return modifyLoc(ctx, (function(loc) {
            return loc.setLeft(ls)
                .setDirty(true);
        }));
    }));
    (modifyLefts = (function(f, ctx) {
        return setLefts(f(lefts(ctx)), ctx);
    }));
    (setRights = (function(rs, ctx) {
        return modifyLoc(ctx, (function(loc) {
            return loc.setRight(rs)
                .setDirty(true);
        }));
    }));
    (modifyRights = (function(f, ctx) {
        return setRights(f(rights(ctx)), ctx);
    }));
    (insertLeft = (function(node, ctx) {
        return modifyLefts(cons.bind(null, node), ctx);
    }));
    (insertRight = (function(node, ctx) {
        return modifyRights(cons.bind(null, node), ctx);
    }));
    (insertChild = (function(node, ctx) {
        return (hasChildren(ctx) ? up(insertLeft(node, down(ctx))) : replace(construct(ctx, extract(ctx),
            cons(node, NIL)), ctx));
    }));
    (appendChild = (function(node, ctx) {
        return (hasChildren(ctx) ? up(insertRight(node, rightmost(down(ctx)))) : insertChild(node, ctx));
    }));
    (detach = (function(ctx) {
        return setLoc(ctx, Loc.empty.setFocus(extract(ctx)));
    }));
    (zipper = (function(children0, constructNode, focus) {
        return new(Context)(Loc.empty.setFocus(focus), children0, constructNode);
    }));
    (exports["extract"] = extract);
    (exports["children"] = children);
    (exports["parent"] = parent);
    (exports["path"] = path);
    (exports["lefts"] = lefts);
    (exports["rights"] = rights);
    (exports["hasChildren"] = hasChildren);
    (exports["hasParent"] = hasParent);
    (exports["isRoot"] = isRoot);
    (exports["isChild"] = isChild);
    (exports["isLeaf"] = isLeaf);
    (exports["isFirst"] = isFirst);
    (exports["isLast"] = isLast);
    (exports["up"] = up);
    (exports["down"] = down);
    (exports["left"] = left);
    (exports["right"] = right);
    (exports["whilst"] = whilst);
    (exports["recur"] = recur);
    (exports["seq"] = seq);
    (exports["any"] = any);
    (exports["root"] = root);
    (exports["leftmost"] = leftmost);
    (exports["rightmost"] = rightmost);
    (exports["leftLeaf"] = leftLeaf);
    (exports["rightLeaf"] = rightLeaf);
    (exports["nextUpDfs"] = nextUpDfs);
    (exports["nextDfs"] = nextDfs);
    (exports["prevDfs"] = prevDfs);
    (exports["replace"] = replace);
    (exports["modify"] = modify);
    (exports["remove"] = remove);
    (exports["setLefts"] = setLefts);
    (exports["modifyLefts"] = modifyLefts);
    (exports["setRights"] = setRights);
    (exports["modifyRights"] = modifyRights);
    (exports["insertLeft"] = insertLeft);
    (exports["insertRight"] = insertRight);
    (exports["insertChild"] = insertChild);
    (exports["appendChild"] = appendChild);
    (exports["detach"] = detach);
    (exports["zipper"] = zipper);
}));