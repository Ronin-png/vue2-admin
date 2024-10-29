// 当前登录用户
export function getCurrentAuthority() {
  return ['admin']
}

// 判断当前登录用户是否有权限
export function check(authority) {
  const current = getCurrentAuthority()
  return current.some((item) => authority.includes(item))
}

// 判断当前用户是否已登录
export function isLogin() { 
  const current = getCurrentAuthority()
  return current && current[0] !== 'guest'
}