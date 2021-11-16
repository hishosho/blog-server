const User = require('../models/user')
const NodeRSA = require('node-rsa')
const { privateKey } = require('../config')
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)

exports.user_publicKey = (req, res, next) => {
  const key = new NodeRSA({ b: 1024 })
  key.setOptions({
    encryptionScheme: 'pkcs1'
  })

  const publicKey = key.exportKey('public')
  const privateKey = key.exportKey('private')
  res.status(200).json({
    code: true,
    message: '获取成功！',
    data: publicKey
  })
}
exports.user_count = (req, res, next) => {
 User.countDocuments({}, (err, count) => {
   if (err) return next(err)
   res.status(200).json({
     code: true,
     message: '操作成功！',
     count: count
   })
 })
}
exports.user_list = (req, res, next) => {
  User.find({}, (err, result) => {
    if (err) return next(err)
		res.status(200).json({
      code: true,
      message: '操作成功！',
      data: result
    });
  })
}

exports.user_register = (req, res, next) => {
  const { userName } = req.body
  User.findOne({ 'user_name': userName })
    .exec((err, found_user) => {
      if (err) return next(err);
      if (found_user) {
        res.status(200).json({
          code: false,
          message: '用户已存在！'
        });
      } else {
        let key = new NodeRSA(privateKey)
        key.setOptions({encryptionScheme: 'pkcs1'})
        const { password, userType } = req.body
        const pw = key.decrypt(password, 'utf8')
        const pwHash = bcrypt.hashSync(pw, salt)
        const user = new User({
          user_name: userName,
          password: pwHash,
          user_type: userType
        })
        user.save().then(data => {
          res.status(200).json({
            code: true,
            message: '操作成功！',
            data
          });
        })
        .catch(err => {
          console.error('db err=', err)
          res.status(200).json({
            code: false,
            message: '数据录入失败，请稍后重试',
            data
          });
        });
      }
    })
}

exports.user_delete = (req, res, next) => {
  User.deleteMany({ id: req.params.id }, (err, result) => {
    if (err) return next(err)
    if (result.n === 1) {
      res.status(200).json({
        code: true,
        message: '删除成功！'
      });
    } else {
      res.status(200).json({
        code: false,
        message: '用户不存在！',
      });
    }
  })
}

exports.user_login = (req, res, next) => {
  const { userName, password } = req.body
  if (!userName) {
    res.status(400).json({
      code: false,
      message: '用户名不能为空'
    });
    return
  }
  if (!password) {
    res.status(400).json({
      code: false,
      message: '密码不能为空'
    });
    return
  }

  let key = new NodeRSA(privateKey)
  key.setOptions({encryptionScheme: 'pkcs1'})
  const pw = key.decrypt(password, 'utf8')

  User.findOne({ user_name: userName }, (err, userInfo) => {
    if (err) return next(err)
    if (userInfo && bcrypt.compareSync(pw, userInfo.password)) {
      res.status(200).json({
        code: true,
        message: '登录成功！'
      });
    } else {
      res.status(200).json({
        code: false,
        message: '账号密码错误或账号不存在！'
      });
    }
  })
  return
}