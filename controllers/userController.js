const User = require('../models/user')
const NodeRSA = require('node-rsa')
const { privateKey } = require('../config')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const { createToken } = require('../util/token')
const { responseRet } = require('../util/http')

exports.user_publicKey = (req, res, next) => {
  const key = new NodeRSA({ b: 1024 })
  key.setOptions({
    encryptionScheme: 'pkcs1'
  })

  const publicKey = key.exportKey('public')
  const privateKey = key.exportKey('private')
  responseRet(res, { data: publicKey })
 
}
exports.user_count = (req, res, next) => {
 User.countDocuments({}, (err, count) => {
   if (err) return next(err)
   responseRet(res, { data: count })
 })
}
exports.user_list = (req, res, next) => {
  User.find({}, (err, data) => {
    if (err) return next(err)
		responseRet(res, { data })
  })
}

exports.user_register = (req, res, next) => {
  const { userName } = req.body
  User.findOne({ 'user_name': userName })
    .exec((err, found_user) => {
      if (err) return next(err);
      if (found_user) {
        responseRet(res, { message: '用户已存在！', code: false })
      } else {
        // RSA用户密码参数解密
        const { password, userType } = req.body
        let key = new NodeRSA(privateKey)
        key.setOptions({encryptionScheme: 'pkcs1'})
        const pw = key.decrypt(password, 'utf8')
        // 用户密码bcrypt加密入库
        const pwHash = bcrypt.hashSync(pw, salt)
        const user = new User({
          user_name: userName,
          password: pwHash,
          user_type: userType
        })
        user.save().then(data => {
          responseRet(res, { data })
        })
        .catch(err => {
          console.error('db err=', err)
          responseRet(res, { message: '数据录入失败，请稍后重试', code: false })
        });
      }
    })
}

exports.user_delete = (req, res, next) => {
  User.deleteMany({ id: req.params.id }, (err, result) => {
    if (err) return next(err)
    responseRet(res, { message: result.n === 1 ? '删除成功！' : '用户不存在！', code: result.n === 1 })
  })
}

exports.user_login = (req, res, next) => {
  const { userName, password } = req.body
  if (!userName) {
    responseRet(res, { message: '用户名不能为空', code: false }, 400)
    return
  }
  if (!password) {
    responseRet(res, { message: '密码不能为空', code: false }, 400)
    return
  }

  let key = new NodeRSA(privateKey)
  key.setOptions({encryptionScheme: 'pkcs1'})
  const pw = key.decrypt(password, 'utf8')

  User.findOne({ user_name: userName }, (err, userInfo) => {
    if (err) return next(err)
    // 校验登录密码
    if (userInfo && bcrypt.compareSync(pw, userInfo.password)) {
      // 创建token
      const token = createToken(userName)
      res.header('Authoritarian', token)
      responseRet(res, { message: '登录成功！' })
    } else {
      responseRet(res, { message: '账号密码错误或账号不存在！', code: false})
    }
  })
  return
}