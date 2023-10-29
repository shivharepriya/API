const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },
    
    confirm_password: {
        type: String,
        require: true,
    },
   
    role: {
        type: String,
        default: 'User',
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
},
    { timestamps: true }
)
const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel