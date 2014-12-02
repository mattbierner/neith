/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/list.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("nu-stream")["stream"],
    __o0 = require("./zipper"),
    listZipper, listZipperIn, arrayZipper, isStream = __o["isStream"],
    from = __o["from"],
    toArray = __o["toArray"],
    NIL = __o["NIL"],
    zipper = __o0["zipper"],
    setLefts = __o0["setLefts"],
    setRights = __o0["setRights"],
    children = (function(s) {
        return (isStream(s) ? s : NIL);
    }),
    construct = (function(_, children0) {
        return children0;
    });
(listZipper = zipper.bind(null, children, construct));
(listZipperIn = (function(lefts, focus, rights) {
    return setRights(rights, setLefts(lefts, listZipper(focus)));
}));
var children0 = (function(s) {
    return (Array.isArray(s) ? from(s) : NIL);
}),
    construct0 = (function(_, children1) {
        return toArray(children1);
    });
(arrayZipper = zipper.bind(null, children0, construct0));
(exports["listZipper"] = listZipper);
(exports["listZipperIn"] = listZipperIn);
(exports["arrayZipper"] = arrayZipper);