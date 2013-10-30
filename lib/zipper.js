/*
 * THIS FILE IS AUTO GENERATED from 'lib/zipper.kep'
 * DO NOT EDIT
*/
define(["require", "exports"], (function(require, exports) {
    "use strict";
    var Loc, Context, path, lefts, rights, up, down, left, right, root, leftmost, rightmost, leftLeaf, rightLeaf, nextUpDfs, nextDfs, prevDfs, child, nthChild, sibling, getNode, setNode, modifyNode, removeNode, insertLeft, insertRight, insertChild, appendChild, zipper, treeZipper;
    var call = Function.prototype.bind.bind(Function.prototype.call);
    var concat = call(Array.prototype.concat);
    var map = call(Array.prototype.map);
    var slice = call(Array.prototype.slice);
    var reduce = call(Array.prototype.reduce);
    var Pair = (function(key, value) {
        return ({
            "key": key,
            "value": value
        });
    });
    (Context = (function(loc, getChildren, getChild, constructNode) {
        (this.loc = loc);
        (this.getChildren = getChildren);
        (this.getChild = getChild);
        (this.constructNode = constructNode);
    }));
    (Context.setLoc = (function(ctx, loc) {
        return new(Context)(loc, ctx.getChildren, ctx.getChild, ctx.constructNode);
    }));
    (Loc = (function(focus, parent, path, left, right) {
        (this.focus = focus);
        (this.parent = parent);
        (this.path = path);
        (this.left = left);
        (this.right = right);
    }));
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
        return setLefts(ctx, f(ctx.loc.right));
    });
    var modifyRights = (function(ctx, f) {
        return setRights(ctx, f(ctx.loc.right));
    });
    var getFocus = (function(ctx) {
        return getLoc(ctx).focus;
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
    var getChildren = (function(ctx) {
        return ctx.getChildren(getFocus(ctx));
    });
    var hasChildren = (function(ctx) {
        return !!getChildren(ctx).length;
    });
    var getChild = (function(ctx, key) {
        return ctx.getChild(getFocus(ctx), key);
    });
    var getParent = (function(ctx) {
        return getLoc(ctx).parent;
    });
    var hasParent = (function(ctx) {
        return (getLoc(ctx).parent !== null);
    });
    var pushPath = (function(ctx, x) {
        return concat([x], path(ctx));
    });
    var popPath = (function(ctx) {
        return slice(path(ctx), 1);
    });
    var construct = (function(ctx, parent, children) {
        return ctx.constructNode(parent, children.map((function(x) {
            return x.key;
        })), children.reduce((function(p, c) {
            (p[c.key] = c.value);
            return p;
        }), ({})));
    });
    var constructParent = (function(ctx) {
        return construct(ctx, getParent(ctx).focus, concat(ctx.loc.left, Pair(ctx.loc.path[0], ctx.loc.focus), ctx.loc.right));
    });
    var isRoot = (function(f, g) {
        return (function() {
            return g(f.apply(null, arguments));
        });
    })(hasParent, (function(x) {
        return !x;
    }));
    var isChild = hasParent;
    var isLeaf = (function(f, g) {
        return (function() {
            return g(f.apply(null, arguments));
        });
    })(hasChildren, (function(x) {
        return !x;
    }));
    var isFirst = (function(ctx) {
        return (lefts(ctx).length === 0);
    });
    var isLast = (function(ctx) {
        return (rights(ctx).length === 0);
    });
    (up = (function(ctx) {
        return (!hasParent(ctx) ? null : modifyLoc(ctx, (function(loc) {
            return Loc.setFocus(getParent(ctx), constructParent(ctx));
        })));
    }));
    (down = (function(ctx) {
        return (!hasChildren(ctx) ? null : (function() {
            {
                var children = getChildren(ctx),
                    child = children[0]; {
                        return setLoc(ctx, new(Loc)(getChild(ctx, child), getLoc(ctx), pushPath(ctx, child), [], children.slice(1).map((function(x) {
                            return Pair(x, getChild(ctx, x));
                        }))));
                }
            }
        })());
    }));
    (left = (function(ctx) {
        return (function() {
            {
                var ls = lefts(ctx),
                    l = ls[0]; {
                        return (!ls.length ? null : Context.setLoc(ctx, new(Loc)(l.value, getParent(ctx), concat([l.key], slice(path(ctx), 1)), slice(ctx.loc.left, 1), concat([Pair(path(ctx)[0], getFocus(ctx))], ctx.loc.right))));
                }
            }
        })();
    }));
    (right = (function(ctx) {
        return (function() {
            {
                var rs = rights(ctx),
                    r = rs[0]; {
                        return (!rs.length ? null : Context.setLoc(ctx, new(Loc)(r.value, getParent(ctx), concat([r.key], slice(path(ctx, 1))), concat(ctx.loc.left, Pair(path(ctx)[0], getFocus(ctx))), slice(ctx.loc.right, 1))));
                }
            }
        })();
    }));
    (root = (function(ctx) {
        return (function() {
            {
                var parent = up(ctx); {
                    return (parent ? root(parent) : ctx);
                }
            }
        })();
    }));
    (leftmost = (function(ctx) {
        return (function() {
            {
                var l = left(ctx); {
                    return (l ? leftmost(l) : ctx);
                }
            }
        })();
    }));
    (rightmost = (function(ctx) {
        return (function() {
            {
                var r = right(ctx); {
                    return (r ? rightmost(r) : ctx);
                }
            }
        })();
    }));
    (leftLeaf = (function(ctx) {
        return (function() {
            {
                var child = down(ctx); {
                    return (child ? leftLeaf(child) : ctx);
                }
            }
        })();
    }));
    (rightLeaf = (function(ctx) {
        return (function() {
            {
                var child = down(ctx); {
                    return (child ? rightLeaf(rightmost(child)) : ctx);
                }
            }
        })();
    }));
    (nextUpDfs = (function(ctx) {
        return (function() {
            {
                var parent = up(ctx); {
                    return (parent ? (right(parent) || nextUpDfs(parent)) : parent);
                }
            }
        })();
    }));
    (nextDfs = (function(ctx) {
        return ((down(ctx) || right(ctx)) || nextUpDfs(ctx));
    }));
    (prevDfs = (function(ctx) {
        return (function() {
            {
                var l = left(ctx); {
                    return (l ? rightLeaf(l) : up(ctx));
                }
            }
        })();
    }));
    (nthChild = (function() {
        {
            var goRight = (function(ctx, count) {
                return ((count <= 0) ? ctx : goRight(right(ctx), (count - 1)));
            }); {
                return (function(ctx, index) {
                    return (function() {
                        {
                            var child = down(ctx); {
                                return (child ? goRight(child, index) : child);
                            }
                        }
                    })();
                });
            }
        }
    })());
    (child = (function(ctx, edge) {
        return down(ctx);
    }));
    (sibling = (function(ctx, edge) {
        return child(up(ctx), edge);
    }));
    (getNode = getFocus);
    (setNode = (function(ctx, node) {
        return modifyLoc(ctx, (function(loc) {
            return Loc.setFocus(loc, node);
        }));
    }));
    (modifyNode = (function(ctx, f) {
        return setNode(ctx, f(getNode(ctx)));
    }));
    (removeNode = (function(ctx) {
        return (!hasParent(ctx) ? null : (!isLast(ctx) ? modifyLefts(right(ctx), (function(lefts) {
            return slice(lefts, 0, (lefts.length - 2));
        })) : (!isFirst(ctx) ? setRights(left(ctx), []) : construct(ctx, ctx.loc.parent, []))));
    }));
    (insertLeft = (function(ctx, name, node) {
        return Context.setLoc(ctx, new(Loc)(getFocus(ctx), getParent(ctx), path(ctx), concat(ctx.loc.left, Pair(name, node)), ctx.loc.right));
    }));
    (insertRight = (function(ctx, name, node) {
        return Context.setLoc(ctx, new(Loc)(getFocus(ctx), getParent(ctx), path(ctx), ctx.loc.left, concat(Pair(name, node), ctx.loc.right)));
    }));
    (insertChild = (function(ctx, name, node) {
        return up(insertLeft(down(ctx), name, node));
    }));
    (appendChild = (function(ctx, name, node) {
        return (hasChildren(ctx) ? up(insertRight(rightmost(down(ctx)), name, node)) : setNode(ctx, construct(ctx, ctx.loc.focus, [Pair(name, node)])));
    }));
    (zipper = (function(edges, getChild, constructNode, focus) {
        return new(Context)(new(Loc)(focus, null, [], [], []), edges, getChild, constructNode);
    }));
    (treeZipper = (function() {
        {
            var getChild = (function(obj, key) {
                return obj[key];
            }); {
                return (function(edges, construct, root) {
                    return zipper(edges, getChild, construct, root);
                });
            }
        }
    })());
    (exports.Loc = Loc);
    (exports.Context = Context);
    (exports.path = path);
    (exports.lefts = lefts);
    (exports.rights = rights);
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