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
  _exports.parseTime = parseTime;
  _exports.formatTime = formatTime;
  _exports.getQueryObject = getQueryObject;
  _exports.byteLength = byteLength;
  _exports.cleanArray = cleanArray;
  _exports.param = param;
  _exports.param2Obj = param2Obj;
  _exports.html2Text = html2Text;
  _exports.objectMerge = objectMerge;
  _exports.toggleClass = toggleClass;
  _exports.getTime = getTime;
  _exports.debounce = debounce;
  _exports.deepClone = deepClone;
  _exports.uniqueArr = uniqueArr;
  _exports.createUniqueString = createUniqueString;
  _exports.hasClass = hasClass;
  _exports.addClass = addClass;
  _exports.removeClass = removeClass;

  function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }

    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    var date;

    if (typeof time === 'object') {
      date = time;
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      }

      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000;
      }

      date = new Date(time);
    }

    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      var value = formatObj[key];

      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }

      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }

      return value || 0;
    });
    return time_str;
  }

  function formatTime(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000;
    } else {
      time = +time;
    }

    var d = new Date(time);
    var now = Date.now();
    var diff = (now - d) / 1000;

    if (diff < 30) {
      return '刚刚';
    } else if (diff < 3600) {
      return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
      return '1天前';
    }

    if (option) {
      return parseTime(time, option);
    } else {
      return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
    }
  }

  function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf('?') + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
      var name = decodeURIComponent($1);
      var val = decodeURIComponent($2);
      val = String(val);
      obj[name] = val;
      return rs;
    });
    return obj;
  }

  function byteLength(str) {
    var s = str.length;

    for (var i = str.length - 1; i >= 0; i--) {
      var code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;else if (code > 0x7ff && code <= 0xffff) s += 2;
      if (code >= 0xDC00 && code <= 0xDFFF) i--;
    }

    return s;
  }

  function cleanArray(actual) {
    var newArray = [];

    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }

    return newArray;
  }

  function param(json) {
    if (!json) return '';
    return cleanArray(Object.keys(json).map(key => {
      if (json[key] === undefined) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })).join('&');
  }

  function param2Obj(url) {
    var search = url.split('?')[1];

    if (!search) {
      return {};
    }

    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}');
  }

  function html2Text(val) {
    var div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
  }

  function objectMerge(target, source) {
    if (typeof target !== 'object') {
      target = {};
    }

    if (Array.isArray(source)) {
      return source.slice();
    }

    Object.keys(source).forEach(property => {
      var sourceProperty = source[property];

      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty);
      } else {
        target[property] = sourceProperty;
      }
    });
    return target;
  }

  function toggleClass(element, className) {
    if (!element || !className) {
      return;
    }

    var classString = element.className;
    var nameIndex = classString.indexOf(className);

    if (nameIndex === -1) {
      classString += '' + className;
    } else {
      classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }

    element.className = classString;
  }

  function getTime(type) {
    if (type === 'start') {
      return new Date().getTime() - 3600 * 1000 * 24 * 90;
    } else {
      return new Date(new Date().toDateString());
    }
  }

  function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function later() {
      var last = +new Date() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;

        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      context = this;
      timestamp = +new Date();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);

      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  }

  function deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone');
    }

    var targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    });
    return targetObj;
  }

  function uniqueArr(arr) {
    return Array.from(new Set(arr));
  }

  function createUniqueString() {
    var timestamp = +new Date() + '';
    var randomNum = parseInt((1 + Math.random()) * 65536) + '';
    return (+(randomNum + timestamp)).toString(32);
  }

  function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls;
  }

  function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  }
});