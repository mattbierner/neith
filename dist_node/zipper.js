/*
 * THIS FILE IS AUTO GENERATED from 'lib/zipper.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("nu-stream")["stream"],
    append = __o["append"],
    cons = __o["cons"],
    first = __o["first"],
    rest = __o["rest"],
    isEmpty = __o["isEmpty"],
    map = __o["map"],
    NIL = __o["NIL"],
    reverse = __o["reverse"],
    stream = __o["stream"],
    __o0 = require("nu-stream")["select"],
    skip = __o0["skip"],
    extract, children, parent, path, lefts, rights, hasChildren, hasParent, isRoot, isChild, isLeaf, isFirst, isLast,
        up, down, left, right, whilst, recur, seq, any, root, leftmost, rightmost, leftLeaf, rightLeaf, nextUpDfs,
        nextDfs, prevDfs, replace, modify, remove, setLefts, modifyLefts, setRights, modifyRights, insertLeft,
        insertRight, insertChild, appendChild, detach, zipper, reduceRight = Function.prototype.call.bind(Array.prototype
            .reduceRight),
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
    return new(Focus)(self.focus, dirty, (dirty ? null : self.children));
}));
(Focus.prototype.setChildren = (function(children) {
    var self = this;
    return new(Focus)(self.focus, self.dirty, children);
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
    modifyLoc = (function(ctx, f) {
        var loc = f(ctx.loc);
        return ctx.setLoc(loc);
    }),
    getFocus = (function(x) {
        var x0 = x.loc;
        return x0.focus;
    }),
    setFocus = (function(ctx, f) {
        return modifyLoc(ctx, (function(loc) {
            return loc.setFocus(f);
        }));
    }),
    getParent = (function(x) {
        var x0 = x.loc;
        return x0.parent;
    }),
    getLefts = (function(x) {
        var x0 = x.loc;
        return x0.left;
    }),
    getRights = (function(x) {
        var x0 = x.loc;
        return x0.right;
    }),
    construct = (function(ctx, parent, children) {
        return new(Focus)(ctx.constructNode(parent, children), false, children);
    }),
    constructParent = (function(ctx) {
        return construct(ctx, getParent(ctx)
            .focus.focus, append(reverse(lefts(ctx)), cons(extract(ctx), NIL), rights(ctx)));
    }),
    x = getFocus;
(extract = (function(x0) {
    var x1 = x(x0);
    return x1.focus;
}));
(path = (function(ctx) {
    return (ctx ? stream(extract(ctx), (function() {
        return path(up(ctx));
    })) : NIL);
}));
(lefts = (function(x0) {
    return unFocusList(getLefts(x0));
}));
(rights = (function(x0) {
    return unFocusList(getRights(x0));
}));
(parent = (function(x0) {
    var parent0, loc, parent1;
    return extract(((parent0 = getParent(x0)), ((parent0 && parent0.focus.dirty) ? ((loc = parent0.setFocus(
        constructParent(x0))), (parent1 = loc.parent), (parent1 ? loc.setParent(parent1.setFocus(
        parent1.focus.setDirty(true))) : loc)) : parent0)));
}));
(children = (function(ctx) {
    return (ctx.loc.focus.children || ctx.children(extract(ctx)));
}));
var y = isEmpty,
    y0 = children;
(hasChildren = (function(x0) {
    var x1 = y0(x0),
        x2 = y(x1);
    return (!x2);
}));
(hasParent = (function(x0) {
    var y1 = getParent(x0);
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
var y3 = isEmpty;
(isFirst = (function(x0) {
    return y3(getLefts(x0));
}));
var y4 = isEmpty;
(isLast = (function(x0) {
    return y4(getRights(x0));
}));
(up = (function(ctx) {
    var parent0, loc, parent1;
    return (isRoot(ctx) ? null : ctx.setLoc(((parent0 = getParent(ctx)), ((parent0 && parent0.focus.dirty) ? ((
        loc = parent0.setFocus(constructParent(ctx))), (parent1 = loc.parent), (parent1 ?
        loc.setParent(parent1.setFocus(parent1.focus.setDirty(true))) : loc)) : parent0))));
}));
(down = (function(ctx) {
    var loc, loc0, cs = children(ctx);
    return (isEmpty(cs) ? null : ((loc = new(Loc)(new(Focus)(first(cs)), ((loc0 = ctx.loc), (loc0.focus.children ?
        loc0 : loc0.setFocus(loc0.focus.setChildren(cs)))), NIL, focusList(rest(cs)))), ctx.setLoc(loc)));
}));
(left = (function(ctx) {
    var ls, loc;
    return (isFirst(ctx) ? null : ((ls = getLefts(ctx)), (loc = setSurround(ctx.loc, rest(ls), first(ls), cons(
        getFocus(ctx), getRights(ctx)))), ctx.setLoc(loc)));
}));
(right = (function(ctx) {
    var rs, loc;
    return (isLast(ctx) ? null : ((rs = getRights(ctx)), (loc = setSurround(ctx.loc, cons(getFocus(ctx),
        getLefts(ctx)), first(rs), rest(rs))), ctx.setLoc(loc)));
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
    var ctx0 = setFocus(ctx, new(Focus)(node)),
        loc = ctx0.loc,
        parent0 = loc.parent,
        loc0 = (parent0 ? loc.setParent(parent0.setFocus(parent0.focus.setDirty(true))) : loc);
    return ctx0.setLoc(loc0);
}));
(modify = (function(f, ctx) {
    var node = f(extract(ctx)),
        ctx0 = setFocus(ctx, new(Focus)(node)),
        loc = ctx0.loc,
        parent0 = loc.parent,
        loc0 = (parent0 ? loc.setParent(parent0.setFocus(parent0.focus.setDirty(true))) : loc);
    return ctx0.setLoc(loc0);
}));
(remove = (function(ctx) {
    var loc;
    return (isLast(ctx) ? (isFirst(ctx) ? (hasParent(ctx) ? ((loc = getParent(ctx)
        .setFocus(construct(ctx, getParent(ctx), NIL))), ctx.setLoc(loc)) : null) : setRights(NIL, left(
        ctx))) : modifyLefts(skip.bind(null, 1), right(ctx)));
}));
(setLefts = (function(ls, ctx) {
    var ctx0 = modifyLoc(ctx, (function(loc) {
        return loc.setLeft(focusList(ls));
    })),
        loc = ctx0.loc,
        parent0 = loc.parent,
        loc0 = (parent0 ? loc.setParent(parent0.setFocus(parent0.focus.setDirty(true))) : loc);
    return ctx0.setLoc(loc0);
}));
(modifyLefts = (function(f, ctx) {
    return setLefts(f(unFocusList(getLefts(ctx))), ctx);
}));
(setRights = (function(rs, ctx) {
    var ctx0 = modifyLoc(ctx, (function(loc) {
        return loc.setRight(focusList(rs));
    })),
        loc = ctx0.loc,
        parent0 = loc.parent,
        loc0 = (parent0 ? loc.setParent(parent0.setFocus(parent0.focus.setDirty(true))) : loc);
    return ctx0.setLoc(loc0);
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
    var node0, ctx0, loc, parent0, loc0;
    return (hasChildren(ctx) ? up(insertLeft(node, down(ctx))) : ((node0 = construct(ctx, extract(ctx), cons(
            node, NIL))
        .focus), (ctx0 = setFocus(ctx, new(Focus)(node0))), (loc = ctx0.loc), (parent0 = loc.parent), (
        loc0 = (parent0 ? loc.setParent(parent0.setFocus(parent0.focus.setDirty(true))) : loc)), ctx0.setLoc(
        loc0)));
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