/*
 * THIS FILE IS AUTO GENERATED from 'lib/list.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "neith/zipper", "nu/stream"], (function(require, exports, __o, stream) {
    "use strict";
    var listZipper, listZipperIn;
    var __o = __o,
        zipper = __o["zipper"],
        setLefts = __o["setLefts"],
        setRights = __o["setRights"],
        stream = stream,
        first = stream["first"],
        foldl = stream["foldl"],
        cons = stream["cons"],
        map = stream["map"],
        toArray = stream["toArray"],
        isStream = stream["isStream"],
        isEmpty = stream["isEmpty"],
        NIL = stream["end"];
    (listZipper = (function(s) {
        return (function() {
            {
                var children = (function(s) {
                    return (stream.isStream(s) ? s : NIL);
                }),
                    construct = (function(_, children) {
                        return children;
                    });
                return zipper(children, construct, s);
            }
        })();
    }));
    (listZipperIn = (function(lefts, focus, rights) {
        return setRights.bind(null, rights)(setLefts.bind(null, lefts)(listZipper(focus)));
    }));
    (exports.listZipper = listZipper);
    (exports.listZipperIn = listZipperIn);
}))