(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index);
    global.permission = mod.exports;
  }
})(this, function (_exports, _index) {
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
      state.routes = _index.constantRoutes.concat(routes);
      console.log('jjj', _index.constantRoutes);
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