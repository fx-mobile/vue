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
    global._import_development = mod.exports;
  }
})(this, function () {
  "use strict";

  module.exports = file => {
    var component;

    try {
      component = require('@/pages' + file + '.vue').default;
    } catch (err) {
      component = {
        render: c => c('div', "\u672A\u627E\u5230\u8BE5\u9875\u9762: /pages".concat(file, ".vue"))
      };
    }

    return component;
  };
});