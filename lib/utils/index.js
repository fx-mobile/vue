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
  _exports.param2Obj = param2Obj;

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

  function param2Obj(url) {
    var search = url.split('?')[1];

    if (!search) {
      return {};
    }

    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}');
  }
});