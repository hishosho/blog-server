const express = require('express');
const router = express.Router();

const tag_controller = require('../controllers/tagController');

// 查询所有博客标签
router.get('/', tag_controller.tag_list);

// 根据ID查询某个标签
router.get('/tag/:id', tag_controller.tag_by_id)

// 创建标签
router.post('/create', tag_controller.tag_add);

// 更新博客
router.put('/update', tag_controller.tag_update);

// 删除博客
router.delete('/tag/:id', tag_controller.tag_delete);

module.exports = router;