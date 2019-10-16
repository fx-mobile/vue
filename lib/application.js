(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/defineProperty", "vue", "vuex", "../packages/App", "./router", "./store", "./store/getters", "@ttk/vue-ui"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/defineProperty"), require("vue"), require("vuex"), require("../packages/App"), require("./router"), require("./store"), require("./store/getters"), require("@ttk/vue-ui"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.defineProperty, global.vue, global.vuex, global.App, global.router, global.store, global.getters, global.vueUi);
    global.application = mod.exports;
  }
})(this, function (_exports, _defineProperty2, _vue, _vuex, _App, _router, _store, _getters, _vueUi) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.store = _exports.router = _exports.start = _exports.registerFun = _exports.app = void 0;
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _vue = _interopRequireDefault(_vue);
  _vuex = _interopRequireDefault(_vuex);
  _App = _interopRequireDefault(_App);
  _store = _interopRequireDefault(_store);
  _getters = _interopRequireDefault(_getters);
  _vueUi = _interopRequireDefault(_vueUi);

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  _vue.default.use(_vueUi.default);

  _vue.default.use(_vuex.default);

  class SingletonApp {
    constructor() {
      console.log('singletonApp');
    }

    static getInstance() {
      if (!this.instance) {
        this.instance = new SingletonApp();
      }

      return this.instance;
    }

  }

  var registerFun = (funName, fun) => {
    if (typeof funName !== 'string') {
      console.error("\u6CE8\u5165\u51FD\u6570\u65F6\u7B2C\u4E00\u4E2A\u53C2\u6570\u5FC5\u987B\u662F String \u7C7B\u578B\uFF0C\u5F53\u524D\u4E3A: ".concat(funName));
    }

    if (typeof fun !== 'function') {
      console.error("\u6CE8\u5165\u51FD\u6570\u65F6\u7B2C\u4E8C\u4E2A\u53C2\u6570\u5FC5\u987B\u662F function \u7C7B\u578B\uFF0C\u5F53\u524D\u4E3A: ".concat(fun));
    }

    var instance = SingletonApp.getInstance();
    instance[funName] = fun;
  };

  _exports.registerFun = registerFun;

  var _iewRouter = (0, _router.scanRouter)();

  var router = (0, _router.registryRouter)(_iewRouter);
  _exports.router = router;

  var _viewModules = _store.default.getViewModules();

  var _taxModues = _store.default.modules;
  var store = new _vuex.default.Store({
    modules: _objectSpread({}, _viewModules, {}, _taxModues),
    getters: _getters.default
  });
  _exports.store = store;

  var start = () => {
    new _vue.default({
      el: '#app',
      router,
      store,
      render: h => h(_App.default)
    });
  };

  _exports.start = start;
  var app = SingletonApp.getInstance();
  _exports.app = app;
});