(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@/settings"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@/settings"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings);
    global.tax_settings = mod.exports;
  }
})(this, function (_exports, _settings) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _settings = _interopRequireDefault(_settings);
  var {
    showSettings,
    tagsView,
    fixedHeader,
    sidebarSearch
  } = _settings.default;
  var state = {
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarSearch: sidebarSearch
  };
  var mutations = {
    CHANGE_SETTING: (state, _ref) => {
      var {
        key,
        value
      } = _ref;

      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
    }
  };
  var actions = {
    changeSetting(_ref2, data) {
      var {
        commit
      } = _ref2;
      commit('CHANGE_SETTING', data);
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