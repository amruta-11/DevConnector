//Model is basically a reflection of Database data or table
//This is user model which is used to store the properties(name, email, password, etc) into MongoDB via mongoose.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema is a class defined in mongoose library
//UserSchema us an object with properties like name, mail etc of Schema Class

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

//This exports a handle or pointer(connection) to the 'users' table in mongoDB
module.exports = UserCollection = mongoose.model('users', UserSchema)