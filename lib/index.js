(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./application", "./store", "./router", "./utils"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./application"), require("./store"), require("./router"), require("./utils"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.application, global.store, global.router, global.utils);
    global.index = mod.exports;
  }
})(this, function (_exports, _application, _store, _router, _utils) {
  "use strict";

  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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
  Object.defineProperty(_exports, "TaxModules", {
    enumerable: true,
    get: function get() {
      return _store.default;
    }
  });
  Object.defineProperty(_exports, "router", {
    enumerable: true,
    get: function get() {
      return _router.default;
    }
  });
  Object.defineProperty(_exports, "constantRoutes", {
    enumerable: true,
    get: function get() {
      return _router.constantRoutes;
    }
  });
  Object.defineProperty(_exports, "resetRouter", {
    enumerable: true,
    get: function get() {
      return _router.resetRouter;
    }
  });
  Object.defineProperty(_exports, "concatRouter", {
    enumerable: true,
    get: function get() {
      return _router.concatRouter;
    }
  });
  Object.defineProperty(_exports, "utils", {
    enumerable: true,
    get: function get() {
      return _utils.default;
    }
  });
  _store = _interopRequireDefault(_store);
  _router = _interopRequireWildcard(_router);
  _utils = _interopRequireDefault(_utils);
});