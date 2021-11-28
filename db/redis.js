const redis = require('redis')
const redisClient = redis.createClient()

redisClient.on('ready', res => {
  console.log('redis 启动成功！', res)
})

redisClient.on('error', err => {
  console.log('redis启动失败！', err)
})

module.exports = {
  redisClient
}