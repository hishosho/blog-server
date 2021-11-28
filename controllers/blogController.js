const Blog = require('../models/blog')
const { responseRet } = require('../util/http')

exports.blog_list = (req, res, next) => {
  const data = {
    total: 2,
    rows: [{
      id: 1,
      title: `blog_1`,
      state: 'pubilshed',
      order: 1,
      tags: [{
          id: 1,
          name: 'Vue'
        },
        {
          id: 2,
          name: 'React'
        }
      ],
      admireCount: 1,
      visitCount: 1,
      publishDate: Date.now(),
      updateDate: Date.now(),
    },
    {
      id: 2,
      title: `blog_2`,
      state: 'pubilshed',
      order: 2,
      tags: [{
          id: 1,
          name: 'Vue'
        },
        {
          id: 2,
          name: 'React'
        }
      ],
      admireCount: 1,
      visitCount: 1,
      publishDate: Date.now(),
      updateDate: Date.now(),
    }]
  }
  responseRet(res, { data })
  // Blog.find({}, (err, data) => {
  //   if (err) return next(err)
  //   responseRet(res, { data })
  // })
}

exports.blog_by_id = (req, res, next) => {
  Blog.find({ id: req.params.id }, (err, data) => {
    if (err) return next(err)
    esponseRet(res, { data })
    
  })
}

exports.blog_publishedBlogs = (req, res, next) => {
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
  Blog
    .find()
    .sort('-visit_count')
    .limit(10)
    .exec((err, data) => {
      if (err) return next(err)
      responseRet(res, { data })
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
  } = req.body

  const blog = new Blog({
    title,
    desc,
    tags,
    content,
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