(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/defineProperty", "@babel/runtime/helpers/asyncToGenerator", "axios", "@ttk/vue-ui", "../application", "./auth", "./index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/defineProperty"), require("@babel/runtime/helpers/asyncToGenerator"), require("axios"), require("@ttk/vue-ui"), require("../application"), require("./auth"), require("./index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.defineProperty, global.asyncToGenerator, global.axios, global.vueUi, global.application, global.auth, global.index);
    global.request = mod.exports;
  }
})(this, function (_exports, _defineProperty2, _asyncToGenerator2, _axios, _vueUi, _application, _auth, _index) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.post = post;
  _exports.get = get;
  _exports.postAwait = postAwait;
  _exports.getAwait = getAwait;
  _exports.default = void 0;
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _axios = _interopRequireDefault(_axios);

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var service = _axios.default.create({
    baseURL: '',
    timeout: 5000
  });

  service.interceptors.request.use(config => {
    var requestId = (0, _index.uuid)(32, 12);
    config.url += "&requestId=".concat(requestId);

    if (_application.store.getters.tax_token) {
      config.url += "&token=".concat((0, _auth.getToken)());
      config.headers['X-Token'] = (0, _auth.getToken)();
    }

    return config;
  }, error => {
    console.log(error);
    return Promise.reject(error);
  });
  service.interceptors.response.use(response => {
    var res = response.data.head;

    if (res.errorCode !== "0") {
      (0, _vueUi.Message)({
        message: res.errorMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      if (res.errorCode === "100100000018" || res.errorCode === 50012 || res.errorCode === 50014) {
        _vueUi.MessageBox.confirm(res.errorMsg, '登录确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _application.store.dispatch('tax_user/resetToken').then(() => {
            location.reload();
          });
        });
      }

      return Promise.reject(new Error(res.errorMsg || 'Error'));
    } else {
      return response.data;
    }
  }, error => {
    (0, _vueUi.Message)({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  });

  function post(_x) {
    return _post.apply(this, arguments);
  }

  function _post() {
    _post = (0, _asyncToGenerator2.default)(function* (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return yield service({
        url,
        method: 'post',
        data: _objectSpread({}, data)
      });
    });
    return _post.apply(this, arguments);
  }

  function get(_x2) {
    return _get.apply(this, arguments);
  }

  function _get() {
    _get = (0, _asyncToGenerator2.default)(function* (url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return yield service({
        url,
        method: 'get',
        data: _objectSpread({}, data)
      });
    });
    return _get.apply(this, arguments);
  }

  function postAwait(_x3, _x4) {
    return _postAwait.apply(this, arguments);
  }

  function _postAwait() {
    _postAwait = (0, _asyncToGenerator2.default)(function* (url, data) {
      return yield service.post(url, JSON.stringify(data));
    });
    return _postAwait.apply(this, arguments);
  }

  function getAwait() {
    return _getAwait.apply(this, arguments);
  }

  function _getAwait() {
    _getAwait = (0, _asyncToGenerator2.default)(function* () {
      return yield service.get(url, JSON.stringify(data));
    });
    return _getAwait.apply(this, arguments);
  }

  var _default = service;
  _exports.default = _default;
});