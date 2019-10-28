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
  _exports.default = _exports.concatRouter = _exports.resetRouter = _exports.generateRouter = _exports.constantRoutes = void 0;
  _vue = _interopRequireDefault(_vue);
  _vueRouter = _interopRequireDefault(_vueRouter);

  _vue.default.use(_vueRouter.default);

  var constantRoutes = [{
    path: '*',
    redirect: '/404',
    hidden: true
  }];
  _exports.constantRoutes = constantRoutes;

  var generateRouter = routerList => {
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

  _exports.generateRouter = generateRouter;

  var parseRouterItem = item => {
    var app = _application.SingletonApp.getInstance();

    var isMenu = item.functionType === 'menu';
    var hasChild = item.hasOwnProperty('childSecFunctioinDTOs');
    var obj = {
      path: hasChild ? "/".concat(item.code) : item.code,
      component: hasChild ? app.layout : () => import('@/pages/404'),
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