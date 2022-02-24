const router = require('express').Router()
const { tokenExtractor } = require('../utils/tools')

const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
  const rlItem = await ReadingList.create(req.body)
  res.json(rlItem)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  let rlItem = await ReadingList.findByPk(req.params.id)
  if (rlItem.userId !== req.decodedToken.id) {
    return res.status(401).end()
  }
  rlItem.read = req.body.read
  await rlItem.save()
  res.json(rlItem)
})

module.exports = router