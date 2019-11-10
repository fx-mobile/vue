// import variables from '@/styles/element-variables.scss'
// import defaultSettings from '@/settings'

let defaultSettings
try {
  const modulesFiles = require.context('@/', true, /settings\.js$/)
  const settingFiles = modulesFiles.keys()
  
  if (settingFiles.length == 1) {
    defaultSettings = modulesFiles(settingFiles[0])
  }
  else {
    throw 'src文件夹下必须有且只有一个settings.js文件，并做好设置'
  }
} catch (err) {
  throw new Error(`src/settings.js文件错误，请检查该文件是否正确配置
${err}`)
}

const { showSettings, tagsView, fixedHeader, sidebarSearch } = defaultSettings
const state = {
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarSearch: sidebarSearch
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

