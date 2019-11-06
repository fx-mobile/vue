(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/asyncToGenerator", "../../api/user", "../../utils/auth", "../../utils/local-storage", "../../router", "../../utils/request"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/asyncToGenerator"), require("../../api/user"), require("../../utils/auth"), require("../../utils/local-storage"), require("../../router"), require("../../utils/request"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.asyncToGenerator, global.user, global.auth, global.localStorage, global.router, global.request);
    global.tax_user = mod.exports;
  }
})(this, function (_exports, _asyncToGenerator2, _user, _auth, _localStorage, _router2, _request) {
  "use strict";

  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  _router2 = _interopRequireWildcard(_router2);
  var state = {
    token: (0, _auth.getToken)(),
    name: '',
    avatar: '',
    nav: (0, _localStorage.getItem)('tax-nav-list') ? (0, _localStorage.getItem)('tax-nav-list') : [],
    info: (0, _localStorage.getItem)('tax-user-info') ? (0, _localStorage.getItem)('tax-user-info') : null
  };
  var mutations = {
    TAX_GET_USER_INFO: state => {
      return state.info;
    },
    TAX_SET_USER_INFO: (state, userInfo) => {
      state.info = userInfo;
      (0, _localStorage.setItem)("tax-user-info", userInfo);
      return state.info;
    },
    TAX_SET_USER_INFO_FROM_LOCAL: state => {
      var userInfo = (0, _localStorage.getItem)('tax-user-info');
      return state.info = userInfo;
    },
    TAX_SET_TOKEN: (state, token) => {
      state.token = token;
      (0, _auth.setToken)(token);
    },
    TAX_LOGOUT: state => {
      (0, _localStorage.removeItem)('tax-user-info');
      (0, _localStorage.removeItem)('tax-nav-list');
      (0, _auth.setToken)('');
    },
    TAX_SET_NAME: (state, name) => {
      state.name = name;
    },
    TAX_SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    TAX_SET_NAV: (state, nav) => {
      state.nav = nav;
      (0, _localStorage.setItem)('tax-nav-list', nav);
    }
  };
  var actions = {
    login(_ref, userInfo) {
      return (0, _asyncToGenerator2.default)(function* () {
        var {
          commit,
          dispatch
        } = _ref;
        var {
          loginName,
          password,
          remember
        } = userInfo;
        var url = "/gateway/org/back/userService/loginExt?appId=10001006";
        var loginRes = yield (0, _request.postAwait)(url, {
          loginName: loginName.trim(),
          password,
          remember
        });
        var {
          body,
          head
        } = loginRes;
        if (head.errorCode !== "0") return loginRes;
        commit('TAX_SET_TOKEN', body.token);
        commit('TAX_SET_USER_INFO', body);
        (0, _auth.setToken)(body.token);
        yield dispatch('fetchNav');
        return loginRes;
      })();
    },

    logout(_ref2) {
      return (0, _asyncToGenerator2.default)(function* () {
        var {
          commit,
          state,
          dispatch
        } = _ref2;
        var url = "/gateway/org/back/userService/logout?appId=10001006";
        var token = (0, _auth.getToken)();
        var res = yield (0, _request.postAwait)(url, {
          token
        });
        commit('TAX_LOGOUT');
        (0, _auth.removeToken)();
        (0, _router2.resetRouter)();
        dispatch('tax_tags_view/delAllViews', null, {
          root: true
        });
        return res;
      })();
    },

    resetToken(_ref3) {
      var {
        commit
      } = _ref3;
      return new Promise(resolve => {
        commit('TAX_SET_TOKEN', '');
        resolve();
      });
    },

    getNav(_ref4) {
      var {
        state
      } = _ref4;
      return state.nav;
    },

    fetchNav(_ref5) {
      return (0, _asyncToGenerator2.default)(function* () {
        var {
          commit,
          state,
          dispatch
        } = _ref5;
        var routerList;

        if (state.nav.length > 0) {
          routerList = state.nav;
        } else {
          var url = "/gateway/org/back/functionService/querySecFunctionNav?appId=".concat(10001006);

          try {
            var {
              depId
            } = state.info;
            var res = yield (0, _request.postAwait)(url, {
              depId
            });
            var {
              body,
              head
            } = res;
            routerList = body;
          } catch (err) {
            return null;
          }
        }

        var _router = (0, _router2.generateRouter)(routerList);

        _router2.default.addRoutes(_router);

        dispatch('tax_permission/appendRoutes', _router, {
          root: true
        });
        commit('TAX_SET_NAV', routerList);
        return routerList;
      })();
    }

  };
  var _default = {
    namespaced: true,
    state,
    mutations,
    actions
  };
  _exports.default = _default;
});