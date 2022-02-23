const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'savedBlogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'savedBy' })

module.exports = {
  Blog, User, ReadingList
}