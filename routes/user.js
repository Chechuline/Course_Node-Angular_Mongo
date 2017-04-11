/*
    Enrutador de usuarios
*/
'use strict'

var express=require('express');
var userController=require("../controllers/user");
var md_auth = require("../middlewares/authenticated");

var multipart= require("connect-multiparty");
var md_upload=multipart({uploadDir: "./upload/users"});

var api=express.Router();

api.get('/pruebaControlador',md_auth.ensureAuth, userController.pruebas);//especificamos la ruta y que metodo se ejecutara
api.post('/register',userController.saveUser);
api.post('/login',userController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,userController.updateUser);
api.post('/upload-image-user/:id', md_auth.ensureAuth,md_upload,userController.uploadImage);
api.get('/get-image-user/:imageFile',userController.getImageFile);


module.exports=api;