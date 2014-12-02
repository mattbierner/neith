/*
 * THIS FILE IS AUTO GENERATED from 'lib/zipper.kep'
 * DO NOT EDIT
*/define(["require", "exports", "nu-stream/stream", "nu-stream/select"], (function(require, exports, __o, __o0) {
    "use strict";
    var extract, children, parent, path, lefts, rights, hasChildren, hasParent, isRoot, isChild, isLeaf,
            isFirst, isLast, up, down, left, right, whilst, recur, seq, any, root, leftmost, rightmost,
            leftLeaf, rightLeaf, nextUpDfs, nextDfs, prevDfs, replace, modify, remove, setLefts, modifyLefts,
            setRights, modifyRights, insertLeft, insertRight, insertChild, appendChild, detach, zipper, append =
            __o["append"],
        cons = __o["cons"],
        first = __o["first"],
        rest = __o["rest"],
        isEmpty = __o["isEmpty"],
        map = __o["map"],
        NIL = __o["NIL"],
        reverse = __o["reverse"],
        stream = __o["stream"],
        skip = __o0["skip"],
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
    var Focus = (function(focus, dirty, children) {
        var self = this;
        (self.focus = focus);
        (self.dirty = dirty);
        (self.children = children);
    });
    (Focus.prototype.setDirty = (function(dirty) {
        var self = this;
        (self.dirty = dirty);
        if (dirty) {
            (self.children = null);
        }
        return self;
    }));
    (Focus.prototype.setChildren = (function(children) {
        var self = this;
        (self.children = children);
        return self;
    }));
    var focusList = map.bind(null, (function(y) {
        return new(Focus)(y);
    })),
        unFocusList = map.bind(null, (function(x) {
            return x.focus;
        })),
        Loc = (function(focus, parent, left, right) {
            var self = this;
            (self.focus = focus);
            (self.parent = parent);
            (self.left = left);
            (self.right = right);
        });
    (Loc.empty = new(Loc)(null, null, NIL, NIL));
    (Loc.prototype.setFocus = (function(focus) {
        var self = this;
        return new(Loc)(focus, self.parent, self.left, self.right);
    }));
    (Loc.prototype.setParent = (function(parent) {
        var self = this;
        return new(Loc)(self.focus, parent, self.left, self.right);
    }));
    (Loc.prototype.setLeft = (function(left) {
        var self = this;
        return new(Loc)(self.focus, self.parent, left, self.right);
    }));
    (Loc.prototype.setRight = (function(right) {
        var self = this;
        return new(Loc)(self.focus, self.parent, self.left, right);
    }));
    var setSurround = (function(loc, left, focus, right) {
        return new(Loc)(focus, loc.parent, left, right);
    }),
        getChildren = (function(ctx) {
            if (ctx.loc.focus.children) return ctx.loc.focus.children;
            var c = focusList(children(ctx));
            ctx.loc.focus.setChildren(c);
            return c;
        }),
        getFocus = (function(z) {
            var x = z.loc;
            return x.focus;
        }),
        getParent = (function(z) {
            var x = z.loc;
            return x.parent;
        }),
        getLefts = (function(z) {
            var x = z.loc;
            return x.left;
        }),
        getRights = (function(z) {
            var x = z.loc;
            return x.right;
        }),
        markLocDirty = (function(loc) {
            var parent = loc.parent;
            if (parent) parent.focus.setDirty(true);
            return loc;
        }),
        construct = (function(ctx, parent, children) {
            return new(Focus)(ctx.constructNode(parent, unFocusList(children)), false, children);
        }),
        constructParent = (function(ctx) {
            return construct(ctx, getParent(ctx)
                .focus.focus, append(reverse(getLefts(ctx)), cons(getFocus(ctx), NIL), getRights(ctx)));
        });
    (extract = (function(z) {
        var x = getFocus(z);
        return x.focus;
    }));
    (path = (function(ctx) {
        return (ctx ? stream(extract(ctx), (function() {
            return path(up(ctx));
        })) : NIL);
    }));
    (lefts = (function(z) {
        return unFocusList(getLefts(z));
    }));
    (rights = (function(z) {
        return unFocusList(getRights(z));
    }));
    (parent = (function(z) {
        var parent0;
        return extract(((parent0 = getParent(z)), ((parent0 && parent0.focus.dirty) ? markLocDirty(
            parent0.setFocus(constructParent(z))) : parent0)));
    }));
    (children = (function(ctx) {
        return ctx.children(extract(ctx));
    }));
    var y = getChildren;
    (isLeaf = (function(z) {
        return isEmpty(y(z));
    }));
    var y0 = isLeaf;
    (hasChildren = (function(z) {
        var x = y0(z);
        return (!x);
    }));
    (hasParent = (function(z) {
        var y1 = getParent(z);
        return (null !== y1);
    }));
    var y1 = hasParent;
    (isRoot = (function(z) {
        var x = y1(z);
        return (!x);
    }));
    (isChild = hasParent);
    (isFirst = (function(z) {
        return isEmpty(getLefts(z));
    }));
    (isLast = (function(z) {
        return isEmpty(getRights(z));
    }));
    (up = (function(ctx) {
        var parent0;
        return (isRoot(ctx) ? null : ctx.setLoc(((parent0 = getParent(ctx)), ((parent0 && parent0.focus
            .dirty) ? markLocDirty(parent0.setFocus(constructParent(ctx))) : parent0))));
    }));
    (down = (function(ctx) {
        var cs = getChildren(ctx),
            loc;
        return (isEmpty(cs) ? null : ((loc = new(Loc)(first(cs), ctx.loc, NIL, rest(cs))), ctx.setLoc(
            loc)));
    }));
    (left = (function(ctx) {
        var ls, loc;
        return (isFirst(ctx) ? null : ((ls = getLefts(ctx)), (loc = setSurround(ctx.loc, rest(ls),
            first(ls), cons(getFocus(ctx), getRights(ctx)))), ctx.setLoc(loc)));
    }));
    (right = (function(ctx) {
        var rs, loc;
        return (isLast(ctx) ? null : ((rs = getRights(ctx)), (loc = setSurround(ctx.loc, cons(getFocus(
            ctx), getLefts(ctx)), first(rs), rest(rs))), ctx.setLoc(loc)));
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
            return (ctx && ((next = c(ctx)), (next && p(next))));
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
    (replace = (function(node, ctx) {
        var f = new(Focus)(node),
            loc = ctx.loc,
            loc0 = loc.setFocus(f),
            ctx0 = ctx.setLoc(loc0),
            loc1 = markLocDirty(ctx0.loc);
        return ctx0.setLoc(loc1);
    }));
    (modify = (function(f, ctx) {
        var node = f(extract(ctx)),
            f0 = new(Focus)(node),
            loc = ctx.loc,
            loc0 = loc.setFocus(f0),
            ctx0 = ctx.setLoc(loc0),
            loc1 = markLocDirty(ctx0.loc);
        return ctx0.setLoc(loc1);
    }));
    (remove = (function(ctx) {
        var loc;
        return (isLast(ctx) ? (isFirst(ctx) ? (hasParent(ctx) ? ((loc = getParent(ctx)
                .setFocus(construct(ctx, getParent(ctx), NIL))), ctx.setLoc(loc)) : null) :
            setRights(NIL, left(ctx))) : modifyLefts(skip.bind(null, 1), right(ctx)));
    }));
    (setLefts = (function(ls, ctx) {
        var loc = ctx.loc,
            loc0 = loc.setLeft(focusList(ls)),
            ctx0 = ctx.setLoc(loc0),
            loc1 = markLocDirty(ctx0.loc);
        return ctx0.setLoc(loc1);
    }));
    (modifyLefts = (function(f, ctx) {
        return setLefts(f(unFocusList(getLefts(ctx))), ctx);
    }));
    (setRights = (function(rs, ctx) {
        var loc = ctx.loc,
            loc0 = loc.setRight(focusList(rs)),
            ctx0 = ctx.setLoc(loc0),
            loc1 = markLocDirty(ctx0.loc);
        return ctx0.setLoc(loc1);
    }));
    (modifyRights = (function(f, ctx) {
        return setRights(f(unFocusList(getRights(ctx))), ctx);
    }));
    (insertLeft = (function(node, ctx) {
        return modifyLefts(cons.bind(null, node), ctx);
    }));
    (insertRight = (function(node, ctx) {
        return modifyRights(cons.bind(null, node), ctx);
    }));
    (insertChild = (function(node, ctx) {
        var node0, f, loc, loc0, ctx0, loc1;
        return (hasChildren(ctx) ? up(insertLeft(node, down(ctx))) : ((node0 = construct(ctx, extract(
                ctx), cons(new(Focus)(node), NIL))
            .focus), (f = new(Focus)(node0)), (loc = ctx.loc), (loc0 = loc.setFocus(f)), (ctx0 =
            ctx.setLoc(loc0)), (loc1 = markLocDirty(ctx0.loc)), ctx0.setLoc(loc1)));
    }));
    (appendChild = (function(node, ctx) {
        return (hasChildren(ctx) ? up(insertRight(node, rightmost(down(ctx)))) : insertChild(node, ctx));
    }));
    (detach = (function(ctx) {
        var loc = Loc.empty.setFocus(new(Focus)(extract(ctx)));
        return ctx.setLoc(loc);
    }));
    (zipper = (function(children0, constructNode, focus) {
        return new(Context)(Loc.empty.setFocus(new(Focus)(focus)), children0, constructNode);
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