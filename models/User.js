const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    uid:{
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    },

    address: {
        type: Array,
        require: false
    },

    phone: {
        type: String,
        require: false
    },

    userType : { 
        type: String,
        require: true,
        default: 'Client',
        enum: ['Admin', 'Driver', 'Client', 'Vendor'],
    },

    profile: {
        type: String,
        require: true,
        default: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png'
    },
}, { timestamps: true})

module.exports = mongoose.model('User', UserSchema) 