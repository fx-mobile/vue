(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "vue", "vue-router", "../application"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("vue"), require("vue-router"), require("../application"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vue, global.vueRouter, global.application);
    global.index = mod.exports;
  }
})(this, function (_exports, _vue, _vueRouter, _application) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.concatRouter = _exports.resetRouter = _exports._g = _exports.generateRouter = _exports.constantRoutes = void 0;
  _vue = _interopRequireDefault(_vue);
  _vueRouter = _interopRequireDefault(_vueRouter);

  var _import = require('./_import_' + process.env.NODE_ENV);

  _vue.default.use(_vueRouter.default);

  var constantRoutes = [{
    path: '*',
    redirect: '/404',
    hidden: true
  }];
  _exports.constantRoutes = constantRoutes;

  function parentMenu(item) {
    var menuType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'menu';

    var app = _application.SingletonApp.getInstance();

    var _component;

    switch (menuType) {
      case "top":
        _component = app.layout;
        break;

      case "page":
        _component = {
          render: c => c("router-view")
        };

      default:
        _component = _import(item.code);
    }

    return {
      path: item.url,
      component: _component,
      name: item.name,
      meta: {
        title: item.name,
        icon: item.imageUrl,
        affix: item.functionType === 'desk'
      }
    };
  }

  var generateRouter = function generateRouter(routerList) {
    var pFunId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var pParentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var routers = [];

    if (Array.isArray(routerList)) {
      routerList.forEach((item, index) => {
        routers.push(parseRouterItem(item, pFunId, pParentId));
      });
    }

    return routers;
  };

  _exports.generateRouter = generateRouter;

  var parseRouterItem = (item, pFunId, pParentId) => {
    var obj;

    if (!pParentId) {
      obj = parentMenu(item, 'top');

      if (item.subNodeFlag == 0) {
        obj.children = generateRouter([item], item.functioinId, item.parentId);
      } else {
        obj.children = generateRouter(item.childSecFunctioinDTOs, item.functioinId, item.parentId);
      }
    } else {
      if (item.subNodeFlag == 0) {
        obj = parentMenu(item, 'page');
      } else {
        obj = parentMenu(item);
        obj.children = generateRouter(item.childSecFunctioinDTOs, item.functioinId, item.parentId);
      }
    }

    return obj;
  };

  var _g = routerList => {
    var routers = [];

    if (Array.isArray(routerList)) {
      routerList.forEach((item, index) => {
        routers.push(parseRouterItem(item));
      });
    } else {
      routers.push(parseRouterItem(routerList));
    }

    return routers;
  };

  _exports._g = _g;

  var _parseRouterItem = item => {
    var app = _application.SingletonApp.getInstance();

    var isMenu = item.functionType === 'menu';
    var hasChild = item.hasOwnProperty('childSecFunctioinDTOs');
    var obj = {
      path: item.url,
      component: hasChild ? app.layout : _import(item.code),
      name: item.name,
      meta: {
        title: item.name,
        icon: 'fsicon-tree-dot',
        affix: item.functionType === 'desk'
      }
    };

    if (Array.isArray(item.childSecFunctioinDTOs)) {
      obj.children = generateRouter(item.childSecFunctioinDTOs);
    }

    if (item.url === '#') {
      obj.alwaysShow = true;
    }

    return obj;
  };

  var createRouter = () => new _vueRouter.default({
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

  var router = createRouter();

  var resetRouter = _router => {
    var newRouter = createRouter();
    router.matcher = newRouter.matcher;
  };

  _exports.resetRouter = resetRouter;

  var concatRouter = routers => {
    constantRoutes.unshift(...routers);
  };

  _exports.concatRouter = concatRouter;
  var _default = router;
  _exports.default = _default;
});