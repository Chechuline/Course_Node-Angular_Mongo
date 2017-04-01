'use strict'
/*
    controlador de usuarios
*/
var User=require('../models/usuario');
var bCrypt=require('bcrypt-nodejs');//encripta
var jwt=require('../services/jwt');

function pruebas(req,res){
    res.status(200).send({
        mensaje: "probando controlador usuario para la aplicacion de mongo y node"
    });
}


function saveUser(req,res){
    var user=new User();
    var params=req.body;

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

//comprueba que el usuario existe y es correcto
function loginUser(req,res){
    var params=req.body;

    var email=params.email;
    var pass=params.password;
    User.findOne({email: email.toLowerCase()}, (error,user)=>{
        if(error){
            res.status(500).send({message: "Error en la peticion"});
        }else{
            if(!user) {
                res.status(404).send({message: "usuario no existe"});
            }else{
                //comprobamos contraseña
                bCrypt.compare(pass, user.passwd, function(error,result){
                    //Devuelve contraseña de manera incorrecta, comprobar metodo compare
                    if(error){
                         res.status(404).send({message: error});
                    }else{
                       if(result){
                            if(params.gethash){
                                //devolver token jwt
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            }else{
                                //devuelve usuario
                                res.status(200).send({user});
                            }
                        } else {
                            res.status(404).send({message: "usuario no pudo loguear"});
                        }
                    }
                });
            }
        }
    });
}

module.exports={
    pruebas,
    saveUser,
    loginUser
}