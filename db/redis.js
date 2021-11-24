const redis = require('redis')
const redisClient = redis.createClient('127.0.0.1')

redisClient.on('ready', res => {
  console.log('redis 启动成功！', res)
})

redisClient.on('error', err => {
  console.log('redis启动失败！', err)
})

module.exports = {
  redisClient
}