const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
