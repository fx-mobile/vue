import { constantRoutes } from '../../router'

// 保存路由权限的store模块
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
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
