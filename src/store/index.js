// import Vue from 'vue'
// import Vuex from 'vuex'
// import getters from './getters'
// import app from './modules/app'
// import settings from './modules/settings'
// import user from './modules/user'

// // 获取业务代码中store/modules文件夹里的store
// const getModulesFromFile = () => {
//   const modulesFiles = require.context('@/store/modules', true, /\.js$/)
//   const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//     const value = modulesFiles(modulePath)
//     modules[moduleName] = value.default
//     return modules
//   }, {})
//   return modules
// }

// 获取业务代码中views文件夹下的store
const getViewModules = () => {
  const modulesFiles = require.context('@/views', true, /\.store\.js$/)
  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\/(.*)\.store\.\w+$/, '$2')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})
  return modules
}

const modulesFiles = require.context('./modules', true, /\.js$/)

// 自动获取@ttk/vue下的store/modules
const taxModules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default {
  getViewModules: getViewModules,
  // getModulesFromFile: getModulesFromFile,
  modules: taxModules
}
