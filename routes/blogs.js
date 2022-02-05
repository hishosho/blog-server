const express = require('express');
const router = express.Router();

const blog_controller = require('../controllers/blogController');

// 查询所有博客
router.get('/', blog_controller.blog_list);

// 根据ID查询某个博客
router.get('/blog/:id', blog_controller.blog_by_id)

// 根据ID查询某个博客
router.get('/blogDetail', blog_controller.blogDetail_by_id)

// 查询所有已发布的博客
router.get('/publishedBlogs', blog_controller.blog_publishedBlogs);

// 根据分类标签查询已发布博客
router.get('/publishedBlogsByTagId', blog_controller.blog_publishedBlogs_by_tagId);

// 查询热门博客
router.get('/popular', blog_controller.blog_popular);

// 创建博客
router.post('/create', blog_controller.blog_create);

// 更新博客
router.put('/update/:id', blog_controller.blog_update);

// 删除博客
router.delete('/blog/:id', blog_controller.blog_delete);

module.exports = router;