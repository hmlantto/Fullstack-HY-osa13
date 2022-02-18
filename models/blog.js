const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

const today = new Date()
const currentYear = today.getFullYear()

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1991,
      max: currentYear
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'blog'
})

module.exports = Blog