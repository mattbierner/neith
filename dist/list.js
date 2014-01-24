/*
 * THIS FILE IS AUTO GENERATED from 'lib/list.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu-stream/stream", "./zipper"], (function(require, exports, __o, __o0) {
    "use strict";
    var isStream = __o["isStream"],
        from = __o["from"],
        map = __o["map"],
        toArray = __o["toArray"],
        NIL = __o["NIL"],
        zipper = __o0["zipper"],
        setLefts = __o0["setLefts"],
        setRights = __o0["setRights"],
        listZipper, listZipperIn, arrayZipper, children = (function(s) {
            return (isStream(s) ? s : NIL);
        }),
        construct = (function(_, children) {
            return children;
        });
    (listZipper = zipper.bind(null, children, construct));
    (listZipperIn = (function(lefts, focus, rights) {
        return setRights(rights, setLefts(lefts, listZipper(focus)));
    }));
    var children0 = (function(s) {
        return (Array.isArray(s) ? from(s) : NIL);
    }),
        construct0 = (function(_, children) {
            return toArray(children);
        });
    (arrayZipper = zipper.bind(null, children0, construct0));
    (exports.listZipper = listZipper);
    (exports.listZipperIn = listZipperIn);
    (exports.arrayZipper = arrayZipper);
}));