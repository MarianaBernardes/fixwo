angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('NavBackButtonCtrl', function($scope, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})

.controller('TabCadastrarOcorrenciaCtrl', function($scope, $state, $cordovaBarcodeScanner) {
	
	$scope.goToQrCodeState = function() {
		// leio qrcode e em seguida
		$cordovaBarcodeScanner.scan().then(
			function(imageData) {
				$scope.lat = null;
				$scope.lon = null;
				// tento converter dados do qrcode objeto javascript (json lido :) )
				try {
					$scope.qrcodeJson = JSON.parse($state.params.qrcode);
				}
				catch(e) {
				// mostra erro e termina
				alert(e.message);
				return;
				}
				finally {
					// recupero localização do qrcode
					$scope.location = $scope.qrcodeJson.location;
					$state.go('^.^.cadastrarOcorrencia', {qrcode: imageData.text});

					console.log("Barcode Format -> " + imageData.format);
					console.log("Cancelled -> " + imageData.cancelled);
					},
					function(error) {
						alert("An error happened -> " + error.message);
						console.log("An error happened -> " + error);
					}          
				}
			);
	}

	//$scope.goToGeolocationState

	$scope.getCadOcorr = function(){
		var text = '{"location":"teste"}';
		$state.go('^.^.cadastrarOcorrencia', {qrcode : text} );
	}

})

.controller('CadastrarOcorrenciaCtrl', function($scope, $state, $cordovaCamera, $stateParams) {
	$scope.fotos = [];

	$scope.goToCadastrarOcorrenciaState = function() {
		$state.go('^.tab.cadastrarOcorrencia');
	};

	$scope.adicionarFoto = function() {
		var cameraOptions = {
	      quality: 80,
	      destinationType: 1,
	      allowEdit: false,
	      correctOrientation: true
	    };
	    document.addEventListener(
	    	"deviceready",   
	      	function () {
	        	$cordovaCamera.getPicture(cameraOptions).then(
	        		function (imageURI) {
	          			$scope.fotos.push(imageURI);
	      			}, 
	      			function(error) {
	      				alert(error.message);
	      			}
	    		)
			}, false
		);
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
