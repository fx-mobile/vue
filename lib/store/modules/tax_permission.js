(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../router", "../../utils/local-storage"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../router"), require("../../utils/local-storage"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.router, global.localStorage);
    global.tax_permission = mod.exports;
  }
})(this, function (_exports, _router, _localStorage) {
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

      var t = _router.constantRoutes.concat(routes);

      (0, _localStorage.setItem)('tax-routes', t);
      state.routes = t;
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