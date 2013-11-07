/*
 * THIS FILE IS AUTO GENERATED from 'lib/zipper.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu/stream", "nu/select"], (function(require, exports, stream, __o) {
    "use strict";
    var path, lefts, rights, getChildren, getChild, getParent, hasChildren, hasParent, isRoot, isChild, isLeaf, isFirst, isLast, up, down, left, right, root, leftmost, rightmost, leftLeaf, rightLeaf, nextUpDfs, nextDfs, prevDfs, getNode, setNode, modifyNode, removeNode, insertLeft, insertRight, insertChild, appendChild, zipper, treeZipper;
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
    var Context = (function(loc, getChildren, getChild, constructNode) {
        (this.loc = loc);
        (this.getChildren = getChildren);
        (this.getChild = getChild);
        (this.constructNode = constructNode);
    });
    (Context.setLoc = (function(ctx, loc) {
        return new(Context)(loc, ctx.getChildren, ctx.getChild, ctx.constructNode);
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
    var pushPath = (function(x, ctx) {
        return cons(x, path(ctx));
    });
    var popPath = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(rest, path);
    var setPath = (function(x, ctx) {
        return cons(x, rest(path(ctx)));
    });
    var construct = (function(ctx, parent, children) {
        return ctx.constructNode(parent, children);
    });
    var constructParent = (function(ctx) {
        return construct(ctx, getParent(ctx).focus, append(reverse(lefts(ctx)), cons(getFocus(ctx), NIL), rights(ctx)));
    });
    (path = (function(ctx) {
        return getLoc(ctx).path;
    }));
    (lefts = (function(ctx) {
        return getLoc(ctx).left;
    }));
    (rights = (function(ctx) {
        return getLoc(ctx).right;
    }));
    (getChildren = (function(ctx) {
        return (function() {
            {
                var children = ctx.getChildren(getFocus(ctx));
                return (Array.isArray(children) ? stream.from(children) : children);
            }
        })();
    }));
    (getParent = (function(ctx) {
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
    }), isEmpty), getChildren));
    (hasParent = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(x, y) {
        return (x !== y);
    }).bind(null, null), getParent));
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
        return (!hasParent(ctx) ? null : setLoc(ctx, Loc.setFocus(getParent(ctx), constructParent(ctx))));
    }));
    (down = (function(ctx) {
        return (!hasChildren(ctx) ? null : (function() {
            {
                var children = getChildren(ctx),
                    child = first(children);
                return setLoc(ctx, new(Loc)(child, getLoc(ctx), pushPath(child, ctx), NIL, rest(children)));
            }
        })());
    }));
    (left = (function(ctx) {
        return (function() {
            {
                var ls = lefts(ctx);
                return (isEmpty(ls) ? null : (function() {
                    {
                        var l = first(ls);
                        return setLoc(ctx, new(Loc)(l, getParent(ctx), setPath(l, ctx), rest(lefts(ctx)), cons(getFocus(ctx), rights(ctx))));
                    }
                })());
            }
        })();
    }));
    (right = (function(ctx) {
        return (function() {
            {
                var rs = rights(ctx);
                return (isEmpty(rs) ? null : (function() {
                    {
                        var r = first(rs);
                        return setLoc(ctx, new(Loc)(r, getParent(ctx), setPath(r, ctx), cons(getFocus(ctx), lefts(ctx)), rest(rights(ctx))));
                    }
                })());
            }
        })();
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
    (getNode = getFocus);
    (setNode = (function(node, ctx) {
        return setFocus(ctx, node);
    }));
    (modifyNode = (function(f, ctx) {
        return setNode(f(getNode(ctx)), ctx);
    }));
    (removeNode = (function(ctx) {
        return (isLast(ctx) ? (isFirst(ctx) ? (!hasParent(ctx) ? null : constructParent(ctx)) : setRights(left(ctx), NIL)) : modifyLefts(right(ctx), skip.bind(null, 2)));
    }));
    (insertLeft = (function(node, ctx) {
        return modifyLefts(ctx, (function(ls) {
            return cons(node, ls);
        }));
    }));
    (insertRight = (function(node, ctx) {
        return modifyRights(ctx, (function(rs) {
            return cons(node, rs);
        }));
    }));
    (insertChild = (function(node, ctx) {
        return up(insertLeft.bind(null, node)(down(ctx)));
    }));
    (appendChild = (function(node, ctx) {
        return (hasChildren(ctx) ? up(insertRight.bind(null, node)(rightmost(down(ctx)))) : setNode(construct(ctx, getFocus(ctx), cons(node, NIL)), ctx));
    }));
    (zipper = (function(edges, getChild, constructNode, focus) {
        return new(Context)(Loc.setFocus(Loc.empty, focus), edges, getChild, constructNode);
    }));
    (exports.path = path);
    (exports.lefts = lefts);
    (exports.rights = rights);
    (exports.getChildren = getChildren);
    (exports.getChild = getChild);
    (exports.getParent = getParent);
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
    (exports.getNode = getNode);
    (exports.setNode = setNode);
    (exports.modifyNode = modifyNode);
    (exports.removeNode = removeNode);
    (exports.insertLeft = insertLeft);
    (exports.insertRight = insertRight);
    (exports.insertChild = insertChild);
    (exports.appendChild = appendChild);
    (exports.zipper = zipper);
    (exports.treeZipper = treeZipper);
}))