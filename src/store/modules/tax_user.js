import { login, logout, getInfo, getNav } from '../../api/user'
import { getToken, setToken, removeToken } from '../../utils/auth'
import { generateRouter, resetRouter } from '../../router'
import { router } from '../../application'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  nav: [],
  info: null
}

const mutations = {
  TAX_SET_USER_INFO: (state, userInfo) => {
    state.info = userInfo
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
  },
  TAX_SET_USER_INFO_FROM_LOCAL: (state, type) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    state.info = userInfo
  },
  TAX_SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  TAX_SET_NAME: (state, name) => {
    state.name = name
  },
  TAX_SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  TAX_SET_NAV: (state, nav) => {
    state.nav = nav
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginName, password, remember } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: loginName.trim(), password, remember }).then(response => {
        const { body: data } = response
        commit('TAX_SET_TOKEN', data.token)
        commit('TAX_SET_USER_INFO', data)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //       if (!data) {
  //         reject('Verification -- failed, please Login again.')
  //       }
  //       const { name, avatar } = data
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
    })
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
  fetchNav({ commit }) {
    return new Promise(async (resolve, reject) => {
      let depId;
      if (!state.info) {
        commit('TAX_SET_USER_INFO_FROM_LOCAL')
      }
      depId = state.info.depId
      getNav({ depId }).then((res) => {
        try {
          const ttkrouter = generateRouter(res.body)
          // resetRouter(router);
          // router.addRoutes(ttkrouter)
          commit('TAX_SET_NAV', ttkrouter)
          resolve(ttkrouter);
        } catch (error) {
          console.error('获取路由后解析错误： ', new Error(error));
          reject(error);
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

