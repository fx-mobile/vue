const getters = {
  tax_sidebar: state => state.tax_app.sidebar,
  tax_device: state => state.tax_app.device,
  tax_token: state => state.tax_user.token,
  tax_user_info: state =>state.tax_user.info,
  nav_router: state => state.tax_user.nav,
  tax_permission_routes: state => state.tax_permission.routes,
  // tax_avatar: state => state.tax_user.avatar,
  // tax_name: state => state.tax_user.name
}
export default getters
