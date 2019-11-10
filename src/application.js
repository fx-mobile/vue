import Vue from 'vue'
import router from './router'
import initStore from './store'
// import getters from './store/getters'

// import TaxGroupUI from '@ttk/vue-ui'
// Vue.use(TaxGroupUI)

const store = initStore()

class SingletonApp {
  constructor() {
    this.vueApp = null
    this.router = null
    this.layout = null
    this.setting = null
    this.pageMap = null
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new SingletonApp()
    }
    return this.instance
  }
  config({setting, layout, pageMap}){
    this.setting = setting
    this.layout = layout
    this.pageMap = pageMap
  }
  getSeting(){
    return this.setting
  }
  setLayout(component){
    this.layout = component
  }
  start(_store) {
    if (!this.vueApp) {
      this.vueApp = new Vue({
        el: '#app',
        router,
        store,
        render: h => h('div', { attrs: { id: 'app' } }, [h('router-view')])
      })
    }else{
      throw 'Vue 已经实例化，请勿重复实例化。'
    }
  }
}

/**
 * 注入新的函数，用于框架常用函数的扩展，建议在程序启动前注入，避免运行时找不到注入的函数。
 * @param {string} funName
 * @param {function} fun
 */
const registerFun = (funName, fun) => {
  if (typeof funName !== 'string') {
    throw `注入函数时第一个参数必须是 String 类型，当前为: ${funName}`
  }
  if (typeof fun !== 'function') {
    throw `注入函数时第二个参数必须是 function 类型，当前为: ${fun}`
  }
  const instance = SingletonApp.getInstance()
  instance[funName] = fun
}

// const _viewModules = Store.getViewModules()
// const _taxModues = Store.modules
// const store = new Vuex.Store({
//   modules: {
//     ..._viewModules, // 这个store 是从项目中pages文件中扫描而来的
//     ..._taxModues
//   },
//   getters
// })

// const app = SingletonApp.getInstance()

export {
  SingletonApp,
  registerFun,
  store
}
