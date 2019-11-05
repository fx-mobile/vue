(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.localStorage = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setItem = setItem;
  _exports.getItem = getItem;

  function setItem(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  function getItem(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }
});