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
    global.validate = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isExternal = isExternal;
  _exports.validPhone = validPhone;
  _exports.validUsername = validUsername;
  _exports.validURL = validURL;
  _exports.validLowerCase = validLowerCase;
  _exports.validUpperCase = validUpperCase;
  _exports.validAlphabets = validAlphabets;
  _exports.validEmail = validEmail;
  _exports.isString = isString;
  _exports.isArray = isArray;

  function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
  }

  function validPhone(phone) {
    return /^1[3456789]\d{9}$/.test(phone);
  }

  function validUsername(str) {
    var valid_map = ['admin', 'editor'];
    return valid_map.indexOf(str.trim()) >= 0;
  }

  function validURL(url) {
    var reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test(url);
  }

  function validLowerCase(str) {
    var reg = /^[a-z]+$/;
    return reg.test(str);
  }

  function validUpperCase(str) {
    var reg = /^[A-Z]+$/;
    return reg.test(str);
  }

  function validAlphabets(str) {
    var reg = /^[A-Za-z]+$/;
    return reg.test(str);
  }

  function validEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  function isString(str) {
    if (typeof str === 'string' || str instanceof String) {
      return true;
    }

    return false;
  }

  function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

    return Array.isArray(arg);
  }
});