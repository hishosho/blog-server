const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController')

// 获取登录公钥
// router.get('/publicKey', user_controller.user_publicKey)

// 查询用户数量
router.get('/user/count', user_controller.user_count)

// 获取所有用户
router.get('/users', user_controller.user_list);

// 创建用户
// router.post('/register', user_controller.user_register)

// 删除用户
router.delete('/user/:id', user_controller.user_delete)

// 用户登录
router.post('/login', user_controller.user_login)

module.exports = router;
