
// Modulos
var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var flash         = require('connect-flash');
var morgan        = require('morgan');
var session       = require('express-session');
var cors          = require('cors');                      // Habilita diversas configurações de CORS
var jwt           = require('jsonwebtoken');
var helmet        = require('helmet')                     // Inclusão de modulos de segurança do HTTP


// Importando configurações do sistema.
var constants     = require('./constants');
var dbConnect     = require('./dbConnect');
var appAuth       = require('./auth');
var appRoute      = require('./route');

/* 
* 
* Iniciando app
*
*/
var app = express();


// Configurando a porta do sistema.
var port = process.env.PORT || 8080;


// Conectado a Base de dados do Projeto.
dbConnect();


// Configurando o projeto.
//app.use(morgan('dev')); // log every request to the console
app.use(express.static(path.join(__dirname, 'site')));
app.use(cookieParser());
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(session({
  secret: 'keyboard cat'
  //resave: false,
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//helmet ( Protenção HTTP - X-Content-Type-Options , X-DNS-Prefetch-Control, X-Download-Options, X-Frame-Options, X-XSS-Protection)
app.use(helmet());

//Habilita CORS
app.use(cors(constants.corsOptions));

// Desabilitando o cache no servidor 
app.disable('etag');

//Autenticação
appAuth(app, passport);


//Routes
appRoute(app);



// Error handler

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port);

console.log('Sistema Iniciado na porta: ' + port);

module.exports = app;
