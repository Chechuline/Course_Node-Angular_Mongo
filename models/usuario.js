'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//define esquema para poder ser utilizado en mongoDB con mongoose
var userSchema= Schema({
    name: String,
    surname: String,
    email: String,
    passwd: String,
    role: String,
    image: String
});

module.exports=mongoose.model('User', userSchema); //envia el esquema para su utilizacion