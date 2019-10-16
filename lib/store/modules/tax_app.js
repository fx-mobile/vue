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
    global.tax_app = mod.exports;
  }
})(this, function (_exports, _jsCookie) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _jsCookie = _interopRequireDefault(_jsCookie);
  var state = {
    sidebar: {
      opened: _jsCookie.default.get('sidebarStatus') ? !!+_jsCookie.default.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop'
  };
  var mutations = {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;

      if (state.sidebar.opened) {
        _jsCookie.default.set('sidebarStatus', 1);
      } else {
        _jsCookie.default.set('sidebarStatus', 0);
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      _jsCookie.default.set('sidebarStatus', 0);

      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }
  };
  var actions = {
    toggleSideBar(_ref) {
      var {
        commit
      } = _ref;
      commit('TOGGLE_SIDEBAR');
    },

    closeSideBar(_ref2, _ref3) {
      var {
        commit
      } = _ref2;
      var {
        withoutAnimation
      } = _ref3;
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },

    toggleDevice(_ref4, device) {
      var {
        commit
      } = _ref4;
      commit('TOGGLE_DEVICE', device);
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