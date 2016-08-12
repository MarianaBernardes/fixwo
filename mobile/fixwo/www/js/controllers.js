angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('NavBackButtonCtrl', function($scope, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})

.controller('TabCadastrarOcorrenciaCtrl', function($scope, $state, $cordovaBarcodeScanner) {
	
	$scope.goToQrCodeState = function() {
	$cordovaBarcodeScanner.scan().then
	  (
	    function(imageData) {
				$state.go('^.^.cadastrarOcorrencia', {qrcode: imageData.text});
	      console.log("Barcode Format -> " + imageData.format);
	      console.log("Cancelled -> " + imageData.cancelled);
	    },
	    function(error) {
	      console.log("An error happened -> " + error);
	    }          
	  );
	}

	$scope.getCadOcorr = function(){
		var text = '{"location":"teste"}';
		$state.go('^.^.cadastrarOcorrencia', {qrcode : text} );
	}

	$scope.goToGeolocalizacaoState = function() {
		$state.go('^.^.fotos');
	};	
})

.controller('CadastrarOcorrenciaCtrl', function($scope, $state, $stateParams) {

	$scope.qrcodeJson = JSON.parse($state.params.qrcode);
	$scope.location = $scope.qrcodeJson.location;

	$scope.goToCadastrarOcorrenciaState = function() {
		$state.go('^.tab.cadastrarOcorrencia');
	};

	$scope.adicionarFoto = function() {
		console.log("Adicionar foto");
	};
})

.controller('ListarOcorrenciasCtrl', function($scope, $state, Ocorrencias) {

	$scope.ocorrencias = Ocorrencias.all();

	$scope.detalhesDaOcorrencia = function(ocorrId) {
		console.log(ocorrId);
		$state.go('^.^.detalhesDaOcorrencia', {ocorrenciaId : ocorrId});
	};

})

.controller('FotosCtrl', function($scope, $state) {
	
	$scope.goToComentariosState = function() {
		$state.go('^.comentarios');
	};

})

.controller('ComentariosCtrl', function($scope, $state) {

	$scope.goToCadastrarOcorrenciaState = function() {
		$state.go('^.tab.cadastrarOcorrencia');
	};
		
})


.controller('LoginCtrl', function($scope, $state) {

	$scope.usuario = { nome: null, cpf:null, email:null, senha: null};

	$scope.login = function() {
		console.log("nome: "+$scope.usuario.nome + ";cpf: "+$scope.usuario.cpf+
			";email: "+$scope.usuario.email+";senha: "+$scope.usuario.senha);
		$state.go('^.tab.cadastrarOcorrencia');
	};

	$scope.registrar = function() {
		$state.go('^.registrar');
	};
		
})

.controller('RegistrarCtrl', function($scope, $state) {

	$scope.usuario = { nome: null, cpf:null, email:null, senha: null};

	$scope.registrar = function() {
		console.log("nome: "+$scope.usuario.nome + ";cpf: "+$scope.usuario.cpf+
			";email: "+$scope.usuario.email+";senha: "+$scope.usuario.senha);
		$state.go('^.tab.cadastrarOcorrencia');
	};
		
})

.controller('DetalhesDaOcorrenciaCtrl', function($scope, $state, $stateParams, Ocorrencias) {
	console.log($state.params.ocorrenciaId);
	  $scope.ocorrencia = Ocorrencias.get($state.params.ocorrenciaId);
});
