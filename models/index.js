const Blog = require('./blog')
const ReadingList = require('./readingList')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'savedBlogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'savedBy' })

module.exports = {
  Blog, User, ReadingList
}