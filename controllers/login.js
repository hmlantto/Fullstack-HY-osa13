const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const User = require('../models/user')
const ActiveSession = require('../models/active_session')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secretpassword'

  if (!user ||passwordCorrect === false || user.disabled === true) {
    return res.status(401).json({
      error: 'Invalid username or password.'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)
  
  const newSession = {
    userId: user.id,
    token: token
  }

  await ActiveSession.create(newSession)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router