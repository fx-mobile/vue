(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "vue", "vue-router", "@ttk/vue/packages/layout"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("vue"), require("vue-router"), require("@ttk/vue/packages/layout"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vue, global.vueRouter, global.layout);
    global.index = mod.exports;
  }
})(this, function (_exports, _vue, _vueRouter, _layout) {
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
  _layout = _interopRequireDefault(_layout);

  _vue.default.use(_vueRouter.default);

  var constantRoutes = [{
    path: '/login',
    component: () => import('@ttk/vue/packages/views/login/index'),
    hidden: true,
    meta: {
      title: 'ligin'
    }
  }, {
    path: '/404',
    component: () => import('@ttk/vue/packages/views/404'),
    hidden: true
  }, {
    path: '/',
    component: _layout.default,
    redirect: '/home',
    name: 'Home',
    children: [{
      path: '/home',
      name: 'Table',
      component: () => import('@/views/table'),
      meta: {
        title: 'Table',
        icon: 's-home',
        affix: true
      }
    }]
  }, {
    path: 'external-link',
    component: _layout.default,
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: 'External Link',
        icon: 'link'
      }
    }]
  }, {
    path: '*',
    redirect: '/404',
    hidden: true
  }];
  _exports.constantRoutes = constantRoutes;

  function scanRouter() {
    var routerFiles = require.context('@/views', true, /\.router\.js$/);

    var modules = routerFiles.keys().map(key => routerFiles(key).default);
    return modules;
  }

  function registryRouter() {
    var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (!Array.isArray(routes)) {
      console.error('registryRouter: 注册的路由必须是一个数组');
    }

    var _routes = new _vueRouter.default({
      scrollBehavior: () => ({
        y: 0
      }),
      routes: routes.concat(constantRoutes)
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
      component: item.functionType === 'menu' ? _layout.default : () => import('@ttk/vue/packages/views/404'),
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