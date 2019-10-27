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
  _exports.scanRouter = scanRouter;
  _exports.registryRouter = registryRouter;
  _exports.resetRouter = _exports.generateRouter = _exports.constantRoutes = void 0;
  _vue = _interopRequireDefault(_vue);
  _vueRouter = _interopRequireDefault(_vueRouter);

  _vue.default.use(_vueRouter.default);

  var constantRoutes = [{
    path: '*',
    redirect: '/404',
    hidden: true
  }];
  _exports.constantRoutes = constantRoutes;

  function scanRouter() {
    var routerFiles = require.context('@/pages', true, /\.router\.js$/);

    var modules = routerFiles.keys().map(key => routerFiles(key).default);
    return modules;
  }

  function registryRouter() {
    var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (!Array.isArray(routes)) {
      console.error('registryRouter: 注册的路由必须是一个数组');
    }

    var app = _application.SingletonApp.getInstance();

    var rou = routes.concat(constantRoutes);
    app.setRouters(rou);

    var _routes = new _vueRouter.default({
      scrollBehavior: () => ({
        y: 0
      }),
      routes: rou
    });

    return _routes;
  }

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
    var obj = {
      path: item.url === '#' ? item.code : item.url,
      name: item.name,
      meta: {
        title: item.name,
        roles: ['admin']
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

  var resetRouter = _router => {
    var newRouter = createRouter();
    _router.matcher = newRouter.matcher;
  };

  _exports.resetRouter = resetRouter;
});