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
    global.getPageTitle = mod.exports;
  }
})(this, function (_exports, _settings) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = getPageTitle;
  _settings = _interopRequireDefault(_settings);
  var title = _settings.default.title || 'Vue Admin Template';

  function getPageTitle(pageTitle) {
    if (pageTitle) {
      return "".concat(pageTitle, " - ").concat(title);
    }

    return "".concat(title);
  }
});