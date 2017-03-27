/*
    Enrutador de usuarios
*/
'use strict'

var express=require('express');
var userController=require("../controllers/user");


var api=express.Router();

api.get('/pruebaControlador',userController.pruebas);//especificamos la ruta y que metodo se ejecutara
api.post('/register',userController.saveUser);


module.exports=api;