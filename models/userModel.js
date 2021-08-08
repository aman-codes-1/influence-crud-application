const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/aman-jain/image/upload/v1621071871/avatar/black-and-white-stockportable-network-account-icon-11553436383dwuayhjyvo_rgy0di.png"
    }
        
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)