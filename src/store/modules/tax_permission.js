import { constantRoutes } from '../../router'
import { getItem, removeItem, setItem } from '../../utils/local-storage'

// 保存路由权限的store模块
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    // setItem('tax-permission-routes', state.routes) // 持久化存储
  },
  UPDATE_ROUTES: (state, routes) => {
    state.routes = routes
    // setItem('tax-permission-routes', state.routes) // 持久化存储
  }
}

const actions = {
  appendRoutes({ commit }, routes) {
    return new Promise(resolve => {
      commit('SET_ROUTES', routes)
      resolve()
    })
  },
  updateRoutes({ commit }, { routes }) {
    return new Promise(resolve => {
      commit('UPDATE_ROUTES', routes)
      resolve()
    })
  },
  getRoutes() {
    return state.routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
