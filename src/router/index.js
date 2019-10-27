import Vue from 'vue'
import Router from 'vue-router'
import { SingletonApp, app, start } from "../application"
Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true) false: 不在面包屑中显示
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set 不在指定菜单中显示
    affix: true                  标签不可关闭
    noCache: true
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 扫描业务代码中views里的.router.js文件，并返回路由数组
export function scanRouter() {
  const routerFiles = require.context('@/pages', true, /\.router\.js$/)
  const modules = routerFiles.keys().map((key) => routerFiles(key).default)
  return modules
}

// 注册并返回路由
export function registryRouter(routes = []) {
  if (!Array.isArray(routes)) {
    console.error('registryRouter: 注册的路由必须是一个数组')
  }
  const app = SingletonApp.getInstance();
  const rou = routes.concat(constantRoutes)
  app.setRouters(rou);
  const _routes = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: rou //routes.concat(constantRoutes)
  })
  return _routes
}

// 根据接口返回的路由生成前端路由
export const generateRouter = (routerList) => {
  const routers = [];
  if (Array.isArray(routerList)) {
    routerList.forEach((item, index) => {
      routers.push(parseRouterItem(item));
    });
  } else {
    routers.push(parseRouterItem(routerList));
  }
  return routers;
}
const parseRouterItem = (item) => {
  const obj = {
    path: item.url === '#' ? item.code : item.url,
    // component: item.functionType === 'menu' ? Layout : () => import('@/pages/404'),
    name: item.name,
    meta: {
      title: item.name,
      // icon: 'lock',
      roles: ['admin']
    }
  }
  if (Array.isArray(item.childSecFunctioinDTOs)) {
    obj.children = generateRouter(item.childSecFunctioinDTOs);
  }
  if (item.url === '#') {
    obj.alwaysShow = true;
  }
  return obj
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = (_router) => {
  const newRouter = createRouter()
  _router.matcher = newRouter.matcher // reset router
}