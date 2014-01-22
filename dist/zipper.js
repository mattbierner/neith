define(["require", "exports", "nu-stream/stream", "nu-stream/select"], (function(require, exports, __o, __o0) {
    "use strict";
    var path, lefts, rights, children, parent, hasChildren, hasParent, isRoot, isChild, isLeaf, isFirst, isLast,
            up, down, left, right, root, leftmost, rightmost, leftLeaf, rightLeaf, nextUpDfs, nextDfs, prevDfs,
            extract, replace, modify, remove, setLefts, modifyLefts, setRights, modifyRights, insertLeft,
            insertRight, insertChild, appendChild, zipper;
    var __o = __o,
        append = __o["append"],
        cons = __o["cons"],
        first = __o["first"],
        rest = __o["rest"],
        isEmpty = __o["isEmpty"],
        NIL = __o["NIL"],
        foldl = __o["foldl"],
        reverse = __o["reverse"],
        __o0 = __o0,
        skip = __o0["skip"];
    var flip = (function(f) {
        return (function(x, y) {
            return f(y, x);
        });
    });
    var Context = (function(loc, children, constructNode) {
        (this.loc = loc);
        (this.children = children);
        (this.constructNode = constructNode);
    });
    (Context.setLoc = (function(ctx, loc) {
        return new(Context)(loc, ctx.children, ctx.constructNode);
    }));
    var Loc = (function(focus, parent, path, left, right) {
        (this.focus = focus);
        (this.parent = parent);
        (this.path = path);
        (this.left = left);
        (this.right = right);
    });
    (Loc.empty = new(Loc)(null, null, NIL, NIL, NIL));
    (Loc.setFocus = (function(loc, focus) {
        return new(Loc)(focus, loc.parent, loc.path, loc.left, loc.right);
    }));
    (Loc.setLeft = (function(loc, left) {
        return new(Loc)(loc.focus, loc.parent, loc.path, left, loc.right);
    }));
    (Loc.setRight = (function(loc, right) {
        return new(Loc)(loc.focus, loc.parent, loc.path, loc.left, right);
    }));
    (Loc.setSurround = (function(loc, left, focus, right) {
        return Loc.setRight(Loc.setLeft(Loc.setFocus(loc, focus), left), right);
    }));
    var getLoc = (function(ctx) {
        return ctx.loc;
    });
    var setLoc = (function(ctx, loc) {
        return Context.setLoc(ctx, loc);
    });
    var modifyLoc = (function(ctx, f) {
        return setLoc(ctx, f(getLoc(ctx)));
    });
    var setFocus = (function(ctx, f) {
        return modifyLoc(ctx, (function(loc) {
            return Loc.setFocus(loc, f);
        }));
    });
    var getPath = (function(ctx) {
        return getLoc(ctx)
            .path;
    });
    var pushPath = (function(x, ctx) {
        return cons(x, getPath(ctx));
    });
    var construct = (function(ctx, parent, children) {
        return ctx.constructNode(parent, children);
    });
    var constructParent = (function(ctx) {
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
    (hasChildren = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(x) {
        return !x;
    }), isEmpty), children));
    (hasParent = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(x, y) {
            return (x !== y);
        })
        .bind(null, null), parent));
    (isRoot = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(x) {
        return !x;
    }), hasParent));
    (isChild = hasParent);
    (isLeaf = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(x) {
        return !x;
    }), hasChildren));
    (isFirst = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(isEmpty, lefts));
    (isLast = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(isEmpty, rights));
    (up = (function(ctx) {
        return (isRoot(ctx) ? null : setLoc(ctx, Loc.setFocus(parent(ctx), constructParent(ctx))));
    }));
    (down = (function(ctx) {
        return (isLeaf(ctx) ? null : setLoc(ctx, (function() {
                var cs = children(ctx);
                return new(Loc)(first(cs), getLoc(ctx), pushPath(extract(ctx), ctx), NIL, rest(
                    cs));
            })
            .call(this)));
    }));
    (left = (function(ctx) {
        return (isFirst(ctx) ? null : setLoc(ctx, (function() {
                var ls = lefts(ctx);
                return Loc.setSurround(getLoc(ctx), rest(ls), first(ls), cons(extract(ctx),
                    rights(ctx)));
            })
            .call(this)));
    }));
    (right = (function(ctx) {
        return (isLast(ctx) ? null : setLoc(ctx, (function() {
                var rs = rights(ctx);
                return Loc.setSurround(getLoc(ctx), cons(extract(ctx), lefts(ctx)), first(rs),
                    rest(rs));
            })
            .call(this)));
    }));
    (root = (function(ctx) {
        var parent = up(ctx);
        return (parent ? root(parent) : ctx);
    }));
    (leftmost = (function(ctx) {
        var l = left(ctx);
        return (l ? leftmost(l) : ctx);
    }));
    (rightmost = (function(ctx) {
        var r = right(ctx);
        return (r ? rightmost(r) : ctx);
    }));
    (leftLeaf = (function(ctx) {
        var child = down(ctx);
        return (child ? leftLeaf(child) : ctx);
    }));
    (rightLeaf = (function(ctx) {
        var child = down(ctx);
        return (child ? rightLeaf(rightmost(child)) : ctx);
    }));
    (nextUpDfs = (function(ctx) {
        var parent = up(ctx);
        return (parent ? (right(parent) || nextUpDfs(parent)) : parent);
    }));
    (nextDfs = (function(ctx) {
        return ((down(ctx) || right(ctx)) || nextUpDfs(ctx));
    }));
    (prevDfs = (function(ctx) {
        var l = left(ctx);
        return (l ? rightLeaf(l) : up(ctx));
    }));
    (replace = flip(setFocus));
    (modify = (function(f, ctx) {
        return replace(f(extract(ctx)), ctx);
    }));
    (remove = (function(ctx) {
        return (isLast(ctx) ? (isFirst(ctx) ? (hasParent(ctx) ? constructParent(ctx) : null) :
            setRights(NIL, left(ctx))) : modifyLefts(skip.bind(null, 2), right(ctx)));
    }));
    (setLefts = (function(ls, ctx) {
        return modifyLoc(ctx, (function(loc) {
            return Loc.setLeft(loc, ls);
        }));
    }));
    (modifyLefts = (function(f, ctx) {
        return setLefts(f(lefts(ctx)), ctx);
    }));
    (setRights = (function(rs, ctx) {
        return modifyLoc(ctx, (function(loc) {
            return Loc.setRight(loc, rs);
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
    (zipper = (function(children, constructNode, focus) {
        return new(Context)(Loc.setFocus(Loc.empty, focus), children, constructNode);
    }));
    (exports.path = path);
    (exports.lefts = lefts);
    (exports.rights = rights);
    (exports.children = children);
    (exports.parent = parent);
    (exports.hasChildren = hasChildren);
    (exports.hasParent = hasParent);
    (exports.isRoot = isRoot);
    (exports.isChild = isChild);
    (exports.isLeaf = isLeaf);
    (exports.isFirst = isFirst);
    (exports.isLast = isLast);
    (exports.up = up);
    (exports.down = down);
    (exports.left = left);
    (exports.right = right);
    (exports.root = root);
    (exports.leftmost = leftmost);
    (exports.rightmost = rightmost);
    (exports.leftLeaf = leftLeaf);
    (exports.rightLeaf = rightLeaf);
    (exports.nextUpDfs = nextUpDfs);
    (exports.nextDfs = nextDfs);
    (exports.prevDfs = prevDfs);
    (exports.extract = extract);
    (exports.replace = replace);
    (exports.modify = modify);
    (exports.remove = remove);
    (exports.setLefts = setLefts);
    (exports.modifyLefts = modifyLefts);
    (exports.setRights = setRights);
    (exports.modifyRights = modifyRights);
    (exports.insertLeft = insertLeft);
    (exports.insertRight = insertRight);
    (exports.insertChild = insertChild);
    (exports.appendChild = appendChild);
    (exports.zipper = zipper);
}))