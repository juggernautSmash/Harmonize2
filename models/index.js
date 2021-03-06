const { model, Schema } = require('mongoose')

const User = require('./User.js')(model, Schema)
const Youtube = require('./Youtube.js')(model, Schema)
const FriendRequest = require('./FriendRequest.js')(model, Schema)
const Gig = require('./Gig.js')(model, Schema)

module.exports = { User, Youtube, FriendRequest, Gig }