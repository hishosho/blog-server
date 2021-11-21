const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const UserSchema = new Schema(
  {
    // 用户名
    user_name: { type: String, required: true, max: 200 },
    // 用户密码
    password: {
      type: String,
      required: true,
    },
    // 用户类型 1: 管理员 2: 普通用户
    user_type: { type: Number, default: 1 },
    // 创建时间
    create_date: { type: Date, default: Date.now },
    // 最后修改时间
    update_date: { type: Date, default: Date.now },
    // timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
  }
)

UserSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('User', UserSchema);