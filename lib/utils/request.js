(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "axios", "tax-group-ui", "../application", "./auth"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("axios"), require("tax-group-ui"), require("../application"), require("./auth"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios, global.taxGroupUi, global.application, global.auth);
    global.request = mod.exports;
  }
})(this, function (_exports, _axios, _taxGroupUi, _application, _auth) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _axios = _interopRequireDefault(_axios);

  var service = _axios.default.create({
    baseURL: '',
    timeout: 5000
  });

  service.interceptors.request.use(config => {
    if (_application.store.getters.token) {
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
      (0, _taxGroupUi.Message)({
        message: res.errorMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      if (res.errorCode === "100100000018" || res.errorCode === 50012 || res.errorCode === 50014) {
        _taxGroupUi.MessageBox.confirm(res.errorMsg, '登录确认', {
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
    (0, _taxGroupUi.Message)({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  });
  var _default = service;
  _exports.default = _default;
});