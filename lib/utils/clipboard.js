(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "vue", "clipboard"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("vue"), require("clipboard"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vue, global.clipboard);
    global.clipboard = mod.exports;
  }
})(this, function (_exports, _vue, _clipboard) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = handleClipboard;
  _vue = _interopRequireDefault(_vue);
  _clipboard = _interopRequireDefault(_clipboard);

  function clipboardSuccess() {
    _vue.default.prototype.$message({
      message: 'Copy successfully',
      type: 'success',
      duration: 1500
    });
  }

  function clipboardError() {
    _vue.default.prototype.$message({
      message: 'Copy failed',
      type: 'error'
    });
  }

  function handleClipboard(_text, event) {
    var clipboard = new _clipboard.default(event.target, {
      text: () => _text
    });
    clipboard.on('success', () => {
      clipboardSuccess();
      clipboard.destroy();
    });
    clipboard.on('error', () => {
      clipboardError();
      clipboard.destroy();
    });
    clipboard.onClick(event);
  }
});