import express from 'express'
import model from '../models/index'

const router = express.Router()

/* GET users listing. */
router.get('/', async (req, res, next) => {
  console.log(req.query)
  const temp = await model.user.login(req, res)
  console.log(temp)
  res.json('respond with a resource')
})

module.exports = router
