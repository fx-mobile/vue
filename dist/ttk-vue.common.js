/*!
  * @ttk/vue v1.0.17
  * (c) 2019 laogong5i0
  * @license MIT
  */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var Router = _interopDefault(require('vue-router'));
var Vuex = _interopDefault(require('vuex'));
var Cookies = _interopDefault(require('js-cookie'));
var axios = _interopDefault(require('axios'));
var TaxGroupUI = _interopDefault(require('@ttk/vue-ui'));
var Clipboard = _interopDefault(require('clipboard'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

Vue.use(Router); // const _import = file => {
//   let component
//   if(process.env.NODE_ENV==="production"){
//     component = import('@/pages' + file + '.vue')
//   }else{
//     try {
//       component = require('@/pages' + file + '.vue').default
//     }catch(err){
//       component = {render: c=>c('div', `未找到该页面: /pages${file}.vue`)}
//     }
//   }
//   return component
// }

/**
 * Note: 子菜单只在 children.length >= 1 时显示
 *
 * hidden: true                   是否在菜单中显示， 默认为false
 * alwaysShow: true               当你1个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                只有1个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                若你想不管路由下面的 children 声明的个数都显示你的根路由，你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'icon-name'            设置该路由的图标
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    affix: true                  标签不可关闭
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  }
 */

var constantRoutes = [{
  path: '*',
  redirect: '/404',
  hidden: true
}];

var createRouter = function createRouter() {
  return new Router({
    // mode: 'history', // require service support
    scrollBehavior: function scrollBehavior() {
      return {
        y: 0
      };
    },
    routes: constantRoutes
  });
};

var router = createRouter(); // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465

var resetRouter = function resetRouter(_router) {
  var newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
};
var concatRouter = function concatRouter(routers) {
  constantRoutes.unshift.apply(constantRoutes, _toConsumableArray(routers));
};

var state = {
  sidebar: {
    opened: Cookies.get('tax-sidebar-status') ? !!+Cookies.get('tax-sidebar-status') : true,
    splitPaneStatus: Cookies.get('tax-sidebar-splitPaneStatus') ? Cookies.get('tax-sidebar-splitPaneStatus') : null,
    withoutAnimation: false
  },
  device: 'desktop'
};
var mutations = {
  TOGGLE_SIDEBAR: function TOGGLE_SIDEBAR(state, _ref) {
    var isOpened = _ref.isOpened,
        splitPaneStatus = _ref.splitPaneStatus;

    if (isOpened !== undefined) {
      state.sidebar.opened = isOpened ? !!isOpened : !state.sidebar.opened;
    }

    if (splitPaneStatus !== undefined) {
      state.sidebar.splitPaneStatus = splitPaneStatus;
      Cookies.set('tax-sidebar-splitPaneStatus', splitPaneStatus);
    }

    state.sidebar.withoutAnimation = false;

    if (state.sidebar.opened) {
      Cookies.set('tax-sidebar-status', 1);
    } else {
      Cookies.set('tax-sidebar-status', 0);
    }
  },
  CLOSE_SIDEBAR: function CLOSE_SIDEBAR(state, withoutAnimation) {
    Cookies.set('tax-sidebar-status', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: function TOGGLE_DEVICE(state, device) {
    state.device = device;
  }
};
var actions = {
  toggleSideBar: function toggleSideBar(_ref2) {
    var commit = _ref2.commit;
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    commit('TOGGLE_SIDEBAR', data);
  },
  closeSideBar: function closeSideBar(_ref3, _ref4) {
    var commit = _ref3.commit;
    var withoutAnimation = _ref4.withoutAnimation;
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice: function toggleDevice(_ref5, device) {
    var commit = _ref5.commit;
    commit('TOGGLE_DEVICE', device);
  }
};
var tax_app = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
};

var state$1 = {
  routes: [],
  addRoutes: []
};
var mutations$1 = {
  SET_ROUTES: function SET_ROUTES(state, routes) {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};
var actions$1 = {
  appendRoutes: function appendRoutes(_ref, routes) {
    var commit = _ref.commit;
    return new Promise(function (resolve) {
      commit('SET_ROUTES', routes);
      resolve();
    });
  },
  getRoutes: function getRoutes() {
    return state$1.routes;
  }
};
var tax_permission = {
  namespaced: true,
  state: state$1,
  mutations: mutations$1,
  actions: actions$1
};

// import variables from '@/styles/element-variables.scss'
// import defaultSettings from '@/settings'
var defaultSettings;

try {
  var modulesFiles = require.context('@/', true, /settings\.js$/);

  var settingFiles = modulesFiles.keys();

  if (settingFiles.length == 1) {
    defaultSettings = modulesFiles(settingFiles[0]);
  } else {
    throw 'src文件夹下必须有且只有一个settings.js文件，并做好设置';
  }
} catch (err) {
  throw new Error("src/settings.js\u6587\u4EF6\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u8BE5\u6587\u4EF6\u662F\u5426\u6B63\u786E\u914D\u7F6E\n".concat(err));
}

var _defaultSettings = defaultSettings,
    showSettings = _defaultSettings.showSettings,
    tagsView = _defaultSettings.tagsView,
    fixedHeader = _defaultSettings.fixedHeader,
    sidebarSearch = _defaultSettings.sidebarSearch;
var state$2 = {
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarSearch: sidebarSearch
};
var mutations$2 = {
  CHANGE_SETTING: function CHANGE_SETTING(state, _ref) {
    var key = _ref.key,
        value = _ref.value;

    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};
var actions$2 = {
  changeSetting: function changeSetting(_ref2, data) {
    var commit = _ref2.commit;
    commit('CHANGE_SETTING', data);
  }
};
var tax_settings = {
  namespaced: true,
  state: state$2,
  mutations: mutations$2,
  actions: actions$2
};

var state$3 = {
  visitedViews: [],
  cachedViews: []
};
var mutations$3 = {
  ADD_VISITED_VIEW: function ADD_VISITED_VIEW(state, view) {
    if (state.visitedViews.some(function (v) {
      return v.path === view.path;
    })) { return; }
    state.visitedViews.push(Object.assign({}, view, {
      title: view.meta.title || 'no-name'
    }));
  },
  ADD_CACHED_VIEW: function ADD_CACHED_VIEW(state, view) {
    if (state.cachedViews.includes(view.name)) { return; }

    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },
  DEL_VISITED_VIEW: function DEL_VISITED_VIEW(state, view) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = state.visitedViews.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2),
            i = _step$value[0],
            v = _step$value[1];

        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  DEL_CACHED_VIEW: function DEL_CACHED_VIEW(state, view) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = state.cachedViews[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var i = _step2.value;

        if (i === view.name) {
          var index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  },
  DEL_OTHERS_VISITED_VIEWS: function DEL_OTHERS_VISITED_VIEWS(state, view) {
    state.visitedViews = state.visitedViews.filter(function (v) {
      return v.meta.affix || v.path === view.path;
    });
  },
  DEL_OTHERS_CACHED_VIEWS: function DEL_OTHERS_CACHED_VIEWS(state, view) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = state.cachedViews[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var i = _step3.value;

        if (i === view.name) {
          var index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, index + 1);
          break;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  },
  DEL_ALL_VISITED_VIEWS: function DEL_ALL_VISITED_VIEWS(state) {
    // keep affix tags
    var affixTags = state.visitedViews.filter(function (tag) {
      return tag.meta.affix;
    });
    state.visitedViews = affixTags;
  },
  DEL_ALL_CACHED_VIEWS: function DEL_ALL_CACHED_VIEWS(state) {
    state.cachedViews = [];
  },
  UPDATE_VISITED_VIEW: function UPDATE_VISITED_VIEW(state, view) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = state.visitedViews[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var v = _step4.value;

        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }
};
var actions$3 = {
  addView: function addView(_ref, view) {
    var dispatch = _ref.dispatch;
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  addVisitedView: function addVisitedView(_ref2, view) {
    var commit = _ref2.commit;
    commit('ADD_VISITED_VIEW', view);
  },
  addCachedView: function addCachedView(_ref3, view) {
    var commit = _ref3.commit;
    commit('ADD_CACHED_VIEW', view);
  },
  delView: function delView(_ref4, view) {
    var dispatch = _ref4.dispatch,
        state = _ref4.state;
    return new Promise(function (resolve) {
      dispatch('delVisitedView', view);
      dispatch('delCachedView', view);
      resolve({
        visitedViews: _toConsumableArray(state.visitedViews),
        cachedViews: _toConsumableArray(state.cachedViews)
      });
    });
  },
  delVisitedView: function delVisitedView(_ref5, view) {
    var commit = _ref5.commit,
        state = _ref5.state;
    return new Promise(function (resolve) {
      commit('DEL_VISITED_VIEW', view);
      resolve(_toConsumableArray(state.visitedViews));
    });
  },
  delCachedView: function delCachedView(_ref6, view) {
    var commit = _ref6.commit,
        state = _ref6.state;
    return new Promise(function (resolve) {
      commit('DEL_CACHED_VIEW', view);
      resolve(_toConsumableArray(state.cachedViews));
    });
  },
  delOthersViews: function delOthersViews(_ref7, view) {
    var dispatch = _ref7.dispatch,
        state = _ref7.state;
    return new Promise(function (resolve) {
      dispatch('delOthersVisitedViews', view);
      dispatch('delOthersCachedViews', view);
      resolve({
        visitedViews: _toConsumableArray(state.visitedViews),
        cachedViews: _toConsumableArray(state.cachedViews)
      });
    });
  },
  delOthersVisitedViews: function delOthersVisitedViews(_ref8, view) {
    var commit = _ref8.commit,
        state = _ref8.state;
    return new Promise(function (resolve) {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve(_toConsumableArray(state.visitedViews));
    });
  },
  delOthersCachedViews: function delOthersCachedViews(_ref9, view) {
    var commit = _ref9.commit,
        state = _ref9.state;
    return new Promise(function (resolve) {
      commit('DEL_OTHERS_CACHED_VIEWS', view);
      resolve(_toConsumableArray(state.cachedViews));
    });
  },
  delAllViews: function delAllViews(_ref10, view) {
    var dispatch = _ref10.dispatch,
        state = _ref10.state;
    return new Promise(function (resolve) {
      dispatch('delAllVisitedViews', view);
      dispatch('delAllCachedViews', view);
      resolve({
        visitedViews: _toConsumableArray(state.visitedViews),
        cachedViews: _toConsumableArray(state.cachedViews)
      });
    });
  },
  delAllVisitedViews: function delAllVisitedViews(_ref11) {
    var commit = _ref11.commit,
        state = _ref11.state;
    return new Promise(function (resolve) {
      commit('DEL_ALL_VISITED_VIEWS');
      resolve(_toConsumableArray(state.visitedViews));
    });
  },
  delAllCachedViews: function delAllCachedViews(_ref12) {
    var commit = _ref12.commit,
        state = _ref12.state;
    return new Promise(function (resolve) {
      commit('DEL_ALL_CACHED_VIEWS');
      resolve(_toConsumableArray(state.cachedViews));
    });
  },
  updateVisitedView: function updateVisitedView(_ref13, view) {
    var commit = _ref13.commit;
    commit('UPDATE_VISITED_VIEW', view);
  }
};
var tax_tags_view = {
  namespaced: true,
  state: state$3,
  mutations: mutations$3,
  actions: actions$3
};

var TokenKey = 'tax_group_app_token';
function getToken() {
  return Cookies.get(TokenKey);
}
function setToken(token) {
  var expires = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;
  return Cookies.set(TokenKey, token, {
    expires: expires
  });
}
function removeToken() {
  return Cookies.remove(TokenKey);
}

function setItem(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}
function getItem(key) {
  var value;

  try {
    value = JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    value = null;
  }

  return value;
}
function removeItem(key) {
  window.localStorage.removeItem(key);
}

var tools = {
  /**
   * Parse the time to string
   * @param {(Object|string|number)} time
   * @param {string} cFormat
   * @returns {string}
   */
  parseTime: function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }

    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    var date;

    if (_typeof(time) === 'object') {
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
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
      var value = formatObj[key]; // Note: getDay() returns 0 on Sunday

      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }

      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }

      return value || 0;
    });
    return time_str;
  },

  /**
   * @param {number} time
   * @param {string} option
   * @returns {string}
   */
  formatTime: function formatTime(time, option) {
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
      // less 1 hour
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
  },

  /**
   * @param {string} url
   * @returns {Object}
   */
  getQueryObject: function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf('?') + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
      var name = decodeURIComponent($1);
      var val = decodeURIComponent($2);
      val = String(val);
      obj[name] = val;
      return rs;
    });
    return obj;
  },

  /**
   * @param {string} input value
   * @returns {number} output value
   */
  byteLength: function byteLength(str) {
    // returns the byte length of an utf8 string
    var s = str.length;

    for (var i = str.length - 1; i >= 0; i--) {
      var code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) { s++; }else if (code > 0x7ff && code <= 0xffff) { s += 2; }
      if (code >= 0xDC00 && code <= 0xDFFF) { i--; }
    }

    return s;
  },

  /**
   * @param {Array} actual
   * @returns {Array}
   */
  cleanArray: function cleanArray(actual) {
    var newArray = [];

    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }

    return newArray;
  },

  /**
   * @param {Object} json
   * @returns {Array}
   */
  param: function param(json) {
    if (!json) { return ''; }
    return cleanArray(Object.keys(json).map(function (key) {
      if (json[key] === undefined) { return ''; }
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })).join('&');
  },

  /**
   * @param {string} url
   * @returns {Object}
   */
  param2Obj: function param2Obj(url) {
    var search = url.split('?')[1];

    if (!search) {
      return {};
    }

    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}');
  },

  /**
   * @param {string} val
   * @returns {string}
   */
  html2Text: function html2Text(val) {
    var div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
  },

  /**
   * Merges two objects, giving the last one precedence
   * @param {Object} target
   * @param {(Object|Array)} source
   * @returns {Object}
   */
  objectMerge: function (_objectMerge) {
    function objectMerge(_x, _x2) {
      return _objectMerge.apply(this, arguments);
    }

    objectMerge.toString = function () {
      return _objectMerge.toString();
    };

    return objectMerge;
  }(function (target, source) {
    if (_typeof(target) !== 'object') {
      target = {};
    }

    if (Array.isArray(source)) {
      return source.slice();
    }

    Object.keys(source).forEach(function (property) {
      var sourceProperty = source[property];

      if (_typeof(sourceProperty) === 'object') {
        target[property] = objectMerge(target[property], sourceProperty);
      } else {
        target[property] = sourceProperty;
      }
    });
    return target;
  }),

  /**
   * @param {HTMLElement} element
   * @param {string} className
   */
  toggleClass: function toggleClass(element, className) {
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
  },

  /**
   * @param {string} type
   * @returns {Date}
   */
  getTime: function getTime(type) {
    if (type === 'start') {
      return new Date().getTime() - 3600 * 1000 * 24 * 90;
    } else {
      return new Date(new Date().toDateString());
    }
  },

  /**
   * @param {Function} func
   * @param {number} wait
   * @param {boolean} immediate
   * @return {*}
   */
  debounce: function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function later() {
      // 据上一次触发时间间隔
      var last = +new Date() - timestamp; // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null; // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用

        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) { context = args = null; }
        }
      }
    };

    return function () {
      var arguments$1 = arguments;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments$1[_key];
      }

      context = this;
      timestamp = +new Date();
      var callNow = immediate && !timeout; // 如果延时不存在，重新设定延时

      if (!timeout) { timeout = setTimeout(later, wait); }

      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  },

  /**
   * This is just a simple version of deep copy
   * Has a lot of edge cases bug
   * If you want to use a perfect deep copy, use lodash's _.cloneDeep
   * @param {Object} source
   * @returns {Object}
   */
  deepClone: function (_deepClone) {
    function deepClone(_x3) {
      return _deepClone.apply(this, arguments);
    }

    deepClone.toString = function () {
      return _deepClone.toString();
    };

    return deepClone;
  }(function (source) {
    if (!source && _typeof(source) !== 'object') {
      throw new Error('error arguments', 'deepClone');
    }

    var targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach(function (keys) {
      if (source[keys] && _typeof(source[keys]) === 'object') {
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    });
    return targetObj;
  }),

  /**
   * @param {Array} arr
   * @returns {Array}
   */
  uniqueArr: function uniqueArr(arr) {
    return Array.from(new Set(arr));
  },

  /**
   * @returns {string}
   */
  createUniqueString: function createUniqueString() {
    var timestamp = +new Date() + '';
    var randomNum = parseInt((1 + Math.random()) * 65536) + '';
    debugger;
    return (+(randomNum + timestamp)).toString(32);
  },

  /**
   * Check if an element has a class
   * @param {HTMLElement} elm
   * @param {string} cls
   * @returns {boolean}
   */
  hasClass: function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  },

  /**
   * Add class to element
   * @param {HTMLElement} elm
   * @param {string} cls
   */
  addClass: function addClass(ele, cls) {
    if (!hasClass(ele, cls)) { ele.className += ' ' + cls; }
  },

  /**
   * Remove class from element
   * @param {HTMLElement} elm
   * @param {string} cls
   */
  removeClass: function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  },
  uuid: function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [];
    var i;
    radix = radix || chars.length;

    if (len) {
      for (i = 0; i < len; i++) {
        uuid[i] = chars[0 | Math.random() * radix];
      }
    } else {
      var r; // rfc4122 requires these characters

      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4'; // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5

      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  },
  // 数组对象排序， 返回一个新对象
  objectArraySort: function objectArraySort(arr, key) {
    var sortFun = function sortFun(key) {
      return function (n, m) {
        var valueN = n[key];
        var valueM = m[key];

        if (valueN < valueM) {
          return 1;
        } else if (valueN > valueM) {
          return -1;
        } else {
          return 0;
        }
      };
    };

    var sortArr = arr.sort(sortFun(key));
    return sortArr;
  }
};

