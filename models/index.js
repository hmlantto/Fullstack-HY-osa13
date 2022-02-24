const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')
const ActiveSessions = require('./active_session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'savedBlogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'savedBy' })

User.hasOne(ActiveSessions)
ActiveSessions.belongsTo(User)

module.exports = {
  Blog, User, ReadingList
}