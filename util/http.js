exports.responseRet = (res, { code=true, message='操作成功!', data={} }, status=200) => {
  const result = {
    code,
    data
  }
  if (message) {
    result.message = message
  }

  return res.status(status).json(result)
}