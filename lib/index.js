(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./application", "./store", "./utils"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./application"), require("./store"), require("./utils"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.application, global.store, global.utils);
    global.index = mod.exports;
  }
})(this, function (_exports, _application, _store, _utils) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "SingletonApp", {
    enumerable: true,
    get: function get() {
      return _application.SingletonApp;
    }
  });
  Object.defineProperty(_exports, "app", {
    enumerable: true,
    get: function get() {
      return _application.app;
    }
  });
  Object.defineProperty(_exports, "start", {
    enumerable: true,
    get: function get() {
      return _application.start;
    }
  });
  Object.defineProperty(_exports, "registerFun", {
    enumerable: true,
    get: function get() {
      return _application.registerFun;
    }
  });
  Object.defineProperty(_exports, "store", {
    enumerable: true,
    get: function get() {
      return _application.store;
    }
  });
  Object.defineProperty(_exports, "router", {
    enumerable: true,
    get: function get() {
      return _application.router;
    }
  });
  Object.defineProperty(_exports, "TaxModules", {
    enumerable: true,
    get: function get() {
      return _store.default;
    }
  });
  Object.defineProperty(_exports, "utils", {
    enumerable: true,
    get: function get() {
      return _utils.default;
    }
  });
  _store = _interopRequireDefault(_store);
  _utils = _interopRequireDefault(_utils);
});