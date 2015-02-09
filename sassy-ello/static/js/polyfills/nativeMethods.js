(function () {

    "use strict";


    // Native method polyfills for older browsers

    var Arr     = Array.prototype,
        Fun     = Function.prototype,
        slice   = Arr.slice;


    if (!Arr.forEach) Arr.forEach = function (cb, context) {
        var i, len = this.length;
        for (i = 0; i < len; i++) cb.call(context, this[i], i, this);
    };


    if (!Arr.filter) Arr.filter = function (f, context) {
        var v, i, len = this.length, res = [];
        for (i = 0; i < len; i++) {
            v = this[i];
            if (f.call(context, v, i, this)) res.push(v);
        }
        return res;
    };


    if (!Arr.map) Arr.map = function (f, context) {
        var v, i, len = this.length, res = [];
        for (i = 0; i < len; i++) res.push(f.call(context, this[i], i, this));
        return res;
    };


}).call(this);      