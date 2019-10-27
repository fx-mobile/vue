import Vue from 'vue'
import Vuex from 'vuex'
// import {App} from '../views/index.umd'
import { registryRouter, scanRouter } from './router'
import Store from './store'
import getters from './store/getters'

import TaxGroupUI from '@ttk/vue-ui'
Vue.use(TaxGroupUI)
// Vue.use(TaxViews)
Vue.use(Vuex)

class SingletonApp {
  constructor() {
    this.routers = []
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new SingletonApp()
    }
    return this.instance
  }
  setRouters(roues){
    this.routers = this.routers.concat(roues)
  }
  getRouters(){
    return this.routers;
  }
}

/**
 * 注入新的函数，用于框架常用函数的扩展，建议在程序启动前注入，避免运行时找不到注入的函数。
 * @param {string} funName
 * @param {function} fun
 */
const registerFun = (funName, fun) => {
  if (typeof funName !== 'string') {
    console.error(`注入函数时第一个参数必须是 String 类型，当前为: ${funName}`)
  }
  if (typeof fun !== 'function') {
    console.error(`注入函数时第二个参数必须是 function 类型，当前为: ${fun}`)
  }
  const instance = SingletonApp.getInstance()
  instance[funName] = fun
}
const _iewRouter = scanRouter()
const router = registryRouter(_iewRouter)
const _viewModules = Store.getViewModules()
// const _modules = Store.getModulesFromFile()
const _taxModues = Store.modules

const store = new Vuex.Store({
  modules: {
    // ..._modules,
    ..._viewModules,
    ..._taxModues 
  },
  // },
  getters
})

const start = () => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h('div', {attrs: {id: 'app'}}, [h('router-view')])
  })
}

const app = SingletonApp.getInstance()

export {
  SingletonApp,
  app,
  registerFun,
  start,
  router,
  store
}
