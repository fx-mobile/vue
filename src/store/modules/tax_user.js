import { login, logout, getInfo, getNav } from '../../api/user'
import { getToken, setToken, removeToken } from '../../utils/auth'
import { getItem, removeItem, setItem } from '../../utils/local-storage'
import router, { generateRouter, resetRouter } from '../../router'
import { postAwait } from '../../utils/request'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  nav: getItem('tax-nav-list') ? getItem('tax-nav-list') : [],
  info: getItem('tax-user-info') ? getItem('tax-user-info') : null
}

const mutations = {
  TAX_GET_USER_INFO: (state) => {
    return state.info
  },
  TAX_SET_USER_INFO: (state, userInfo) => {
    state.info = userInfo
    setItem("tax-user-info", userInfo)
    return state.info
  },
  TAX_SET_USER_INFO_FROM_LOCAL: (state) => {
    const userInfo = getItem('tax-user-info')
    return state.info = userInfo
  },
  TAX_SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  TAX_LOGOUT: (state) => {
    removeItem('tax-user-info')
    removeItem('tax-nav-list')
    setToken('')
  },
  TAX_SET_NAME: (state, name) => {
    state.name = name
  },
  TAX_SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  TAX_SET_NAV: (state, nav) => {
    state.nav = nav
    setItem('tax-nav-list', nav)
  }
}

const actions = {
  // // user login
  // login({ commit }, userInfo) {
  //   const { loginName, password, remember } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ loginName: loginName.trim(), password, remember }).then(response => {
  //       const { body: data } = response
  //       commit('TAX_SET_TOKEN', data.token)
  //       commit('TAX_SET_USER_INFO', data)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  async login({ commit, dispatch }, userInfo) {
    const { loginName, password, remember } = userInfo
    const url = `/gateway/org/back/userService/loginExt?appId=10001006`
    const loginRes = await postAwait(url, { loginName: loginName.trim(), password, remember })
    const { body, head } = loginRes
    if (head.errorCode !== "0") return loginRes
    commit('TAX_SET_TOKEN', body.token)
    commit('TAX_SET_USER_INFO', body)
    setToken(body.token)
    await dispatch('fetchNav')
    return loginRes
  },

  // user logout
  async logout({ commit, state, dispatch }) {
    const url = `/gateway/org/back/userService/logout?appId=10001006`
    const token = getToken()
    const res = await postAwait(url, { token })
    commit('TAX_LOGOUT')
    removeToken()
    resetRouter()
    dispatch('tax_tags_view/delAllViews', null, { root: true })
    return res;
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('TAX_SET_TOKEN', '')
      resolve();
    })
  },
  getNav({ state }) {
    return state.nav;
  },
  async fetchNav({ commit, state, dispatch }) {
    let routerList
    if (state.nav.length > 0) {
      routerList = state.nav
    } else {
      const url = `/gateway/org/back/functionService/querySecFunctionNav?appId=${10001006}`
      // const url = `${process.env.VUE_APP_BASE_API}/back/functionService/querySecFunctionNav?appId=${10001006}`
      try{
        const { depId } = state.info
        const res = await postAwait(url, { depId })
        const { body, head } = res
        routerList = body
      }catch(err){
        return null
      }
    }
    const _router = generateRouter(routerList) // 使用@ttk/vue格式化路由
    router.addRoutes(_router) // 使用vue-router动态添加路由
    dispatch('tax_permission/appendRoutes', _router, { root: true }) // 添加到菜单列表、左侧菜单渲染就是根据这个来做渲染的。
    commit('TAX_SET_NAV', routerList)
    return routerList
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

