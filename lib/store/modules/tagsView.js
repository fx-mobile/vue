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
    global.tagsView = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var state = {
    visitedViews: [],
    cachedViews: []
  };
  var mutations = {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return;
      state.visitedViews.push(Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      }));
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return;

      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    DEL_VISITED_VIEW: (state, view) => {
      for (var [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      for (var i of state.cachedViews) {
        if (i === view.name) {
          var index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      state.visitedViews = state.visitedViews.filter(v => {
        return v.meta.affix || v.path === view.path;
      });
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      for (var i of state.cachedViews) {
        if (i === view.name) {
          var index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, index + 1);
          break;
        }
      }
    },
    DEL_ALL_VISITED_VIEWS: state => {
      var affixTags = state.visitedViews.filter(tag => tag.meta.affix);
      state.visitedViews = affixTags;
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = [];
    },
    UPDATE_VISITED_VIEW: (state, view) => {
      for (var v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    }
  };
  var actions = {
    addView(_ref, view) {
      var {
        dispatch
      } = _ref;
      dispatch('addVisitedView', view);
      dispatch('addCachedView', view);
    },

    addVisitedView(_ref2, view) {
      var {
        commit
      } = _ref2;
      commit('ADD_VISITED_VIEW', view);
    },

    addCachedView(_ref3, view) {
      var {
        commit
      } = _ref3;
      commit('ADD_CACHED_VIEW', view);
    },

    delView(_ref4, view) {
      var {
        dispatch,
        state
      } = _ref4;
      return new Promise(resolve => {
        dispatch('delVisitedView', view);
        dispatch('delCachedView', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },

    delVisitedView(_ref5, view) {
      var {
        commit,
        state
      } = _ref5;
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEW', view);
        resolve([...state.visitedViews]);
      });
    },

    delCachedView(_ref6, view) {
      var {
        commit,
        state
      } = _ref6;
      return new Promise(resolve => {
        commit('DEL_CACHED_VIEW', view);
        resolve([...state.cachedViews]);
      });
    },

    delOthersViews(_ref7, view) {
      var {
        dispatch,
        state
      } = _ref7;
      return new Promise(resolve => {
        dispatch('delOthersVisitedViews', view);
        dispatch('delOthersCachedViews', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },

    delOthersVisitedViews(_ref8, view) {
      var {
        commit,
        state
      } = _ref8;
      return new Promise(resolve => {
        commit('DEL_OTHERS_VISITED_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },

    delOthersCachedViews(_ref9, view) {
      var {
        commit,
        state
      } = _ref9;
      return new Promise(resolve => {
        commit('DEL_OTHERS_CACHED_VIEWS', view);
        resolve([...state.cachedViews]);
      });
    },

    delAllViews(_ref10, view) {
      var {
        dispatch,
        state
      } = _ref10;
      return new Promise(resolve => {
        dispatch('delAllVisitedViews', view);
        dispatch('delAllCachedViews', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },

    delAllVisitedViews(_ref11) {
      var {
        commit,
        state
      } = _ref11;
      return new Promise(resolve => {
        commit('DEL_ALL_VISITED_VIEWS');
        resolve([...state.visitedViews]);
      });
    },

    delAllCachedViews(_ref12) {
      var {
        commit,
        state
      } = _ref12;
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_VIEWS');
        resolve([...state.cachedViews]);
      });
    },

    updateVisitedView(_ref13, view) {
      var {
        commit
      } = _ref13;
      commit('UPDATE_VISITED_VIEW', view);
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