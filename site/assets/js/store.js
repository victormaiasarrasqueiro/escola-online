var store = {

	set:function(key,value){

		console.log('store' + key + ':' + value);
		window.localStorage.setItem(key,value);

	},

	get:function(key){

		return window.localStorage.getItem(key);

	}


};