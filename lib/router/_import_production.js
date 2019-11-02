(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global._import_production = mod.exports;
  }
})(this, function () {
  "use strict";

  module.exports = file => () => import('@/pages' + file + '.vue');
});