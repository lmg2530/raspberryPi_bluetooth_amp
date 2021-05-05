import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.router'
import userRouter from './routes/user.router'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  // Website you wish to allow to connect
  const allowedOrigins = [
    'https://192.168.1.79:8080', 'http://192.168.1.79:8080',
    'https://localhost:8080', 'http://localhost:8080',
    'https://localhost:7000', 'http://localhost:7000'
  ]
  const origin = req.headers.origin
  console.log(allowedOrigins.indexOf(origin) > -1)
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})

app.use('/', indexRouter)
app.use('/user', userRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
