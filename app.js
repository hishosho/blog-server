const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const dealCorssDomain = require('./middleware/dealCorssDomain');
const verify = require('./middleware/verify');
const error = require('./middleware/error');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs');
const tagsRouter = require('./routes/tags');

const { initMongoDB } = require('./db/mongoose');

// 初始化数据库
initMongoDB()

const app = express();

// 处理跨域问题
app.use(dealCorssDomain)

// 请求接口身份认证
app.use(verify)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter)
app.use('/tags', tagsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(error);

module.exports = app;
