const jwt = require('jsonwebtoken')
const { redisClient } = require('../db/redis')
const { privateKey, REDIS_EXP_TIME } = require('../config')

const createToken = (userName) => {
  const token = jwt.sign({ userName }, privateKey, { algorithm: 'RS256' })
  redisClient.set(token, {
    userName,
    createDate: new Date().getTime()
  })
  redisClient.expire(token, REDIS_EXP_TIME)
  return token
}

const verifyToken = async (token) => {
  const tokenVal = await redisClient.get(token)
  if (tokenVal) {
    const remainingTime = redisClient.ttl(token)
    if (remainingTime < REDIS_EXP_TIME / 2) {
      redisClient.expire(token, REDIS_EXP_TIME)
    }
    return true
  }
  return false
}

module.exports = {
  createToken,
  verifyToken
}