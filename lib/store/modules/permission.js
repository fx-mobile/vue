(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/defineProperty", "../../index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/defineProperty"), require("../../index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.defineProperty, global.index);
    global.permission = mod.exports;
  }
})(this, function (_exports, _defineProperty2, _index) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.filterAsyncRoutes = filterAsyncRoutes;
  _exports.default = void 0;
  _defineProperty2 = _interopRequireDefault(_defineProperty2);

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role));
    } else {
      return true;
    }
  }

  function filterAsyncRoutes(routes) {
    var res = [];
    routes.forEach(route => {
      var tmp = _objectSpread({}, route);

      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children);
      }

      res.push(tmp);
    });
    return res;
  }

  var state = {
    routes: [],
    addRoutes: []
  };
  var mutations = {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;

      var app = _index.SingletonApp.getInstance();

      var constantRoutes = app.getRouters();
      console.log('jjj', constantRoutes);
      state.routes = constantRoutes.concat(routes);
    }
  };
  var actions = {
    generateRoutes(_ref) {
      var {
        commit
      } = _ref;
      return new Promise(resolve => {
        commit('SET_ROUTES', []);
        resolve();
      });
    }

  };
  var _default = {
    namespaced: true,
    state,
    mutations,
    actions
  };
  _exports.default = _default;
});