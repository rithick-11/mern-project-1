const mongoose = require('mongoose')

const userSchem = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    fullName:{
        type: String,
        required: true,
    },

},{timestamps: true})

const User = mongoose.model("user", userSchem)


module.exports = User