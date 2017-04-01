/*
    Enrutador de usuarios
*/
'use strict'

var express=require('express');
var userController=require("../controllers/user");
var md_auth = require("../middlewares/authenticated");

var api=express.Router();

api.get('/pruebaControlador',md_auth.ensureAuth, userController.pruebas);//especificamos la ruta y que metodo se ejecutara
api.post('/register',userController.saveUser);
api.post('/login',userController.loginUser);


module.exports=api;