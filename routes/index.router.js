import express from 'express'
import model from '../models/index'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.query)
  // await model.somefunction
  res.render('index', { title: 'Express' })
})

module.exports = router
