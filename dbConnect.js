
var mongoose      = require('mongoose');
var constants     = require('./constants');


// expose this function to our app using module.exports
module.exports = function(passport) {

    // Se conectando ao mongodb.
    // Recomendado que em produção o autoIndex seja false para ganho de performance.
    mongoose.connect(constants.database, { config: { autoIndex: true } });

    var db = mongoose.connection;

    db.on('error',console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("Conectado ao mongodb.");
    });

};
