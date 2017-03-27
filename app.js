'use strict'

var express=require('express');
var bodyParser=require('body-parser');
var app=express();
//cargar rutas
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var userRoutes = require('./routes/user');


//configurar cabeceras http

//rutas base
app.use('/api', userRoutes);


// app.get("/pruebas",function(req,resp){
//     resp.status(200).send({message: "zona de pruebas"});
// });


//exportacion
module.exports=app;
