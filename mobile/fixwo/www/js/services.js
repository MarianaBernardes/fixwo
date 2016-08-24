var IP = "177.105.60.127";
var PORTA = "8080";

var IP_TESTE = "192.168.56.1";
var PORTA_TESTE = "8081";

angular.module('starter.services', ['ionic','ngCordova', 'ngResource'])


.factory('Ocorrencias', function($cordovaSQLite) {
  // adicionando um de exemplo
  var ocorrencia = 
  {
    titulo:null,
    descricao:null,
    categoria:0,
    status:null,
    solicitante:$rootScope.usuario,
    fotos: new Uint8ClampedArray(1024),
    lat:$state.params.lat,
    lon:$state.params.lon,
    setor:null,
    local:$state.params.qrcode,
    feedback:null,
    avaliacao:false,
    tenancy:null,
    replica:null
  } 
  var values = [1,
  "Banheiro sempre sem papel higiênico!",
  "PV2-UFLA-LAVRAS-MG-BRASIL",
  "Aberto",
  "",
  "12/09/2016",
  "Esse banheiro SEMPRE fica sem papel higiênico!",
  "img/Wikipedia_mobile_en.png"];

  // inserir webservice para recuperação de dados aqui
  // inserindo ou atualizando banco
	// INSERT INTO TABLE ocorrencia (id, titulo, localizacao, estado, classificacao,
	// data, comentario, imagem) VALUES(?,?,?,?,?,?,?,?) 
	// ON DUPLICATE KEY UPDATE estado=?
	
  var query = "INSERT INTO ocorrencias VALUES (?,?,?,?,?,?,?,?)";

  	$cordovaSQLite.execute(db, query, values).then
  	(
  		function(res){},
  		function(error){
  			alert('erro no insert: '+error.message);
  		}
  	);

	var ocorrencias = [];

  return {

  	all: function() {
  		
  		$cordovaSQLite.execute(db, 'SELECT * FROM ocorrencias').then(
  			function(res){

  				for (var i = 0; i < res.rows.length; i++) {
  					ocorrencias.push(res.rows.item(i));
  				}
  			},
  			function(error) {
  				alert('erro no select: ' + error.message)
  			}
  		);
  		//alert(ocorrencias);
  		return ocorrencias;
  		//return $cordovaSQLite.execute(db, 'SELECT * FROM ocorrencias').rows;
  	},

    get: function(ocorrenciaID) {
        $cordovaSQLite.execute(db, 'SELECT * FROM ocorrencias').then(
        function(res){

          for (var i = 0; i < res.rows.length; i++) {
            ocorrencias.push(res.rows.item(i));
          }
        },
        function(error) {
          alert('erro no select: ' + error.message)
        }
        );
      for (var i = 0; i < ocorrencias.length; i++) {
        if (ocorrencias[i].id === parseInt(ocorrenciaID)) {
          return ocorrencias[i];
        }
      }
      return null;
    }

  }

})

.factory('ServiceFixwoREST', function($http) {


  return {

    registrarOcorrencia: function(ocorrencia) {
      var Ocorrencia = $resource("http://"+IP+":"+PORTA+"/fixwo/ocorrencia");
      var newOcorrencia = new Ocorrencia(ocorrencia);
      newOcorrencia.$save();
    },

    getUsuario: function(usuario) {
      var Usuario = $resource("http://"+IP+":"+PORTA+"/fixwo/usuario");
      return Usuario.get({login:usuario.login});
    },

    registrarUsuario: function(usuario) {
      var Usuario = $resource("http://"+IP+":"+PORTA+"/fixwo/usuario");
      var newUsuario = new Usuario(usuario);
      newUsuario.$save();
    },

    getOcorrencias: function(usuario) {
      var Ocorrencia = $resource("http://"+IP+":"+PORTA+"/fixwo/ocorrencia");
      return Ocorrencia.query({usuario:usuario});
    }

  }


})

.factory('ServiceFixwoHTTP', function($http) {

  var ocorrencia = {
    avaliacao:null,
    categoria:10,
    cliente:{id:10},
    descricao:"string",
    feedback:null,
    fotos:"[]",
    local:{id:10},
    lat:20.3,
    lon:20.2,
    setor:{id:10},
    solicitante:{id:3},
    status:0,
    titulo:"string"
  }

  return {

    registrarOcorrencia: function(ocorrencia) {
        return $http({ 
        url: "http://"+IP+":"+PORTA+"/fixwo/ocorrencia",
        method: "POST", 
        data: JSON.stringify(ocorrencia),
        headers: {"Content-Type": "application/json; charset=utf-8"}
      });
    },

    getUsuario: function(usuario) {
      return $http({ 
      url: "http://"+IP+":"+PORTA+"/fixwo/usuario",
      method: "GET", 
      parameters: {login:usuario.login},
      headers: {"Content-Type": "application/json; charset=utf-8"}
      });
    },

    registrarUsuario: function(usuario) {
      return $http({ 
      url: "http://"+IP+":"+PORTA+"/fixwo/usuario",
      method: "POST", 
      data: JSON.stringify(usuario),
      headers: {"Content-Type": "application/json; charset=utf-8"}
      });
    },

    getOcorrencias: function(usuario) {
      return $http({ 
      url: "http://"+IP+":"+PORTA+"/fixwo/ocorrencia",
      method: "GET", 
      parameters: {usuario: JSON.stringify(usuario)},
      headers: {"Content-Type": "application/json; charset=utf-8"}
      });
    }

  }

})


//Teste - aplicação
.factory('ServiceGLCMonitor', function($http) {

  return {

    getUsuario: function(usuario) {
      return $http({ 
        url: "http://"+IP_TESTE+":"+PORTA_TESTE+"/GLCMonitor/getUsuario.jsp",
        method: "POST", 
        data: JSON.stringify(usuario),
        headers: {"Content-Type": "application/json; charset=utf-8"}
      });
    }

  }

});
