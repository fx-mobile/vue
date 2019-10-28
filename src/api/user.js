import request, { post } from '../utils/request'
// import { getToken } from '../utils/auth'

export function login(data) {
  return request({
    url: '/gateway/org/back/userService/loginExt?appId=10001006',
    method: 'post',
    data
  })
}

// export function getInfo() {
//   const token = getToken();
//   return request({
//     url: `/gateway/appcenter/back/confAuthUser/checkLoginDataPermission?appId=10001006&requestId=c246ac00fecdcccbe9dcb0269d342286&token=${token}`,
//     // url: '/user/info',
//     method: 'post',
//     data: {}
//   })
// }

export function logout(token) {
  return request({
    url: `/gateway/org/back/userService/logout?appId=10001006&requestId=20ee7986f24222c7bfc3cabe58400bec&token=${token}`,
    method: 'post',
    data: { token }
  })
}

export function getNav({ depId = '2', appId = 10001006 } = { depId: '2', appId: 10001006 }) {
  const url = `/gateway/org/back/functionService/querySecFunctionNav?appId=${appId}`
  return post(url, {depId})
}
