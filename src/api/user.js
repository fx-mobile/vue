import request from '../utils/request'
import { getToken } from '../utils/auth'

export function login(data) {
  return request({
    url: '/gateway/org/back/userService/loginExt?appId=10001006&requestId=2c3b44751ae520bcfe56a7b782cb548b',
    method: 'post',
    data
  })
}

export function getInfo() {
  const token = getToken();
  return request({
    url: `/gateway/appcenter/back/confAuthUser/checkLoginDataPermission?appId=10001006&requestId=c246ac00fecdcccbe9dcb0269d342286&token=${token}`,
    // url: '/user/info',
    method: 'post',
    data: {}
  })
}

export function logout(token) {
  // const token = getToken();
  return request({
    url: `/gateway/org/back/userService/logout?appId=10001006&requestId=20ee7986f24222c7bfc3cabe58400bec&token=${token}`,
    method: 'post',
    data: { token }
  })
}

export function getNav() {
  const token = getToken();
  return request({
    url: `/gateway/org/back/functionService/querySecFunctionNav?appId=10001006&requestId=888d1796f0d31d7c67b37aa9459d8a96&token=${token}`,
    method: 'post',
    data: { depId: "1" }
  })
}
