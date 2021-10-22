const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    fullName:{
     type: String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    text:{
        type:String
    },
    Encreptresult:{
        type:String
    },
    pin:{
        type:String
    }
});


module.exports = mongoose.model('User', userSchema);