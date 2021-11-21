const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const TagSchema = new Schema(
  {
    // 标签名称
    name: { type: String, required: true },
    // 标签创建和最后更新时间
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
  }
)

TagSchema.plugin(autoIncrement.plugin, {
  model: 'Tag',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Tag', TagSchema);