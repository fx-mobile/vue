(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../router"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../router"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.router);
    global.tax_permission = mod.exports;
  }
})(this, function (_exports, _router) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var state = {
    routes: [],
    addRoutes: []
  };
  var mutations = {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = _router.constantRoutes.concat(routes);
    }
  };
  var actions = {
    appendRoutes(_ref, routes) {
      var {
        commit
      } = _ref;
      return new Promise(resolve => {
        commit('SET_ROUTES', routes);
        resolve();
      });
    },

    getRoutes() {
      return state.routes;
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