var uuid = tools.uuid; // create an axios instance

var service = axios.create({
  baseURL: '',
  //process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // headers:{
  //   'Content-Type':'application/json;charset=UTF-8'
  // },
  timeout: 5000 // request timeout

}); // request interceptor

service.interceptors.request.use(function (config) {
  var requestId = uuid(32, 12);
  var appId = Cookies.get('tax-app-id');
  if (!appId) { alert('appId 为空，请检查程序是否正确初始化。'); }

  if (/\?/.test(config.url)) {
    config.url += "&appId=".concat(appId);
  } else {
    config.url += "?appId=".concat(appId);
  }

  config.url += "&requestId=".concat(requestId); // do something before request is sent

  if (store.getters.tax_token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.url += "&token=".concat(getToken());
    config.headers['X-Token'] = getToken();
  }

  return config;
}, function (error) {
  // do something with request error
  return Promise.reject(error);
}); // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */
//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data.head
//     // if the custom code is not 20000, it is judged as an error.
//     if (res.errorCode !== "0") {
//       Message({
//         message: res.errorMsg || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })
//       // 100100000018: 登陆超时; 50012: Other clients logged in; 50014: Token expired;
//       if (res.errorCode === "100100000018" || res.errorCode === 50012 || res.errorCode === 50014) {
//         // to re-login
//         MessageBox.confirm(res.errorMsg, '登录确认', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('tax_user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.errorMsg || 'Error'))
//     } else {
//       return response.data
//     }
//   },
//   error => {
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

