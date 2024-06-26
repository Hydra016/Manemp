const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    googleId: String,
    socketId: String,
    givenName: String,
    familyName: String,
    email: String,
    shopName: String,
    password: String,
    shopType: String,
    role: String,
    picture: String
})

module.exports = mongoose.model('user', UserSchema)