const Blog = require('../models/blog')

exports.blog_list = (req, res, next) => {
  Blog.find({}, (err, data) => {
    if (err) return next(err)
    res.status(200).json({
      code: true,
      message: '操作成功！',
      data
    })
  })
}

exports.blog_publishedBlogs = (req, res, next) => {
  Blog.find({ status: 2 }, (err, data) => {
    if (err) return next(err)
    res.status(200).json({
      code: true,
      message: '操作成功！',
      data
    })
  })
}

exports.blog_publishedBlogs_by_tags = (req, res, next) => {
  const { tags } = req.body.tags
  Blog.find({ status: { $in: tags } }, (err, data) => {
    if (err) return next(err)
    res.status(200).json({
      code: true,
      message: '操作成功！',
      data
    })
  })
}

exports.blog_popular = (req, res, next) => {
  Model
    .find()
    .sort('-visit_count')
    .limit(10)
    .exec((err, data) => {
      if (err) return next(err)
      res.status(200).json({
        code: true,
        message: '操作成功！',
        data
      }); 
    })
}

exports.blog_create = (req, res, next) => {
  const {
    title,
    desc,
    tags,
    content,
  } = req.body

  const blog = new Blog({
    title,
    desc,
    tags,
    status: 1,
    content,
    visit_count: 0,
    admire_count: 0
  })

  blog
    .save()
    .then(data => {
      res.status(200).json({
        code: true,
        message: '操作成功！',
        data
      })
    })
    .catch(err => {
      console.error('db err=', err)
      res.status(200).json({
        code: false,
        message: '数据录入失败，请稍后重试',
        data
      })
    })
}

exports.blog_update = (req, res, next) => {
  const {
    title,
    desc,
    tags,
    content,
  } = req.body

  const blog = new Blog({
    title,
    desc,
    tags,
    content,
    _id: req.params.id
  })

  Blog.findByIdAndUpdate(id, blog, {}, (err, data) => {
    if (err) return next(err)
    res.status(200).json({
      code: true,
      message: '操作成功！',
      data
    })
  })
}

exports.blog_delete = (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return next(err)
    res.status(200).json({
      code: true,
      message: '删除成功！'
    })
  })
}