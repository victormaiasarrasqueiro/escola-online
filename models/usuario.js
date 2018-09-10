
var mongoose = require('mongoose');

// define the schema for our user model
var usuarioSchema = mongoose.Schema(
    {

        nm               : String,
        img              : String,
        email            : String,
        tpUsu            : Number,

        local: 
        {
            password     : String,
        },

        facebook: 
        {
            id           : { type: String, unique: true },
            email        : String,
            img          : String
        },

        google: 
        {
            id           : { type: String, unique: true },
            email        : String,
            img          : String
        },

        ieAtv            : Boolean

    }, 
    { 
        collection: 'usuario'
    }
);

usuarioSchema.index({ 'ieAtv': 1 , 'email':1 , 'facebook.id':1, 'google.id':1 }); // schema level

// create the model for users and expose it to our app
module.exports = mongoose.model('Usuario', usuarioSchema);

