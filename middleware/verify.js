const { verifyToken } = require('../util/token')
const { whitePaths } = require('../config')
const { responseRet } = require('../util/http')

module.exports = async (req, res, next) => {
  if (whitePaths.includes(req.path)) return next()
  const token = req.body.Authoritarian
  if (token) {
    const pass = await verifyToken(token)
    
    pass ? next() : responseRet(res, { message: '用户身份验证失败，请重新登录。', code: false })
  } else {
    responseRet(res, { message: '用户身份验证失败，请重新登录。', code: false })
  }
}