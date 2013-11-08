/*
 * THIS FILE IS AUTO GENERATED from 'lib/list.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "neith/zipper", "nu/stream"], (function(require, exports, __o, __o0) {
    "use strict";
    var listZipper, listZipperIn, arrayZipper;
    var __o = __o,
        zipper = __o["zipper"],
        setLefts = __o["setLefts"],
        setRights = __o["setRights"],
        __o0 = __o0,
        isStream = __o0["isStream"],
        from = __o0["from"],
        toArray = __o0["toArray"],
        NIL = __o0["end"];
    (listZipper = (function(s) {
        return (function() {
            {
                var children = (function(s) {
                    return (isStream(s) ? s : NIL);
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
    (arrayZipper = (function(arr) {
        return (function() {
            {
                var children = (function(s) {
                    return (Array.isArray(s) ? from(s) : NIL);
                }),
                    construct = (function(_, children) {
                        return toArray(children);
                    });
                return zipper(children, construct, arr);
            }
        })();
    }));
    (exports.listZipper = listZipper);
    (exports.listZipperIn = listZipperIn);
    (exports.arrayZipper = arrayZipper);
}))