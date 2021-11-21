const Tag = require('../models/tag')

exports.tag_list = (req, res, next) => {
  Tag.find({}, (err, data) => {
    if (err) return next(err)
    res.status(200).json({
      code: true,
      message: '操作成功！',
      data
    })
  })
}

exports.tag_by_id = (req, res, next) => {
  Blog.find({ id: req.params.id }, (err, data) => {
    if (err) return next(err)
    res.status(200).json({
      code: true,
      message: '操作成功！',
      data
    })
  })
}

exports.tag_add = (req, res, next) => {
  const blog = new Tag({ name: req.body })
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

exports.tag_update = (req, res, next) => {
  const tag = new Tag({ name: req.body, _id: req.params.id })
  Tag.findByIdAndUpdate(req.params.id, tag, {}, (err, data) => {
    if (err) return next(err)
    res.status(200).json({
      code: true,
      message: '操作成功！',
      data
    })
  })
}

exports.tag_delete = (req, res, next) => {
  Tag.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) return next(err)
    res.status(200).json({
      code: true,
      message: '删除成功！'
    })
  })
}