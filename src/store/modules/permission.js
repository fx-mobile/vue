// import { asyncRoutes, constantRoutes } from '@/router'
import { SingletonApp } from "../../index"

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// export function filterAsyncRoutes(routes, roles) {
export function filterAsyncRoutes(routes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    // if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children)
      }
      res.push(tmp)
    // }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    const app = SingletonApp.getInstance()
    const constantRoutes  = app.getRouters();
    console.log('jjj', constantRoutes);
    
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
        // accessedRoutes = filterAsyncRoutes(asyncRoutes)
      // }
      commit('SET_ROUTES', [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
