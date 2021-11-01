const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController')

// 查询用户数量
router.get('/user/count', user_controller.user_count)

// 获取所有用户
router.get('/users', user_controller.user_list);

// 创建用户
router.post('/user', user_controller.user_create)

// 删除用户
router.delete('/user/:id', user_controller.user_delete)

// 用户登录
router.post('/login', user_controller.user_login)

module.exports = router;
