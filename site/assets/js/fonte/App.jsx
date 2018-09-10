

var CursoBody = React.createClass({
  
  	render: function() {
    	
    	return (

	    	<div className="caption">
          <p className="thumbtitle">{this.props.data.nm}</p>
          <p className="thumbprof">Professor Victor</p>
          <p className="thumbprof">{this.props.data.vis} visualizações</p>
	    	</div>
      
    	);
	}
  
});

var CursoImagem = React.createClass({
  
	render: function() {

      var url = "https://i.ytimg.com/vi/" + this.props.idImg + "/mqdefault.jpg";
          
    	return (
     		<img className="img-responsive" src={url}  alt="Clique para acessar o curso"/>
    	);
  	}
  
});


var CursoColuna = React.createClass({
  
	render: function() {
    	
    	return (
      
        <div className="col-sm-6 col-md-3">

          <div className="thumbnail">

            <CursoImagem idImg={this.props.data.vid} />
            <CursoBody data={this.props.data} />

          </div>

    		</div>

    	);
  	}
  
});

var SliderItem = React.createClass({
  
  render: function() {
      
      return (
        <div className="sliderItem" >
          <div className="row">

              <CursoColuna data={this.props.curso0} />
              <CursoColuna data={this.props.curso1} />
              <CursoColuna data={this.props.curso2} />
              <CursoColuna data={this.props.curso3} />

          </div>
        </div>

      );
    }
  
});

var Sessao = React.createClass({

	render: function() {

      var idBottomRight = "bottomRight-" + this.props.idCat;
      var idBottomLeft  = "bottomLeft-"  + this.props.idCat;

      var sliderItems = [];
      var cursos = [];

      for (var i = 0; i < this.props.data.content.cursos.length; i++) {

        cursos.push(this.props.data.content.cursos[i]);
        
        if(cursos.length == 4){

          this.inserir(i);

          var idItem =  'item:' + this.state.idCat + '-' + {i};

          sliderItems.push(<SliderItem key={i} id={idItem} curso0={cursos[0]} curso1={cursos[1]} curso2={cursos[2]} curso3={cursos[3]} />);
          cursos = [];

        };     
        
      };

      this.setPageAtual(this.state.atual);
   
    	return (
    		
        <div className="sessao">

          <div className="row">

            <div className="col-sm-10 col-md-10" style={{marginTop: 20, marginBottom: 5, fontSize: 14, fontFamily: '"Roboto",arial,sans-serif', whiteSpace: 'normal', verticalAlign: 'middle' }} >

              {this.props.data.nmCat}
              
            </div>

            <div className="col-sm-2 col-md-2" style={{marginTop: 21, fontSize: 14, fontFamily: '"Roboto",arial,sans-serif', whiteSpace: 'normal', verticalAlign: 'middle' }} >

              <div id={idBottomRight} className="sessao-button-right" data-toggle="tooltip" data-placement="top" title="Próximo" onClick={this.goToRight}><span className="glyphicon glyphicon-triangle-right"></span></div>
              <div id={idBottomLeft} className="sessao-button-left" data-toggle="tooltip" data-placement="top" title="Anterior" onClick={this.goToLeft}><span className="glyphicon glyphicon-triangle-left"></span></div>
               
            </div>

          </div>

          <div className="container-sessao">

            <div className="container-sessao-body">

              <div className="slider">
      	  		
                  {sliderItems}

              </div>
            
            </div>

          </div>

  			</div>

    	);
  	}
  
});


var AreaSessoes = React.createClass({
  

	render: function() {


      var sessoes = [];
      for (var i = 0; i < this.props.json.lista.length; i++) {

        sessoes.push(<Sessao key={i} indice={i} data={this.props.json.lista[i]} />);
      }
    	
    	return (

		 	<div className="row" style={{marginTop: 10}}>
      			
      			<div className="col-sm-12 col-md-12 col-lg-12" style={{backgroundColor: 'white', borderBottom: '1px solid #e2e2e2'}}>
      				
              {sessoes}
   
      			</div>

  			</div>

    	);
  	}
  
});


var ItemMenuLateral = React.createClass({
  
  render: function() {

      var link = "http://localhost:8080/categoria/" + this.props.data.idCat;
      
      return (
      
        <li><a href={link}><span className="glyphicon glyphicon-stop"></span> {this.props.data.nmCat}<span className="badge badge-sidebar">42</span></a></li>

      );
    }
  
});


var MenuLateral = React.createClass({
  

  render: function() {


      var sessoes = [];
      for (var i = 0; i < this.props.json.lista.length; i++) {

        sessoes.push(<ItemMenuLateral key={i} data={this.props.json.lista[i]} />);
      }
      
      return (

        <ul className="nav nav-sidebar">
      
              {sessoes}
   
        </ul>


      );
    }
  
});
  


