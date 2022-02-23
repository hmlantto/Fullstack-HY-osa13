const router = require('express').Router()

const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
  const rlItem = await ReadingList.create(req.body)
  res.json(rlItem)
})

module.exports = router