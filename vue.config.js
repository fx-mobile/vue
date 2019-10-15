const path = require('path')

const name = 'tax-group-com' // page title
function resolve(dir) {
  return path.join(__dirname, dir)
}
function _externals() {
  const exs = {}
  const list = ['vue', 'vuex', 'vue-router', "@settings", "@view"]
  list.forEach(ex => {
    exs[ex] = {
      commonjs: ex,
      commonjs2: ex,
      amd: ex
    }
  })

  return exs
}
module.exports = {
  outputDir:'views',
  pages: {
    index: {
      entry: 'examples/index.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    name: name,
    resolve: {
      alias: {
        '@ttkv': resolve('packages')
      }
    },
    externals: _externals()
  },
  chainWebpack: config =>{
    config.module
    .rule('images').use('url-loader').loader('url-loader').tap(options => Object.assign(options, { limit: 50000 }))
  }
}

