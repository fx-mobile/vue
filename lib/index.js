(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./application", "./store", "./router", "./utils", "./utils/auth", "./utils/clipboard", "./utils/get-page-title", "./utils/local-storage", "./utils/open-window", "./utils/request", "./utils/validate"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./application"), require("./store"), require("./router"), require("./utils"), require("./utils/auth"), require("./utils/clipboard"), require("./utils/get-page-title"), require("./utils/local-storage"), require("./utils/open-window"), require("./utils/request"), require("./utils/validate"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.application, global.store, global.router, global.utils, global.auth, global.clipboard, global.getPageTitle, global.localStorage, global.openWindow, global.request, global.validate);
    global.index = mod.exports;
  }
})(this, function (_exports, _application, _store, _router, _utils, _auth, _clipboard, _getPageTitle, _localStorage, _openWindow, _request, _validate) {
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
  Object.defineProperty(_exports, "generateRouter", {
    enumerable: true,
    get: function get() {
      return _router.generateRouter;
    }
  });
  Object.defineProperty(_exports, "utils", {
    enumerable: true,
    get: function get() {
      return _utils.default;
    }
  });
  Object.defineProperty(_exports, "getToken", {
    enumerable: true,
    get: function get() {
      return _auth.getToken;
    }
  });
  Object.defineProperty(_exports, "setToken", {
    enumerable: true,
    get: function get() {
      return _auth.setToken;
    }
  });
  Object.defineProperty(_exports, "removeToken", {
    enumerable: true,
    get: function get() {
      return _auth.removeToken;
    }
  });
  Object.defineProperty(_exports, "handleClipboard", {
    enumerable: true,
    get: function get() {
      return _clipboard.default;
    }
  });
  Object.defineProperty(_exports, "getPageTitle", {
    enumerable: true,
    get: function get() {
      return _getPageTitle.default;
    }
  });
  Object.defineProperty(_exports, "setItem", {
    enumerable: true,
    get: function get() {
      return _localStorage.setItem;
    }
  });
  Object.defineProperty(_exports, "getItem", {
    enumerable: true,
    get: function get() {
      return _localStorage.getItem;
    }
  });
  Object.defineProperty(_exports, "openWindow", {
    enumerable: true,
    get: function get() {
      return _openWindow.default;
    }
  });
  Object.defineProperty(_exports, "service", {
    enumerable: true,
    get: function get() {
      return _request.default;
    }
  });
  Object.defineProperty(_exports, "isExternal", {
    enumerable: true,
    get: function get() {
      return _validate.isExternal;
    }
  });
  Object.defineProperty(_exports, "validPhone", {
    enumerable: true,
    get: function get() {
      return _validate.validPhone;
    }
  });
  Object.defineProperty(_exports, "validUsername", {
    enumerable: true,
    get: function get() {
      return _validate.validUsername;
    }
  });
  Object.defineProperty(_exports, "validURL", {
    enumerable: true,
    get: function get() {
      return _validate.validURL;
    }
  });
  Object.defineProperty(_exports, "validLowerCase", {
    enumerable: true,
    get: function get() {
      return _validate.validLowerCase;
    }
  });
  Object.defineProperty(_exports, "validUpperCase", {
    enumerable: true,
    get: function get() {
      return _validate.validUpperCase;
    }
  });
  Object.defineProperty(_exports, "validAlphabets", {
    enumerable: true,
    get: function get() {
      return _validate.validAlphabets;
    }
  });
  Object.defineProperty(_exports, "validEmail", {
    enumerable: true,
    get: function get() {
      return _validate.validEmail;
    }
  });
  Object.defineProperty(_exports, "isString", {
    enumerable: true,
    get: function get() {
      return _validate.isString;
    }
  });
  Object.defineProperty(_exports, "isArray", {
    enumerable: true,
    get: function get() {
      return _validate.isArray;
    }
  });
  _store = _interopRequireDefault(_store);
  _router = _interopRequireWildcard(_router);
  _utils = _interopRequireDefault(_utils);
  _clipboard = _interopRequireDefault(_clipboard);
  _getPageTitle = _interopRequireDefault(_getPageTitle);
  _openWindow = _interopRequireDefault(_openWindow);
  _request = _interopRequireDefault(_request);
});