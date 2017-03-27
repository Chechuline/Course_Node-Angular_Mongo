'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var AlbumSchema = Schema({
    title: String,
    description:String,
    year: Number,
    imagen:String,
    artist: { type: Schema.ObjectId, ref: 'Artist'}//creamos una referencia entre el _id del objeto artista en esta libreria
});

module.exports=mongoose.model("Album", AlbumSchema);