(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "js-cookie"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("js-cookie"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jsCookie);
    global.auth = mod.exports;
  }
})(this, function (_exports, _jsCookie) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getToken = getToken;
  _exports.setToken = setToken;
  _exports.removeToken = removeToken;
  _jsCookie = _interopRequireDefault(_jsCookie);
  var TokenKey = 'tax_group_app_token';

  function getToken() {
    return _jsCookie.default.get(TokenKey);
  }

  function setToken(token) {
    return _jsCookie.default.set(TokenKey, token);
  }

  function removeToken() {
    return _jsCookie.default.remove(TokenKey);
  }
});