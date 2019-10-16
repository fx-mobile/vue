(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.getters = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var getters = {
    tax_sidebar: state => state.tax_app.sidebar,
    tax_device: state => state.tax_app.device,
    tax_token: state => state.tax_user.token,
    tax_user_info: state => state.tax_user.info,
    nav_router: state => state.tax_user.nav
  };
  var _default = getters;
  _exports.default = _default;
});