(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../utils/request", "../utils/auth"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../utils/request"), require("../utils/auth"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.request, global.auth);
    global.user = mod.exports;
  }
})(this, function (_exports, _request, _auth) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.login = login;
  _exports.getInfo = getInfo;
  _exports.logout = logout;
  _exports.getNav = getNav;
  _request = _interopRequireDefault(_request);

  function login(data) {
    return (0, _request.default)({
      url: '/gateway/org/back/userService/loginExt?appId=10001006&requestId=2c3b44751ae520bcfe56a7b782cb548b',
      method: 'post',
      data
    });
  }

  function getInfo() {
    var token = (0, _auth.getToken)();
    return (0, _request.default)({
      url: "/gateway/appcenter/back/confAuthUser/checkLoginDataPermission?appId=10001006&requestId=c246ac00fecdcccbe9dcb0269d342286&token=".concat(token),
      method: 'post',
      data: {}
    });
  }

  function logout(token) {
    return (0, _request.default)({
      url: "/gateway/org/back/userService/logout?appId=10001006&requestId=20ee7986f24222c7bfc3cabe58400bec&token=".concat(token),
      method: 'post',
      data: {
        token
      }
    });
  }

  function getNav() {
    var token = (0, _auth.getToken)();
    return (0, _request.default)({
      url: "/gateway/org/back/functionService/querySecFunctionNav?appId=10001006&requestId=888d1796f0d31d7c67b37aa9459d8a96&token=".concat(token),
      method: 'post',
      data: {
        depId: "1"
      }
    });
  }
});