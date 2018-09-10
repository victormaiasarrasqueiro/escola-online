

var CursoBody = React.createClass({displayName: "CursoBody",
  
  	render: function() {
    	
    	return (

	    	React.createElement("div", {className: "caption"}, 
          React.createElement("p", {className: "thumbtitle"}, this.props.data.nm), 
          React.createElement("p", {className: "thumbprof"}, "Professor Victor"), 
          React.createElement("p", {className: "thumbprof"}, this.props.data.vis, " visualizações")
	    	)
      
    	);
	}
  
});

var CursoImagem = React.createClass({displayName: "CursoImagem",
  
	render: function() {

      var url = "https://i.ytimg.com/vi/" + this.props.idImg + "/mqdefault.jpg";
          
    	return (
     		React.createElement("img", {className: "img-responsive", src: url, alt: "Clique para acessar o curso"})
    	);
  	}
  
});


var CursoColuna = React.createClass({displayName: "CursoColuna",
  
	render: function() {
    	
    	return (
      
        React.createElement("div", {className: "col-sm-6 col-md-3"}, 

          React.createElement("div", {className: "thumbnail"}, 

            React.createElement(CursoImagem, {idImg: this.props.data.vid}), 
            React.createElement(CursoBody, {data: this.props.data})

          )

    		)

    	);
  	}
  
});

var SliderItem = React.createClass({displayName: "SliderItem",
  
  render: function() {
      
      return (
        React.createElement("div", {className: "sliderItem"}, 
          React.createElement("div", {className: "row"}, 

              React.createElement(CursoColuna, {data: this.props.curso0}), 
              React.createElement(CursoColuna, {data: this.props.curso1}), 
              React.createElement(CursoColuna, {data: this.props.curso2}), 
              React.createElement(CursoColuna, {data: this.props.curso3})

          )
        )

      );
    }
  
});

var Sessao = React.createClass({displayName: "Sessao",
  
  getInitialState: function() {
    
    return {
      idCat : this.props.data.idCat,
      items : [],
      atual : 1
    };

  },

  hideAll:function(){

    for( var i = 0; i < this.state.items; i++){

      var e = document.getElementById('item:' + this.state.idCat + '-' + this.state.items[i]);
      e.style.disabled = true;

    }

  },

  goToLeft:function(){
    alert('esquerda' + this.state.atual);
  },

  goToRight:function(){
    alert('direita');
  },

  setPageAtual:function(i){

    var e = document.getElementById('item:' + this.state.idCat + '-' + i);

    alert(e);

    e.style.disabled = false;

  },

  inserir:function(r){

    this.setState({
      items: this.state.items.push(r)
    });

  },

	render: function() {

      var idBottomRight = "bottomRight-" + this.state.idCat;
      var idBottomLeft  = "bottomLeft-"  + this.state.idCat;

      var sliderItems = [];
      var cursos = [];

      for (var i = 0; i < this.props.data.content.cursos.length; i++) {

        cursos.push(this.props.data.content.cursos[i]);
        
        if(cursos.length == 4){

          this.inserir(i);

          var idItem =  'item:' + this.state.idCat + '-' + {i};

          sliderItems.push(React.createElement(SliderItem, {key: i, id: idItem, curso0: cursos[0], curso1: cursos[1], curso2: cursos[2], curso3: cursos[3]}));
          cursos = [];

        };     
        
      };

      this.setPageAtual(this.state.atual);
   
    	return (
    		
        React.createElement("div", {className: "sessao"}, 

          React.createElement("div", {className: "row"}, 

            React.createElement("div", {className: "col-sm-10 col-md-10", style: {marginTop: 20, marginBottom: 5, fontSize: 14, fontFamily: '"Roboto",arial,sans-serif', whiteSpace: 'normal', verticalAlign: 'middle'}}, 

              this.props.data.nmCat
              
            ), 

            React.createElement("div", {className: "col-sm-2 col-md-2", style: {marginTop: 21, fontSize: 14, fontFamily: '"Roboto",arial,sans-serif', whiteSpace: 'normal', verticalAlign: 'middle'}}, 

              React.createElement("div", {id: idBottomRight, className: "sessao-button-right", "data-toggle": "tooltip", "data-placement": "top", title: "Próximo", onClick: this.goToRight}, React.createElement("span", {className: "glyphicon glyphicon-triangle-right"})), 
              React.createElement("div", {id: idBottomLeft, className: "sessao-button-left", "data-toggle": "tooltip", "data-placement": "top", title: "Anterior", onClick: this.goToLeft}, React.createElement("span", {className: "glyphicon glyphicon-triangle-left"}))
               
            )

          ), 

          React.createElement("div", {className: "container-sessao"}, 

            React.createElement("div", {className: "container-sessao-body"}, 

              React.createElement("div", {className: "slider"}, 
      	  		
                  sliderItems

              )
            
            )

          )

  			)

    	);
  	}
  
});


var AreaSessoes = React.createClass({displayName: "AreaSessoes",
  

	render: function() {


      var sessoes = [];
      for (var i = 0; i < this.props.json.lista.length; i++) {

        sessoes.push(React.createElement(Sessao, {key: i, indice: i, data: this.props.json.lista[i]}));
      }
    	
    	return (

		 	React.createElement("div", {className: "row", style: {marginTop: 10}}, 
      			
      			React.createElement("div", {className: "col-sm-12 col-md-12 col-lg-12", style: {backgroundColor: 'white', borderBottom: '1px solid #e2e2e2'}}, 
      				
              sessoes
   
      			)

  			)

    	);
  	}
  
});


var ItemMenuLateral = React.createClass({displayName: "ItemMenuLateral",
  
  render: function() {

      var link = "http://localhost:8080/categoria/" + this.props.data.idCat;
      
      return (
      
        React.createElement("li", null, React.createElement("a", {href: link}, React.createElement("span", {className: "glyphicon glyphicon-stop"}), " ", this.props.data.nmCat, React.createElement("span", {className: "badge badge-sidebar"}, "42")))

      );
    }
  
});


var MenuLateral = React.createClass({displayName: "MenuLateral",
  

  render: function() {


      var sessoes = [];
      for (var i = 0; i < this.props.json.lista.length; i++) {

        sessoes.push(React.createElement(ItemMenuLateral, {key: i, data: this.props.json.lista[i]}));
      }
      
      return (

        React.createElement("ul", {className: "nav nav-sidebar"}, 
      
              sessoes
   
        )


      );
    }
  
});
  


