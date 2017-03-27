'use strict'
/*
    controlador de usuarios
*/
var User=require('../models/usuario');
var bCrypt=require('bcrypt-nodejs');//encripta

function pruebas(req,res){
    res.status(200).send({
        mensaje: "probando controlador usuario"
    });
}


function saveUser(req,res){
    var user=new User();
    var params=req.body;
    
    console.log(params);

    user.name=params.name;
    user.surname=params.surname;
    user.email=params.email;
    user.role="ADMIN";
    user.image='null';

    if(undefined!=params.password){
        //encripa contraseña
        bCrypt.hash(params.password,null,null,function(error,hash){
            user.passwd=hash;
            if(user.name!=null && user.surname!=null && user.email!=null){
                //guardar en BBDD usuario
                user.save((error,userStored)=>{
                    if(error){
                        res.status(500).send({message: "Error al guardar usuario"});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: "No se guardo el usuario"});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });

            }else{
                res.status(200).send({message: "Introduce todos los campos"});
            }
        });
    }else{
        res.status(500).send({message: "introduce contraseña"});
    }

}

module.exports={
    pruebas,
    saveUser
}