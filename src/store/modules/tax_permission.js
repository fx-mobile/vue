import { constantRoutes } from '../../router'
import { getItem, setItem } from '../../utils/local-storage'

// 保存路由权限的store模块

const state = {
  routes: [], // getItem('tax-routes') ? getItem('tax-routes') : [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    const t = constantRoutes.concat(routes)
    setItem('tax-routes', t)
    state.routes = t
  }
}

const actions = {
  appendRoutes({ commit }, routes) {
    return new Promise(resolve => {
      commit('SET_ROUTES', routes)
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
