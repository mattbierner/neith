/*
 * THIS FILE IS AUTO GENERATED from 'lib/zipper.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu/stream", "nu/select"], (function(require, exports, stream, __o) {
    "use strict";
    var path, lefts, rights, children, parent, hasChildren, hasParent, isRoot, isChild, isLeaf, isFirst, isLast, up, down, left, right, root, leftmost, rightmost, leftLeaf, rightLeaf, nextUpDfs, nextDfs, prevDfs, extract, replace, modify, remove, insertLeft, insertRight, insertChild, appendChild, zipper, treeZipper;
    var stream = stream,
        append = stream["append"],
        cons = stream["cons"],
        first = stream["first"],
        rest = stream["rest"],
        isEmpty = stream["isEmpty"],
        NIL = stream["end"],
        foldl = stream["foldl"],
        __o = __o,
        skip = __o["skip"];
    var flip = (function(f) {
        return (function(x, y) {
            return f(y, x);
        });
    });
    var reverse = foldl.bind(null, flip(cons), NIL);
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
    var setLefts = (function(ctx, ls) {
        return modifyLoc(ctx, (function(loc) {
            return Loc.setLeft(loc, ls);
        }));
    });
    var setRights = (function(ctx, rs) {
        return modifyLoc(ctx, (function(loc) {
            return Loc.setRight(loc, rs);
        }));
    });
    var modifyLefts = (function(ctx, f) {
        return setLefts(ctx, f(ctx.loc.left));
    });
    var modifyRights = (function(ctx, f) {
        return setRights(ctx, f(ctx.loc.right));
    });
    var getFocus = (function(ctx) {
        return getLoc(ctx).focus;
    });
    var getPath = (function(ctx) {
        return getLoc(ctx).path;
    });
    var pushPath = (function(x, ctx) {
        return cons(x, getPath(ctx));
    });
    var popPath = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(rest, path);
    var setPath = (function(x, ctx) {
        return cons(x, rest(getPath(ctx)));
    });
    var construct = (function(ctx, parent, children) {
        return ctx.constructNode(parent, children);
    });
    var constructParent = (function(ctx) {
        return construct(ctx, parent(ctx).focus, append(reverse(lefts(ctx)), cons(getFocus(ctx), NIL), rights(ctx)));
    });
    (path = (function(ctx) {
        return cons(getFocus(ctx), getPath(ctx));
    }));
    (lefts = (function(ctx) {
        return getLoc(ctx).left;
    }));
    (rights = (function(ctx) {
        return getLoc(ctx).right;
    }));
    (children = (function(ctx) {
        return ctx.children(getFocus(ctx));
    }));
    (parent = (function(ctx) {
        return getLoc(ctx).parent;
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
    }).bind(null, null), parent));
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
            {
                var cs = children(ctx);
                return new(Loc)(first(cs), getLoc(ctx), pushPath(getFocus(ctx), ctx), NIL, rest(cs));
            }
        })()));
    }));
    (left = (function(ctx) {
        return (isFirst(ctx) ? null : setLoc(ctx, (function() {
            {
                var ls = lefts(ctx);
                return Loc.setSurround(getLoc(ctx), rest(ls), first(ls), cons(getFocus(ctx), rights(ctx)));
            }
        })()));
    }));
    (right = (function(ctx) {
        return (isLast(ctx) ? null : setLoc(ctx, (function() {
            {
                var rs = rights(ctx);
                return Loc.setSurround(getLoc(ctx), cons(getFocus(ctx), lefts(ctx)), first(rs), rest(rs));
            }
        })()));
    }));
    (root = (function(ctx) {
        return (function() {
            {
                var parent = up(ctx);
                return (parent ? root(parent) : ctx);
            }
        })();
    }));
    (leftmost = (function(ctx) {
        return (function() {
            {
                var l = left(ctx);
                return (l ? leftmost(l) : ctx);
            }
        })();
    }));
    (rightmost = (function(ctx) {
        return (function() {
            {
                var r = right(ctx);
                return (r ? rightmost(r) : ctx);
            }
        })();
    }));
    (leftLeaf = (function(ctx) {
        return (function() {
            {
                var child = down(ctx);
                return (child ? leftLeaf(child) : ctx);
            }
        })();
    }));
    (rightLeaf = (function(ctx) {
        return (function() {
            {
                var child = down(ctx);
                return (child ? rightLeaf(rightmost(child)) : ctx);
            }
        })();
    }));
    (nextUpDfs = (function(ctx) {
        return (function() {
            {
                var parent = up(ctx);
                return (parent ? (right(parent) || nextUpDfs(parent)) : parent);
            }
        })();
    }));
    (nextDfs = (function(ctx) {
        return ((down(ctx) || right(ctx)) || nextUpDfs(ctx));
    }));
    (prevDfs = (function(ctx) {
        return (function() {
            {
                var l = left(ctx);
                return (l ? rightLeaf(l) : up(ctx));
            }
        })();
    }));
    (extract = getFocus);
    (replace = flip(setFocus));
    (modify = (function(f, ctx) {
        return replace(f(extract(ctx)), ctx);
    }));
    (remove = (function(ctx) {
        return (isLast(ctx) ? (isFirst(ctx) ? (hasParent(ctx) ? constructParent(ctx) : null) : setRights(left(ctx), NIL)) : modifyLefts(right(ctx), skip.bind(null, 2)));
    }));
    (insertLeft = (function(node, ctx) {
        return modifyLefts(ctx, cons.bind(null, node));
    }));
    (insertRight = (function(node, ctx) {
        return modifyRights(ctx, cons.bind(null, node));
    }));
    (insertChild = (function(node, ctx) {
        return up(insertLeft.bind(null, node)(down(ctx)));
    }));
    (appendChild = (function(node, ctx) {
        return (hasChildren(ctx) ? up(insertRight.bind(null, node)(rightmost(down(ctx)))) : replace(construct(ctx, getFocus(ctx), cons(node, NIL)), ctx));
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
    (exports.insertLeft = insertLeft);
    (exports.insertRight = insertRight);
    (exports.insertChild = insertChild);
    (exports.appendChild = appendChild);
    (exports.zipper = zipper);
    (exports.treeZipper = treeZipper);
}))