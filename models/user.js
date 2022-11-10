'use strcit'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role:{
        type: ["user", "admin"],
        default: "user"
    }

})

module.exports = mongoose.model('User', UserSchema);