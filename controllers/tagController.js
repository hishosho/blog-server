const Tag = require('../models/tag')
const { responseRet } = require('../util/http')

exports.tag_list = (req, res, next) => {
  Tag.find({}, (err, data) => {
    if (err) return next(err)
    responseRet(res, { data })
  })
}

exports.tag_by_id = (req, res, next) => {
  Blog.find({ id: req.params.id }, (err, data) => {
    if (err) return next(err)
    responseRet(res, { data })
  })
}

exports.tag_add = (req, res, next) => {
  const blog = new Tag({ name: req.body })
  blog
    .save()
    .then(data => {
      responseRet(res, { data })
    })
    .catch(err => {
      console.error('db err=', err)
      responseRet(res, { data })
    })
}

exports.tag_update = (req, res, next) => {
  const tag = new Tag({ name: req.body, _id: req.params.id })
  Tag.findByIdAndUpdate(req.params.id, tag, {}, (err, data) => {
    if (err) return next(err)
    responseRet(res, { data })

  })
}

exports.tag_delete = (req, res, next) => {
  Tag.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err)
    responseRet(res, { message: '删除成功！' })
  })
}