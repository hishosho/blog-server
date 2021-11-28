const { verifyToken } = require('../util/token')
const { whitePaths } = require('../config')
const { responseRet } = require('../util/http')

module.exports = async (req, res, next) => {
  if (whitePaths.includes(req.path)) return next()
  const token = req.headers && req.headers.cookie && req.headers.cookie.split('=')[1]
  if (token) {
    const pass = await verifyToken(token)
    
    pass ? next() : responseRet(res, { message: '用户身份验证失败，请重新登录。', code: false }, 403)
  } else {
    responseRet(res, { message: '用户身份验证失败，请重新登录。', code: false }, 403)
  }
}