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
    global.index = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var getViewModules = () => {
    var modulesFiles = require.context('@/views', true, /\.store\.js$/);

    var modules = modulesFiles.keys().reduce((modules, modulePath) => {
      var moduleName = modulePath.replace(/^\.\/(.*)\/(.*)\.store\.\w+$/, '$2');
      var value = modulesFiles(modulePath);
      modules[moduleName] = value.default;
      return modules;
    }, {});
    return modules;
  };

  var modulesFiles = require.context('./modules', true, /\.js$/);

  var taxModules = modulesFiles.keys().reduce((modules, modulePath) => {
    var moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    var value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
  }, {});
  var _default = {
    getViewModules: getViewModules,
    modules: taxModules
  };
  _exports.default = _default;
});