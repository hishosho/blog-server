const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const BlogSchema = new Schema(
  {
    // 博客标题
    title: { type: String, required: true },
    // 博客简介
    desc: { type: String },
    // 博客标签列表
    tags: [String],
    // 博客访问次数
    visit_count: Number,
    // 点赞数量
    admire_count: Number,
    // 博客状态：1：待发布 2：已发布
    status: { type: Number, required: true, default: 1 },
    // 博客内容
    content: { type: String, required: true },
    // 博客创建时间
    create_date: { type: Date, default: Date.now },
    // 博客更新时间
    update_date: { type: Date, default: Date.now },
    // 博客发布时间
    publish_date: Date,
    // timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
  }
)

BlogSchema.plugin(autoIncrement.plugin, {
  model: 'Blog',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Blog', BlogSchema);