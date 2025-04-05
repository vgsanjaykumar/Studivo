const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        role: {
            type: String,
            enum: ["student", "tutor", "admin"],
        },
        default: "student",
    }
})

module.exports = mongoose.model('User', userSchema);