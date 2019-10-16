(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/asyncToGenerator", "../../api/user", "../../utils/auth", "../../router", "../../application"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/asyncToGenerator"), require("../../api/user"), require("../../utils/auth"), require("../../router"), require("../../application"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.asyncToGenerator, global.user, global.auth, global.router, global.application);
    global.tax_user = mod.exports;
  }
})(this, function (_exports, _asyncToGenerator2, _user, _auth, _router, _application) {
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
    inof: {}
  };
  var mutations = {
    TAX_SET_USER_INFO: (state, userInfo) => {
      state.inof = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    TAX_SET_USER_INFO_FROM_LOCAL: (state, type) => {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      state.info = userInfo;
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

    getInfo(_ref2) {
      var {
        commit,
        state
      } = _ref2;
      return new Promise((resolve, reject) => {
        (0, _user.getInfo)(state.token).then(response => {
          var {
            data
          } = response;

          if (!data) {
            reject('Verification -- failed, please Login again.');
          }

          var {
            name,
            avatar
          } = data;
          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    },

    logout(_ref3) {
      var {
        commit,
        state
      } = _ref3;
      return new Promise((resolve, reject) => {});
    },

    resetToken(_ref4) {
      var {
        commit
      } = _ref4;
      return new Promise(resolve => {
        commit('TAX_SET_TOKEN', '');
        resolve();
      });
    },

    getNav(_ref5, depId) {
      var {
        commit
      } = _ref5;
      return new Promise(function () {
        var _ref6 = (0, _asyncToGenerator2.default)(function* (resolve, reject) {
          (0, _user.getNav)(depId).then(res => {
            try {
              var ttkrouter = (0, _router.generateRouter)(res.body);
              commit('TAX_SET_NAV', ttkrouter);
              resolve(ttkrouter);
            } catch (error) {
              console.error('获取路由后解析错误： ', new Error(error));
              reject(error);
            }
          }).catch(error => {
            reject(error);
          });
        });

        return function (_x, _x2) {
          return _ref6.apply(this, arguments);
        };
      }());
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