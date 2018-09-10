module.exports = {

    'privateKey': 'iv9MxmSj2Ml6de54fxsplM0jjvVv31m',
    
    'database': 'mongodb://localhost:27017/escola',
    
    'corsOptions' : {
	  origin: ['http://127.0.0.1'],
	  methods:['GET','POST','PUT','DELETE'],
	  allowedHeaders:['Content-Type', 'Authorization']
	}

};