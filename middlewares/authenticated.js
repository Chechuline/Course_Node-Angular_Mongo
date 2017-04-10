'use strict'
/*
    Middleware para la comprobacion del usuario
*/
var jwt=require("jwt-simple");
var moment=require("moment");
var secret="clave_secreta";

//comprueba que estemos logueados y sea valido
exports.ensureAuth=function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: "peticion sin cabecera de autenticación"});
    }
    //limpiamos token
    var token = req.headers.authorization.replace(/['"]/g,'');

    try{
        var payload=jwt.decode(token,secret);

        if(payload.exp <= moment.unix()){
            res.status(401).send({message: "Token expirado"});
        }
    }catch(ex){
        console.log(ex);
        res.status(403).send({message: "token no valido"});
    }

    req.user = payload;

    next();
}