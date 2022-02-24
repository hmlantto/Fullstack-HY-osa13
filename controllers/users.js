const router = require('express').Router()
const { Op } = require('sequelize')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Blog,
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] }
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  let where = {}

  if (req.query.read) {
    where = {
      read: {
        [Op.eq]: req.query.read
      }
    }
  }
  
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Blog,
        as: 'savedBlogs',
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId']},
        through: {
          attributes: ['id', 'read'],
          where
        }
      }
    ]
  })
  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  if (user) {
    user.name = req.body.name
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router