function post(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return service({
    url: url,
    method: 'post',
    data: _objectSpread2({}, data)
  });
}
function get(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return service({
    url: url,
    method: 'get',
    data: _objectSpread2({}, data)
  });
}
function postAwait(url, data) {
  return regeneratorRuntime.async(function postAwait$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(service.post(url, data));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}
function getAwait(url, data) {
  var queryStr;
  return regeneratorRuntime.async(function getAwait$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          queryStr = JSON.stringify(data);
          queryStr = queryStr.replace(/:/g, '=');
          queryStr = queryStr.replace(/"/g, '');
          queryStr = queryStr.replace(/,/, '&');
          queryStr = queryStr.match(/\{([^)]*)\}/);
          _context2.next = 7;
          return regeneratorRuntime.awrap(service.get(url + "?" + queryStr[1], JSON.stringify(data)));

        case 7:
          return _context2.abrupt("return", _context2.sent);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

var state$4 = {
  token: getToken(),
  name: '',
  avatar: '',
  nav: getItem('tax-nav-list') ? getItem('tax-nav-list') : [],
  info: getItem('tax-user-info') ? getItem('tax-user-info') : null
};
var mutations$4 = {
  TAX_GET_USER_INFO: function TAX_GET_USER_INFO(state) {
    return state.info;
  },
  TAX_SET_USER_INFO: function TAX_SET_USER_INFO(state, userInfo) {
    state.info = userInfo;
    setItem("tax-user-info", userInfo);
    return state.info;
  },
  TAX_SET_USER_INFO_FROM_LOCAL: function TAX_SET_USER_INFO_FROM_LOCAL(state) {
    var userInfo = getItem('tax-user-info');
    return state.info = userInfo;
  },
  TAX_SET_TOKEN: function TAX_SET_TOKEN(state, token) {
    state.token = token;
    setToken(token);
  },
  TAX_LOGOUT: function TAX_LOGOUT(state) {
    removeItem('tax-user-info');
    removeItem('tax-nav-list');
    Cookies.remove('tax-sidebar-status');
    Cookies.remove('tax-app-id');
    Cookies.remove('tax-sidebar-splitPaneStatus');
    setToken('');
  },
  TAX_SET_NAME: function TAX_SET_NAME(state, name) {
    state.name = name;
  },
  TAX_SET_AVATAR: function TAX_SET_AVATAR(state, avatar) {
    state.avatar = avatar;
  },
  TAX_SET_NAV: function TAX_SET_NAV(state, nav) {
    state.nav = nav;
    setItem('tax-nav-list', nav);
  }
};
var actions$4 = {
  // async login({ commit, dispatch }, userInfo) {
  //   const { loginName, password, remember } = userInfo
  //   const url = `${process.env.VUE_APP_JCHL_API}/gateway/org/back/userService/loginExt`
  //   const loginRes = await postAwait(url, { loginName: loginName.trim(), password, remember })
  //   const { body, head } = loginRes
  //   if (head.errorCode !== "0") return loginRes
  //   commit('TAX_SET_TOKEN', body.token)
  //   commit('TAX_SET_USER_INFO', body)
  //   setToken(body.token)
  //   await dispatch('fetchNav')
  //   return loginRes
  // },
  login: function login(_ref, data) {
    var commit, dispatch;
    return regeneratorRuntime.async(function login$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit, dispatch = _ref.dispatch;
            commit('TAX_SET_TOKEN', data.token);
            commit('TAX_SET_USER_INFO', data);
            setToken(data.token);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  clearLoginInfo: function clearLoginInfo(_ref2) {
    var commit = _ref2.commit,
        dispatch = _ref2.dispatch;
    commit('TAX_LOGOUT');
    removeToken();
    resetRouter();
    dispatch('tax_tags_view/delAllViews', null, {
      root: true
    });
  },
  // user logout
  logout: function logout(_ref3) {
    var commit, state, dispatch, url, token, res;
    return regeneratorRuntime.async(function logout$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref3.commit, state = _ref3.state, dispatch = _ref3.dispatch;
            url = "".concat(process.env.VUE_APP_JCHL_API, "/gateway/org/back/userService/logout");
            token = getToken();
            _context2.next = 5;
            return regeneratorRuntime.awrap(postAwait(url, {
              token: token
            }));

          case 5:
            res = _context2.sent;
            dispatch('tax_user/clearLoginInfo', null);
            return _context2.abrupt("return", res);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // remove token
  resetToken: function resetToken(_ref4) {
    var commit = _ref4.commit,
        dispatch = _ref4.dispatch;
    return new Promise(function (resolve) {
      dispatch('tax_user/clearLoginInfo', null, {
        root: true
      });
      resolve();
    });
  },
  getNav: function getNav(_ref5) {
    var state = _ref5.state;
    return state.nav;
  },
  // async fetchNav({ commit, state, dispatch }) {
  //   let routerList
  //   if (state.nav.length > 0) {
  //     routerList = state.nav
  //   } else {
  //     const url = `${process.env.VUE_APP_JCHL_API}/gateway/org/back/functionService/querySecFunctionNav`
  //     // const url = `${process.env.VUE_APP_BASE_API}/back/functionService/querySecFunctionNav`
  //     try {
  //       const { depId } = state.info
  //       const res = await postAwait(url, { depId })
  //       const { body, head } = res
  //       routerList = body
  //     } catch (err) {
  //       return null
  //     }
  //   }
  //   const _router = generateRouter(routerList) // 使用@ttk/vue格式化路由
  //   router.addRoutes(_router) // 使用vue-router动态添加路由
  //   dispatch('tax_permission/appendRoutes', _router, { root: true }) // 添加到菜单列表、左侧菜单渲染就是根据这个来做渲染的。
  //   commit('TAX_SET_NAV', routerList) // 將返回來的路由设置到localStore，刷新页面时会优先获取这个值来渲染路由
  //   return routerList
  // },
  fetchNav: function fetchNav(_ref6, data) {
    var commit, state, dispatch;
    return regeneratorRuntime.async(function fetchNav$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref6.commit, state = _ref6.state, dispatch = _ref6.dispatch;
            dispatch('tax_permission/appendRoutes', data.router, {
              root: true
            }); // 添加到菜单列表、左侧菜单渲染就是根据这个来做渲染的。

            commit('TAX_SET_NAV', data.routerList); // 將返回來的路由设置到localStore，刷新页面时会优先获取这个值来渲染路由

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};
var tax_user = {
  namespaced: true,
  state: state$4,
  mutations: mutations$4,
  actions: actions$4
};

var getters = {
  tax_sidebar: function tax_sidebar(state) {
    return state.tax_app.sidebar;
  },
  tax_device: function tax_device(state) {
    return state.tax_app.device;
  },
  tax_token: function tax_token(state) {
    return state.tax_user.token;
  },
  tax_user_info: function tax_user_info(state) {
    return state.tax_user.info;
  },
  nav_router: function nav_router(state) {
    return state.tax_user.nav;
  },
  tax_permission_routes: function tax_permission_routes(state) {
    return state.tax_permission.routes;
  } // tax_avatar: state => state.tax_user.avatar,
  // tax_name: state => state.tax_user.name

};

Vue.use(Vuex); // 获取业务代码中views文件夹下的store

var getViewModules = function getViewModules() {
  var modulesFiles = require.context('@/pages', true, /\.store\.js$/);

  var modules = modulesFiles.keys().reduce(function (modules, modulePath) {
    var moduleName = modulePath.replace(/^\.\/(.*)\/(.*)\.store\.\w+$/, '$2');
    var value = modulesFiles(modulePath);
    modules[moduleName] = value["default"];
    return modules;
  }, {});
  return modules;
};

var taxModules = {
  tax_app: tax_app,
  tax_permission: tax_permission,
  tax_settings: tax_settings,
  tax_tags_view: tax_tags_view,
  tax_user: tax_user
};

var initStore = function initStore() {
  var _viewModules = getViewModules();

  var store = new Vuex.Store({
    modules: _objectSpread2({}, _viewModules, {}, taxModules),
    getters: getters
  });
  return store;
};

Vue.use(TaxGroupUI);
var store = initStore();

var SingletonApp =
/*#__PURE__*/
function () {
  function SingletonApp() {
    _classCallCheck(this, SingletonApp);

    this.vueApp = null;
    this.router = null;
    this.layout = null;
    this.setting = null;
    this.pageMap = null;
  }

  _createClass(SingletonApp, [{
    key: "config",
    value: function config(_ref) {
      var setting = _ref.setting,
          layout = _ref.layout,
          pageMap = _ref.pageMap,
          appId = _ref.appId;
      this.setting = setting;
      this.layout = layout;
      this.pageMap = pageMap;
      this.appId = appId;
      Cookies.set('tax-app-id', appId, {
        expires: 7
      }); // 设置appId到cookie，供ajax调用时使用
    }
  }, {
    key: "getSeting",
    value: function getSeting() {
      return this.setting;
    }
  }, {
    key: "setLayout",
    value: function setLayout(component) {
      this.layout = component;
    }
  }, {
    key: "start",
    value: function start(_store) {
      if (!this.vueApp) {
        this.vueApp = new Vue({
          el: '#app',
          router: router,
          store: store,
          render: function render(h) {
            return h('div', {
              attrs: {
                id: 'app'
              }
            }, [h('router-view')]);
          }
        });
      } else {
        throw 'Vue 已经实例化，请勿重复实例化。';
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new SingletonApp();
      }

      return this.instance;
    }
  }]);

  return SingletonApp;
}();
/**
 * 注入新的函数，用于框架常用函数的扩展，建议在程序启动前注入，避免运行时找不到注入的函数。
 * @param {string} funName
 * @param {function} fun
 */


var registerFun = function registerFun(funName, fun) {
  if (typeof funName !== 'string') {
    throw "\u6CE8\u5165\u51FD\u6570\u65F6\u7B2C\u4E00\u4E2A\u53C2\u6570\u5FC5\u987B\u662F String \u7C7B\u578B\uFF0C\u5F53\u524D\u4E3A: ".concat(funName);
  }

  if (typeof fun !== 'function') {
    throw "\u6CE8\u5165\u51FD\u6570\u65F6\u7B2C\u4E8C\u4E2A\u53C2\u6570\u5FC5\u987B\u662F function \u7C7B\u578B\uFF0C\u5F53\u524D\u4E3A: ".concat(fun);
  }

  var instance = SingletonApp.getInstance();
  instance[funName] = fun;
};

function clipboardSuccess() {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  });
}

function clipboardError() {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  });
}

function handleClipboard(_text, event) {
  var clipboard = new Clipboard(event.target, {
    text: function text() {
      return _text;
    }
  });
  clipboard.on('success', function () {
    clipboardSuccess();
    clipboard.destroy();
  });
  clipboard.on('error', function () {
    clipboardError();
    clipboard.destroy();
  });
  clipboard.onClick(event);
}

/**
 * @param {Sting} url
 * @param {Sting} title
 * @param {Number} w
 * @param {Number} h
 */
function openWindow(url, title, w, h) {
  // Fixes dual-screen position                            Most browsers       Firefox
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;
  var newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left); // Puts focus on the newWindow

  if (window.focus) {
    newWindow.focus();
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
/**
 * @param {string} phone
 * @returns {Boolean}
 */

function validPhone(phone) {
  return /^1[3456789]\d{9}$/.test(phone);
}
/**
 * @param {string} str
 * @returns {Boolean}
 */

function validUsername(str) {
  return /[[a-zA-Z]$/.test(str);
}
/**
 * @param {string} url
 * @returns {Boolean}
 */

function validURL(url) {
  var reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}
/**
 * @param {string} str
 * @returns {Boolean}
 */

function validLowerCase(str) {
  var reg = /^[a-z]+$/;
  return reg.test(str);
}
/**
 * @param {string} str
 * @returns {Boolean}
 */

function validUpperCase(str) {
  var reg = /^[A-Z]+$/;
  return reg.test(str);
}
/**
 * @param {string} str
 * @returns {Boolean}
 */

function validAlphabets(str) {
  var reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
/**
 * @param {string} email
 * @returns {Boolean}
 */

function validEmail(email) {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}
/**
 * @param {string} str
 * @returns {Boolean}
 */

function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }

  return false;
}
/**
 * @param {Array} arg
 * @returns {Boolean}
 */

function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }

  return Array.isArray(arg);
}

exports.SingletonApp = SingletonApp;
exports.TaxModules = initStore;
exports.concatRouter = concatRouter;
exports.constantRoutes = constantRoutes;
exports.get = get;
exports.getAwait = getAwait;
exports.getItem = getItem;
exports.getToken = getToken;
exports.handleClipboard = handleClipboard;
exports.isArray = isArray;
exports.isExternal = isExternal;
exports.isString = isString;
exports.openWindow = openWindow;
exports.post = post;
exports.postAwait = postAwait;
exports.registerFun = registerFun;
exports.removeItem = removeItem;
exports.removeToken = removeToken;
exports.resetRouter = resetRouter;
exports.router = router;
exports.service = service;
exports.setItem = setItem;
exports.setToken = setToken;
exports.store = store;
exports.utils = tools;
exports.validAlphabets = validAlphabets;
exports.validEmail = validEmail;
exports.validLowerCase = validLowerCase;
exports.validPhone = validPhone;
exports.validURL = validURL;
exports.validUpperCase = validUpperCase;
exports.validUsername = validUsername;
