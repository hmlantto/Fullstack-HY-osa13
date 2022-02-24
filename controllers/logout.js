const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { tokenExtractor } = require('../utils/tools')

const ActiveSession = require('../models/active_session')

router.delete('/', tokenExtractor, async (req, res) => {
  await ActiveSession.destroy({
    where: {
      userId: req.decodedToken.id
    }
  })

  res.status(204).end()
})

module.exports = router