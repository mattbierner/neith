define(["require", "exports", "nu-stream/stream", "./zipper"], (function(require, exports, __o, __o0) {
    "use strict";
    var listZipper, listZipperIn, arrayZipper;
    var __o = __o,
        isStream = __o["isStream"],
        from = __o["from"],
        toArray = __o["toArray"],
        NIL = __o["NIL"],
        __o0 = __o0,
        zipper = __o0["zipper"],
        setLefts = __o0["setLefts"],
        setRights = __o0["setRights"];
    (listZipper = (function() {
            var children = (function(s) {
                return (isStream(s) ? s : NIL);
            }),
                construct = (function(_, children) {
                    return children;
                });
            return zipper.bind(null, children, construct);
        })
        .call(this));
    (listZipperIn = (function(lefts, focus, rights) {
        return setRights(rights, setLefts(lefts, listZipper(focus)));
    }));
    (arrayZipper = (function() {
            var children0 = (function(s) {
                return (Array.isArray(s) ? from(s) : NIL);
            }),
                construct0 = (function(_, children) {
                    return toArray(children);
                });
            return zipper.bind(null, children0, construct0);
        })
        .call(this));
    (exports.listZipper = listZipper);
    (exports.listZipperIn = listZipperIn);
    (exports.arrayZipper = arrayZipper);
}))