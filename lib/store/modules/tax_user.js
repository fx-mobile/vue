(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/asyncToGenerator", "../../api/user", "../../utils/auth", "../../utils/local-storage", "../../router", "../../application", "../../utils/request"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/asyncToGenerator"), require("../../api/user"), require("../../utils/auth"), require("../../utils/local-storage"), require("../../router"), require("../../application"), require("../../utils/request"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.asyncToGenerator, global.user, global.auth, global.localStorage, global.router, global.application, global.request);
    global.tax_user = mod.exports;
  }
})(this, function (_exports, _asyncToGenerator2, _user, _auth, _localStorage, _router, _application, _request) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);
  var state = {
    token: (0, _auth.getToken)(),
    name: '',
    avatar: '',
    nav: [],
    info: (0, _localStorage.getItem)('userInfo') ? (0, _localStorage.getItem)('userInfo') : null
  };
  var mutations = {
    TAX_GET_USER_INFO: state => {
      return state.info;
    },
    TAX_SET_USER_INFO: (state, userInfo) => {
      state.info = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return state.info;
    },
    TAX_SET_USER_INFO_FROM_LOCAL: state => {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      return state.info = userInfo;
    },
    TAX_SET_TOKEN: (state, token) => {
      state.token = token;
      (0, _auth.setToken)(token);
    },
    TAX_SET_NAME: (state, name) => {
      state.name = name;
    },
    TAX_SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    TAX_SET_NAV: (state, nav) => {
      state.nav = nav;
    }
  };
  var actions = {
    login(_ref, userInfo) {
      var {
        commit
      } = _ref;
      var {
        loginName,
        password,
        remember
      } = userInfo;
      return new Promise((resolve, reject) => {
        (0, _user.login)({
          loginName: loginName.trim(),
          password,
          remember
        }).then(response => {
          var {
            body: data
          } = response;
          commit('TAX_SET_TOKEN', data.token);
          commit('TAX_SET_USER_INFO', data);
          (0, _auth.setToken)(data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    logout(_ref2) {
      var {
        commit,
        state
      } = _ref2;
      return new Promise((resolve, reject) => {});
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
          commit
        } = _ref5;
        var url = "/gateway/org/back/functionService/querySecFunctionNav?appId=".concat(10001006);
        var depId;

        if (!state.info) {
          commit('TAX_SET_USER_INFO_FROM_LOCAL');
        }

        depId = state.info.depId;
        var res = yield (0, _request.postAwait)(url, {
          depId
        });
        return res;
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