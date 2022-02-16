const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established.')
  } catch (err) {
    console.log('Could not connect to database.')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }