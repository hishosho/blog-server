const Blog = require('../models/blog')
const { responseRet } = require('../util/http')
// const blogList = require('../mock/BlogList')
const detail = require('../mock/BlogDetail')

exports.blog_list = (req, res, next) => {
  // const data = blogList
  // responseRet(res, { data })
  Blog.find({}, (err, data) => {
    if (err) return next(err)
    responseRet(res, { data })
  }).sort({'order': 1})
}

exports.blog_by_id = (req, res, next) => {
  // const data = detail
  // responseRet(res, { data })
  Blog.find({ _id: req.params.id }, (err, data) => {
    if (err) return next(err)
    responseRet(res, { data: data[0] })
  })
}

exports.blog_publishedBlogs = (req, res, next) => {
  // const data = blogList
  // responseRet(res, { data })
  Blog.find({ status: 2 }, (err, data) => {
    if (err) return next(err)
    responseRet(res, { data })
  })
}

exports.blog_publishedBlogs_by_tags = (req, res, next) => {
  const { tags } = req.body.tags
  Blog.find({ status: { $in: tags } }, (err, data) => {
    if (err) return next(err)
    responseRet(res, { data })
  })
}

exports.blog_publishedBlogs_by_id = (req, res, next) => {
  Blog.find({ id: req.params.id }, (err, data) => {
    if (err) return next(err)
    responseRet(res, { data })
  })
}

exports.blog_popular = (req, res, next) => {
  const data = blogList
  responseRet(res, { data })
  // Blog
  //   .find()
  //   .sort('-visit_count')
  //   .limit(10)
  //   .exec((err, data) => {
  //     if (err) return next(err)
  //     responseRet(res, { data })
  //   })
}

exports.blog_create = (req, res, next) => {
  const {
    title,
    desc,
    tags,
    content,
    order,
  } = req.body

  const blog = new Blog({
    title,
    desc,
    tags,
    status: 1,
    content,
    order,
    visit_count: 0,
    admire_count: 0
  })

  blog
    .save()
    .then(data => {
      responseRet(res, { data })
    })
    .catch(err => {
      console.error('db err=', err)
      responseRet(res, { code: false, message: '数据录入失败，请稍后重试' })
    })
}

exports.blog_update = (req, res, next) => {
  const {
    title,
    desc,
    tags,
    content,
    status,
    order,
    publishDate
  } = req.body

  const blog = new Blog({
    title,
    desc,
    tags,
    content,
    status,
    order,
    publish_date: publishDate,
    _id: req.params.id
  })

  Blog.findByIdAndUpdate(req.params.id, blog, {}, (err, data) => {
    if (err) return next(err)
    responseRet(res, { data })
  })
}

exports.blog_delete = (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return next(err)
    responseRet(res, { message: '删除成功！' })
  })
}