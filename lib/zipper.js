/*
 * THIS FILE IS AUTO GENERATED from 'lib/zipper.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu/stream", "nu/select"], (function(require, exports, stream, __o) {
    "use strict";
    var path, lefts, rights, getChildren, getChild, getParent, hasChildren, hasParent, isRoot, isChild, isLeaf, isFirst, isLast, up, down, left, right, root, leftmost, rightmost, leftLeaf, rightLeaf, nextUpDfs, nextDfs, prevDfs, child, nthChild, sibling, getNode, setNode, modifyNode, removeNode, insertLeft, insertRight, insertChild, appendChild, zipper, treeZipper;
    var stream = stream,
        first = stream["first"],
        rest = stream["rest"],
        isEmpty = stream["isEmpty"],
        NIL = stream["end"],
        foldl = stream["foldl"],
        __o = __o,
        skip = __o["skip"];
    var call = Function.prototype.bind.bind(Function.prototype.call);
    var concat = call(Array.prototype.concat);
    var map = call(Array.prototype.map);
    var slice = call(Array.prototype.slice);
    var reduce = call(Array.prototype.reduce);
    var indexOf = (function(e, s) {
        return foldl((function(p, c, i) {
            return ((p >= 0) ? p : ((c === e) ? i : p));
        }), -1, s);
    });
    var Pair = (function(key, value) {
        return ({
            "key": key,
            "value": value
        });
    });
    var key = (function(x) {
        return x.key;
    });
    var value = (function(x) {
        return x.value;
    });
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
        return stream.cons(x, path(ctx));
    });
    var popPath = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(rest, path);
    var setPath = (function(x, ctx) {
        return stream.cons(x, rest(path(ctx)));
    });
    var construct = (function() {
        {
            var reducer = (function(p, c) {
                (p[key(c)] = value(c));
                return p;
            });
            return (function(ctx, parent, children) {
                return ctx.constructNode(parent, stream.toArray(stream.map(key, children)), stream.foldl(reducer, ({}), children));
            });
        }
    })();
    var constructParent = (function(ctx) {
        return construct(ctx, getParent(ctx).focus, stream.append(ctx.loc.left, stream.cons(Pair(first(ctx.loc.path), getFocus(ctx)), NIL), ctx.loc.right));
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
    (getChild = (function(edge, ctx) {
        return ctx.getChild(getFocus(ctx), edge);
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
                return setLoc(ctx, new(Loc)(getChild(child, ctx), getLoc(ctx), pushPath(child, ctx), NIL, stream.map((function(x) {
                    return Pair(x, getChild(x, ctx));
                }), rest(children))));
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
                        return setLoc(ctx, new(Loc)(value(l), getParent(ctx), setPath(key(l), ctx), rest(lefts(ctx)), stream.cons(Pair(first(path(ctx)), getFocus(ctx)), rights(ctx))));
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
                        return setLoc(ctx, new(Loc)(value(r), getParent(ctx), setPath(key(r), ctx), stream.append(lefts(ctx), stream.cons(Pair(first(path(ctx)), getFocus(ctx)), NIL)), rest(rights(ctx))));
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
    (nthChild = (function() {
        {
            var goRight = (function(ctx, count) {
                return ((count <= 0) ? ctx : goRight(right(ctx), (count - 1)));
            });
            return (function(index, ctx) {
                return (function() {
                    {
                        var child = down(ctx);
                        return (child ? goRight(child, index) : child);
                    }
                })();
            });
        }
    })());
    (child = (function(edge, ctx) {
        return (function() {
            {
                var children = getChildren(ctx),
                    index = indexOf(edge, children);
                return ((index === -1) ? null : nthChild(index, ctx));
            }
        })();
    }));
    (sibling = (function(edge, ctx) {
        return child.bind(null, edge)(up(ctx));
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
    (insertLeft = (function(name, node, ctx) {
        return modifyLefts(ctx, (function(ls) {
            return stream.append(ls, stream.cons(Pair(name, node), NIL));
        }));
    }));
    (insertRight = (function(edge, node, ctx) {
        return modifyRights(ctx, (function(rs) {
            return stream.cons(Pair(edge, node), rs);
        }));
    }));
    (insertChild = (function(edge, node, ctx) {
        return up(insertLeft.bind(null, edge, node)(down(ctx)));
    }));
    (appendChild = (function(edge, node, ctx) {
        return (hasChildren(ctx) ? up(insertRight.bind(null, edge, node)(rightmost(down(ctx)))) : setNode(construct(ctx, getFocus(ctx), stream.cons(Pair(edge, node), NIL)), ctx));
    }));
    (zipper = (function(edges, getChild, constructNode, focus) {
        return new(Context)(Loc.setFocus(Loc.empty, focus), edges, getChild, constructNode);
    }));
    (treeZipper = (function() {
        {
            var getChild = (function(obj, key) {
                return obj[key];
            });
            return (function(edges, construct, root) {
                return zipper(edges, getChild, construct, root);
            });
        }
    })());
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
    (exports.child = child);
    (exports.nthChild = nthChild);
    (exports.sibling = sibling);
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