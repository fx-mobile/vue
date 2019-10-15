# @ttk/vue

> 这是一个基于 Vue+Vuex+Vue-router 进行封装的业务基础框架，默认提供登录，还有常用的API。支持路由覆盖，及去中心化等特点，开发者无需关注框架的实现，只需按Vue+Vuex开发规范进行数据绑定即可。
> 

目前版本为 `v0.1` 基于 `vue-cli` 进行构建，它依赖 vue-cli.

## 框架特点
- 去中心化，路由和页面store的操作都统一写在在一个文件夹下，代码结构更清晰，一个页面一个文件夹。

- 支持路由覆盖，业务代码中定义与框架中相同名称的路由名称即可覆盖框架路由。

- 支持重写框架的view层，无需修改store，复用框架中的store。

- 封装了部分常用接口，开发者可以直接使用，也可以自己重新写。

- 保留vue原有特性和数据操作的方法，降低框架学习成本

- UI在Element-UI V2.12的基础上进行了2次封装，继承Eleemnt-UI所有特性

- 提供一些常用工具集，如日期格式化，phone校验，ajax封装等。

- 自带mock和eslint，无需再配置
  

## 相关项目

[@ttk/vue](https://github.com/fx-mobile/@ttk/vue)

[tax-group-demo](https://github.com/fx-mobile/tax-group-demo)

[tax-group-ui](https://github.com/fx-mobile/tax-group-ui)


## 使用实例

```bash
# 克隆项目
git clone https://github.com/laogong5i0/tax-group-demo

# 进入项目目录
cd tax-group-demo

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 `待更新：使用文档`

## Demo

`demo`

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE>=9, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/fx-mobile/tax-group-demo/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen
