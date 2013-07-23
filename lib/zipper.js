/*
 * THIS FILE IS AUTO GENERATED from 'lib/zipper.kep'
 * DO NOT EDIT
*/
;
define([], function() {
    var call = Function.prototype.bind.bind(Function.prototype.call);
    var concat = call(Array.prototype.concat);
    var map = call(Array.prototype.map);
    var slice = call(Array.prototype.slice);
    var reduce = call(Array.prototype.reduce);
    var Pair = function(key, value) {
        return ({
            "key": key,
            "value": value
        });
    }
    ;
    var Context = function(loc, getChildren, getChild, constructNode) {
        (this.loc = loc);
        (this.getChildren = getChildren);
        (this.getChild = getChild);
        (this.constructNode = constructNode);
    }
    ;
    (Context.setLoc = function(ctx, loc) {
        return new Context(loc, ctx.getChildren, ctx.getChild, ctx.constructNode);
    }
    );
    var Loc = function(focus, parent, path, left, right) {
        (this.focus = focus);
        (this.parent = parent);
        (this.path = path);
        (this.left = left);
        (this.right = right);
    }
    ;
    (Loc.setFocus = function(loc, focus) {
        return new Loc(focus, loc.parent, loc.path, loc.left, loc.right);
    }
    );
    var getLoc = function(ctx) {
        return ctx.loc;
    }
    ;
    var getFocus = function(ctx) {
        return getLoc(ctx).focus;
    }
    ;
    var getChildren = function(ctx) {
        return ctx.getChildren(getFocus(ctx));
    }
    ;
    var hasChildren = function(ctx) {
        return ! ! getChildren(ctx).length;
    }
    ;
    var getChild = function(ctx, key) {
        return ctx.getChild(getFocus(ctx), key);
    }
    ;
    var getParent = function(ctx) {
        return getLoc(ctx).parent;
    }
    ;
    var hasParent = function(ctx) {
        return (getLoc(ctx).parent !== null);
    }
    ;
    var getPath = function(ctx) {
        return getLoc(ctx).path;
    }
    ;
    var pushPath = function(ctx, x) {
        return concat([x], getPath(ctx));
    }
    ;
    var popPath = function(ctx) {
        return slice(getPath(ctx), 1);
    }
    ;
    var construct = function(ctx, parent, children) {
        return ctx.constructNode(ctx, parent, children);
    }
    ;
    var constructParent = function(ctx) {
        return ctx.constructNode(getParent(ctx).focus, concat(ctx.loc.left, Pair(ctx.loc.path[0], ctx.loc.focus), ctx.loc.right).reduce(function(p, c) {
            (p[c.key] = c.value);
            return p;
        }
        , ({})));
    }
    ;
    var path = function(ctx) {
        return getLoc(ctx).left;
    }
    ;
    var lefts = function(ctx) {
        return getLoc(ctx).left;
    }
    ;
    var rights = function(ctx) {
        return getLoc(ctx).right;
    }
    ;
    var up = function(ctx) {
        return (! hasParent(ctx) ? null : Context.setLoc(ctx, Loc.setFocus(getParent(ctx), constructParent(ctx))));
    }
    ;
    var down = function(ctx) {
        return (! hasChildren(ctx) ? null : function(children) {
            return Context.setLoc(ctx, new Loc(getChild(ctx, children[0]), getLoc(ctx), pushPath(ctx, children[0]), [], children.slice(1).map(function(x) {
                return Pair(x, getChild(ctx, x));
            }
            )));
        }
        (getChildren(ctx)));
    }
    ;
    var left = function(loc) {
        return loc;
    }
    ;
    var right = function(ctx) {
        return function(rs) {
            return function(r) {
                return (! rs.length ? null : Context.setLoc(ctx, new Loc(r.value, getParent(ctx), concat([r.key], slice(getPath(ctx, 1))), concat(ctx.loc.left, Pair(getPath(ctx)[0], getFocus(ctx))), slice(ctx.loc.right, 1))));
            }
            (rs[0]);
        }
        (rights(ctx));
    }
    ;
    var root = function(ctx) {
        return function(parent) {
            return (parent ? root(parent) : ctx);
        }
        (up(ctx));
    }
    ;
    var leftmost = function(ctx) {
        return function(l) {
            return (l ? leftmost(l) : ctx);
        }
        (left(ctx));
    }
    ;
    var rightmost = function(ctx) {
        return function(r) {
            return (r ? rightmost(r) : ctx);
        }
        (right(ctx));
    }
    ;
    var getNode = getFocus;
    var setNode = function(ctx, node) {
        return Context.setLoc(ctx, Loc.setFocus(getLoc(ctx), node));
    }
    ;
    var modifyNode = function(ctx, f) {
        return setNode(ctx, f(getNode(ctx)));
    }
    ;
    var insertLeft;
    var insertRight;
    var insertChild;
    var appendChild;
    var zipper = function(root, getChildren, getChild, constructNode) {
        return new Context(new Loc(root, null, [], [], []), getChildren, getChild, constructNode);
    }
    ;
    var treeZipper = function(getChildren) {
        return function(getChild) {
            return function(constructNode) {
                return function(root) {
                    return zipper(root, getChildren, getChild, constructNode);
                }
                ;
            }
            (function constructNode(x, children) {
                return x.construct(x, children);
            }
            );
        }
        (function getChild(x, k) {
            return x[k];
        }
        );
    }
    (function getChildren(x) {
        return x.children;
    }
    );
    return ({
        "Loc": Loc,
        "up": up,
        "down": down,
        "left": left,
        "right": right,
        "root": root,
        "leftmost": leftmost,
        "rightmost": rightmost,
        "getNode": getNode,
        "setNode": setNode,
        "modifyNode": modifyNode,
        "lefts": lefts,
        "rights": rights,
        "zipper": zipper,
        "treeZipper": treeZipper
    });
}
);
