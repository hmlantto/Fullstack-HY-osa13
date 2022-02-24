const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const ActiveSession = require('../models/active_session')
const User = require('../models/user')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      req.decodedToken = jwt.verify(token, SECRET)

      const user = await User.findByPk(req.decodedToken.id)

      if ( user.disabled === true ) {
        await ActiveSession.destroy({
          where: {
            userId: req.decodedToken.id
          }
        })
        return res.status(401).end()
      }
      
      const session = await ActiveSession.findAll({
        where: { token: token }
      })

      if ( session.length === 0 ) {
        return res.status(401).json({ error: 'Token invalid' })  
      }

    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'Token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'Token missing' })
  }
  next()
}

module.exports = { tokenExtractor }