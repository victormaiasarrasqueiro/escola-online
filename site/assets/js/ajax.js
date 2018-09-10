

var ajax = {

	call: function(url,type,model){

		var resp = $.ajax({
	    
		    url: url, 
		    type: type, 
		    contentType: 'application/json', 
		    data: JSON.stringify(model)

		});

		return resp;

	},

	GET: function(url,model){

		return ajax.call(url,'GET',model);

	},

	POST: function(url,model){

		return ajax.call(url,'POST',model);

	}

};
