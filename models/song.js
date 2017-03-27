var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var SongSchema = Schema({
    number: String,
    name: String,
    duration:String,
    file: Number,
    album: { type: Schema.ObjectId, ref: 'Album'}
   //creamos una referencia entre el _id del objeto artista en esta libreria
});

module.exports=mongoose.model("Song", SongSchema);