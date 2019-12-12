import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('tax-sidebar-status') ? !!+Cookies.get('tax-sidebar-status') : true,
    splitPaneStatus: Cookies.get('tax-sidebar-splitPaneStatus') ? Cookies.get('tax-sidebar-splitPaneStatus') : null,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: (state, { isOpened, splitPaneStatus }) => {
    if (isOpened !== undefined) {
      state.sidebar.opened = isOpened ? !!isOpened : !state.sidebar.opened
    }
    if (splitPaneStatus !== undefined) {
      state.sidebar.splitPaneStatus = splitPaneStatus
      Cookies.set('tax-sidebar-splitPaneStatus', splitPaneStatus)
    }
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('tax-sidebar-status', 1)
    } else {
      Cookies.set('tax-sidebar-status', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('tax-sidebar-status', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }, data = {}) {
    commit('TOGGLE_SIDEBAR', data)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
