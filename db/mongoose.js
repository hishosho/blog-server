// 数据库连接
const mongoose = require('mongoose')

exports.initMongoDB = () => {
  const mongoDB = 'mongodb://127.0.0.1/blog_database'
  // mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  // 让 mongoose 使用全局 Promise
  mongoose.Promise = global.Promise
  // 取得默认连接
  const db = mongoose.connection
  // 将连接与错误事件绑定（以获得连接错误的提示）
  db.on('error', console.error.bind(console, 'MongoDB 连接错误'))
}

