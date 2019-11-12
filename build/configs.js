const path = require('path')
const buble = require('rollup-plugin-buble')
const flow = require('rollup-plugin-flow-no-whitespace')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const async = require('rollup-plugin-async');
const json = require('rollup-plugin-json');
const babel = require('rollup-plugin-babel')
const version = process.env.VERSION || require('../package.json').version
const banner =
  `/*!
  * @ttk/vue v${version}
  * (c) ${new Date().getFullYear()} Evan You
  * @license MIT
  */`

const resolve = _path => path.resolve(__dirname, '../', _path)

module.exports = [
  // 开发时使用npm link方式时使用，可以监听库文件的改变，会watch并编译编译
  {
    file: resolve('dist/ttk-vue.esm.js'),
    format: 'umd',
    env: 'development'
  },
  {
    file: resolve('dist/ttk-vue.min.js'),
    format: 'umd',
    env: 'production'
  },
  {
    file: resolve('dist/ttk-vue.common.js'),
    format: 'cjs'
  },
  {
    file: resolve('dist/ttk-vue.esm.js'),
    format: 'es'
  },
  {
    file: resolve('dist/ttk-vue.esm.browser.js'),
    format: 'es',
    env: 'development',
    transpile: false
  },
  {
    file: resolve('dist/ttk-vue.esm.browser.min.js'),
    format: 'es',
    env: 'production',
    transpile: false
  }
].map(genConfig)

function genConfig(opts) {
  const config = {
    input: {
      input: resolve('src/index.js'),
      external:['vue','vue-router', 'vuex', 'js-cookie', 'axios', 'clipboard', '@ttk/vue-ui', 'element-ui'],
      plugins: [
        flow(),
        node(),
        json(),
        cjs(),
        babel(),
        replace({
          __VERSION__: version
        })
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'VueRouter'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (opts.transpile !== false) {
    config.input.plugins.push(buble({
      transforms: {
        arrow: true,
        classes: true,
        conciseMethodProperty: true,
        parameterDestructuring: true,
        destructuring: true,
        letConst: true,
        modules: false,
        dangerousForOf: true,
        spreadRest: true,
        defaultParameter: true
      },
      objectAssign: 'Object.assign'
    }))
  }

  return config
}
