import Vue from 'vue'
import Vuex from 'vuex'
// import tax_app from './modules/tax_app'
// import tax_permission from './modules/tax_permission'
// import tax_settings from './modules/tax_settings'
// import tax_tags_view from './modules/tax_tags_view'
// import tax_user from './modules/tax_user'

// import getters from './getters'
Vue.use(Vuex)
// 获取业务代码中pages文件夹下的store
const getViewModules = () => {
  const modulesFiles = require.context('@/pages', true, /\.store\.js$/)
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\/(.*)\.store\.\w+$/, '$2')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
  return modules
}

// 获取业务代码中store文件夹下的store
const getSysModules = () => {
  const modulesFiles = require.context('@/lib/store/modules', true, /\.js$/)
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.js$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
  return modules
}

// 获取业务代码中store文件夹下的store
const getSysGetters = () => {
  const modulesFiles = require.context('@/lib/store', true, /getters\.js$/)
  const getters = modulesFiles.keys().reduce((getters, modulePath) => {
    const value = modulesFiles(modulePath)
    getters = Object.assign(getters, value.default);
    return getters
  }, {})
  return getters
}

const initStore = () => {
  const _viewModules = getViewModules()
  const sysModules = getSysModules()
  const getters = getSysGetters()
  const store = new Vuex.Store({
    modules: {
      ..._viewModules,
      ...sysModules
    },
    getters
  })
  return store
}

export default initStore