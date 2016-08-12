angular.module('starter.services', ['ionic','ngCordova'])


.factory('Ocorrencias', function($cordovaSQLite) {
  // adicionando um de exemplo
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
  	}
  };
});
