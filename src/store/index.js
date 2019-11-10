import Vue from 'vue'
import Vuex from 'vuex'
import tax_app from './modules/tax_app'
import tax_permission from './modules/tax_permission'
import tax_settings from './modules/tax_settings'
import tax_tags_view from './modules/tax_tags_view'
import tax_user from './modules/tax_user'

import getters from './getters'
Vue.use(Vuex)
// 获取业务代码中views文件夹下的store
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

const taxModules = {
  tax_app,
  tax_permission,
  tax_settings,
  tax_tags_view,
  tax_user
}

const initStore = () => {
  const _viewModules = getViewModules()
  const store = new Vuex.Store({
    modules: {
      ..._viewModules,
      ...taxModules
    },
    getters
  })
  return store
}

export default initStore