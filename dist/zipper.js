/*
 * THIS FILE IS AUTO GENERATED from 'lib/zipper.kep'
 * DO NOT EDIT
*/define(["require", "exports", "nu-stream/stream", "nu-stream/select"], (function(require, exports, __o, __o0) {
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
    var modifyLoc = (function(ctx, f) {
        var loc = f(ctx.loc);
        return ctx.setLoc(loc);
    }),
        dirty = (function(x) {
            var x0 = x.loc;
            return x0.dirty;
        }),
        getPath = (function(x) {
            var x0 = x.loc;
            return x0.path;
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
    (extract = (function(x) {
        var x0 = x.loc;
        return x0.focus;
    }));
    (path = (function(ctx) {
        return pushPath(extract(ctx), ctx);
    }));
    (lefts = (function(x) {
        var x0 = x.loc;
        return x0.left;
    }));
    (rights = (function(x) {
        var x0 = x.loc;
        return x0.right;
    }));
    (parent = (function(x) {
        var x0 = x.loc;
        return x0.parent;
    }));
    (children = (function(ctx) {
        return ctx.children(extract(ctx));
    }));
    var y = isEmpty,
        y0 = children;
    (hasChildren = (function(x) {
        var x0 = y0(x),
            x1 = y(x0);
        return (!x1);
    }));
    (hasParent = (function(x) {
        var y1 = parent(x);
        return (null !== y1);
    }));
    var y1 = hasParent;
    (isRoot = (function(x) {
        var x0 = y1(x);
        return (!x0);
    }));
    (isChild = hasParent);
    var y2 = hasChildren;
    (isLeaf = (function(x) {
        var x0 = y2(x);
        return (!x0);
    }));
    var y3 = isEmpty;
    (isFirst = (function(x) {
        return y3(lefts(x));
    }));
    var y4 = isEmpty;
    (isLast = (function(x) {
        return y4(rights(x));
    }));
    (up = (function(ctx) {
        var loc;
        return (isRoot(ctx) ? null : ((loc = (dirty(ctx) ? parent(ctx)
            .setFocus(constructParent(ctx))
            .setDirty(true) : parent(ctx))), ctx.setLoc(loc)));
    }));
    (down = (function(ctx) {
        var loc, cs = children(ctx);
        return (isEmpty(cs) ? null : ((loc = new(Loc)(first(cs), ctx.loc, pushPath(extract(ctx), ctx),
            NIL, rest(cs), false)), ctx.setLoc(loc)));
    }));
    (left = (function(ctx) {
        var ls, loc;
        return (isFirst(ctx) ? null : ((ls = lefts(ctx)), (loc = ctx.loc.setSurround(rest(ls), first(ls),
            cons(extract(ctx), rights(ctx)))), ctx.setLoc(loc)));
    }));
    (right = (function(ctx) {
        var rs, loc;
        return (isLast(ctx) ? null : ((rs = rights(ctx)), (loc = ctx.loc.setSurround(cons(extract(ctx),
            lefts(ctx)), first(rs), rest(rs))), ctx.setLoc(loc)));
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
    var x = (function(x0, y5) {
        return modifyLoc(y5, (function(loc) {
            return loc.setFocus(x0);
        }));
    });
    (replace = (function() {
        var ctx = x.apply(null, arguments);
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
        var loc = Loc.empty.setFocus(extract(ctx));
        return ctx.setLoc(loc);
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