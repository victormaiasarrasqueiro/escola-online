/*
* 
* ROUTE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO Categoria
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/
var express 			= require('express');		
var router 				= express.Router();
var Youtube             = require("youtube-api");

/*
* http.getAll
* Responsável por recuperar uma lista de Categorias.
*/

router.get('/video/:model_id', function(req, res) {

	Youtube.authenticate({
	    type: "key"
	  , key: "AIzaSyBqqemu9cyLCAZskvi0GCHsxVvyJnWCBIs"
	});

	var resposta = Youtube.videos.list({
        id: req.params.model_id,   
        part: "snippet,statistics,contentDetails,statistics",
        maxResults:1

    }, (err, data) => {
        res.json(data);
    });

});

/*
* http.getAll
* Responsável por recuperar uma lista de Categorias.
*/

router.get('/playlistitems/:model_id/page/:page', function(req, res) {
    
    console.log('PlaylistItems: ' + req.params.model_id);
    console.log('Page: ' + req.params.page);

    Youtube.authenticate({
        type: "key"
      , key: "AIzaSyBqqemu9cyLCAZskvi0GCHsxVvyJnWCBIs"
    });

    var json = {
        playlistId: req.params.model_id,   
        part: "id,snippet,contentDetails,status",
        maxResults:25
    };

    if(req.params.page != '0'){
        json.pageToken = req.params.page;
    }

    Youtube.playlistItems.list( json, (err, data) => {

        res.json(data);
        
    });

});



module.exports = router;
