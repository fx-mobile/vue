(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../utils/request"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../utils/request"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.request);
    global.user = mod.exports;
  }
})(this, function (_exports, _request) {
  "use strict";

  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.login = login;
  _exports.logout = logout;
  _exports.getNav = getNav;
  _request = _interopRequireWildcard(_request);

  function login(data) {
    return (0, _request.default)({
      url: '/gateway/org/back/userService/loginExt?appId=10001006',
      method: 'post',
      data
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
    var {
      depId = '2',
      appId = 10001006
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      depId: '2',
      appId: 10001006
    };
    var url = "/gateway/org/back/functionService/querySecFunctionNav?appId=".concat(appId);
    return (0, _request.post)(url, {
      depId
    });
  }
});