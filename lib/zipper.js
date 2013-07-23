/*
 * THIS FILE IS AUTO GENERATED from 'lib/zipper.kep'
 * DO NOT EDIT
*/
;
define([], function() {
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
    var constructParent = function(ctx) {
        return ctx.constructNode(getFocus(getParent(ctx)), ctx.loc.left.concat(Pair(ctx.loc.path[0], ctx.loc.focus), ctx.loc.right).reduce(function(p, c) {
            (p[c.key] = c.value);
            return p;
        }
        , ({})));
    }
    ;
    var up = function(ctx) {
        return (hasParent(ctx) ? Context.setLoc(ctx, Loc.setFocus(getLoc(getParent(ctx)), constructParent(ctx))) : null);
    }
    ;
    var down = function(ctx) {
        return (hasChildren(ctx) ? function(children) {
            return Context.setLoc(ctx, new Loc(getChild(ctx, children[0]), ctx, [children[0]].concat(ctx.path), [], children.slice(1).map(function(x) {
                return Pair(x, getChild(ctx, x));
            }
            )));
        }
        (getChildren(ctx)) : null);
    }
    ;
    var left = function(loc) {
        return loc;
    }
    ;
    var right = function(ctx) {
        return Context.setLoc(ctx, new Loc(getFocus(getParent(ctx))[ctx.loc.right[0].key], getParent(ctx), [ctx.loc.right[0]].concat(ctx.loc.path), ctx.loc.left.concat(ctx.loc.path[0].key), ctx.loc.right.slice(1)));
    }
    ;
    var root = function(ctx) {
        return function(parent) {
            return (parent ? root(parent) : ctx);
        }
        (up(ctx));
    }
    ;
    var getNode = getFocus;
    var setNode = function(ctx, node) {
        return Context.setLoc(ctx, new Loc(node, ctx.loc.parent, ctx.loc.path, ctx.loc.left, ctx.loc.right));
    }
    ;
    var modifyNode = function(ctx, f) {
        return setNode(ctx, f(getNode(ctx)));
    }
    ;
    var insertLeft = function(ctx, node) {
        return Context.setLoc(ctx);
    }
    ;
    var path = function(loc) {
        return loc.path;
    }
    ;
    var lefts = function(loc) {
        return loc.left;
    }
    ;
    var rights = function(loc) {
        return loc.right;
    }
    ;
    var zipper = function(focus, getChildren, getChild, constructNode) {
        return new Context(new Loc(focus, null, [], [], []), getChildren, getChild, constructNode);
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
    var listZipper = function(root) {
        return treeZipper(root);
    }
    ;
    return ({
        "Loc": Loc,
        "up": up,
        "down": down,
        "left": left,
        "right": right,
        "root": root,
        "getNode": getNode,
        "setNode": setNode,
        "modifyNode": modifyNode,
        "lefts": lefts,
        "rights": rights,
        "zipper": treeZipper
    });
}
);
