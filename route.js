var baseRoute                = require('./routes/base');
var authenticateRoute        = require('./routes/authenticate');
var cursoRoute               = require('./routes/curso');
var aulaRoute                = require('./routes/aula');
var alunoRoute               = require('./routes/aluno');
var categoriaRoute           = require('./routes/categoria');
var usuarioRoute             = require('./routes/usuario');
var youtubeRoute             = require('./routes/youtube');


module.exports = function(app, passport) {

	//Base
    app.use('/', baseRoute);

    //API
    app.use('/api/authenticate', authenticateRoute);
    app.use('/api/curso', cursoRoute);
    app.use('/api/aula', aulaRoute);
    app.use('/api/aluno', alunoRoute);
    app.use('/api/categoria', categoriaRoute);
    app.use('/api/usuario', usuarioRoute);
    app.use('/api/youtube', youtubeRoute);

};
