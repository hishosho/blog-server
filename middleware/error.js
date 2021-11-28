const { responseRet } = require('../util/http')
module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.message);

  // render the error page
  responseRet(res, { message: '系统错误', code: false }, err.status || 500)
}