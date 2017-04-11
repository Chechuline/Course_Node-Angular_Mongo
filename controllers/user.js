'use strict'
/*
    controlador de usuarios
*/
var User=require('../models/usuario');
var bCrypt=require('bcrypt-nodejs');//encripta
var jwt=require('../services/jwt');
var fs=require("fs");
var path=require("path");

//prueba
function pruebas(req,res){
    res.status(200).send({
        mensaje: "probando controlador usuario para la aplicacion de mongo y node"
    });
}

//almacena los datos de usuario
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

function updateUser(req,res){
    
    var userId=req.params.id;
    var update= req.body;

    User.findByIdAndUpdate(userId, update, function(error,userUpdated){
        if(error){
            res.status(500).send({message: "error al actualizar el usuario"});
        }else{
            if(!userUpdated){
                res.status(404).send({message: "no se pudo actualziar el usuario"});
            }else{
                res.status(200).send({userUpdated});
            }
        }
    });
}

function uploadImage(req,res){
    var userId=req.params.id;
    var fileName='no subido';
    var files=req.files;
    if(req.files){
        var filePath=req.files.image.path;
        var file_split=filePath.split('\\');
        fileName=file_split[2];

        var ext_split= fileName.split('\.');
        var ext=ext_split[1];

        if(ext=='png' || ext=='jpg' || ext=="gif"){
            User.findByIdAndUpdate(userId,{image: fileName},(err,userUpdated)=>{
                if(!userUpdated){
                    res.status(404).send({message: "no se pudo actualziar el usuario"});
                }else{
                    res.status(200).send({image: fileName,user: userUpdated});
                }
            });
        }else{
            res.status(200).send({ message: "extension no valida"});
        }
    }else{
        res.status(404).send({ message: "imagen no subida"});
    }
}

function getImageFile(req,res){
    var imagefile=req.params.imageFile;
    var pathFile='./upload/users/'+imagefile

    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({ message: "imagen no existe"});
        }
    });

}

module.exports={
    pruebas,
    saveUser,
    loginUser,
    updateUser, 
    uploadImage,
    getImageFile
}