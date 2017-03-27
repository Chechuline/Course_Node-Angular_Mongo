'use strict'

var mongoose = require('mongoose');
var app=require('./app');
var port=process.env.port || 3977;




mongoose.connect('mongodb://localhost:27017/curso_node_angular', (err,resp)=>{
    if(err) throw err
    else {
        console.log("conectado");

        app.listen(port, function(){
            console.log("servidor api REST escuchando en localhost:"+port);
        });
        
    }
});
