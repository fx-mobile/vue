module.exports = file => {
  let component
  try {
    component = require('@/pages' + file + '.vue').default
  }catch(err){
    component = {render: c=>c('div', `未找到该页面: /pages${file}.vue`)}
  }
  return component
}