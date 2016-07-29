angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('CadastrarOcorrenciaCtrl', function($scope, $state, $cordovaBarcodeScanner) {
	
	$scope.goToQrCodeState = function() {
	$cordovaBarcodeScanner.scan().then
        (
          function(imageData) {
           	var qrcode_text = { location : imageData.text }
						$state.go('^.^.qrCodeScanner', {location: qrcode_text});
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
          },
          function(error) {
            console.log("An error happened -> " + error);
          }
          
        );	

	}

	$scope.goToGeolocalizacaoState = function() {
		$state.go('^.^.fotos');
	};

	
})

.controller('ListarOcorrenciasCtrl', function($scope, $state, Ocorrencias) {
	
	$scope.ocorrencias = Ocorrencias.all();
	
})

.controller('QrCodeScannerCtrl', function($scope, $state, $stateParams) {

	$scope.location = $state.params.location.location;

	$scope.goToFotosState = function() {
		$state.go('^.fotos');
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

	$scope.login = function() {
		$state.go('^.tab.cadastrarOcorrencia');
	};

	$scope.registrar = function() {
		$state.go('^.registrar');
	};
		
})

.controller('RegistrarCtrl', function($scope, $state) {

	$scope.registrar = function() {
		$state.go('^.tab.cadastrarOcorrencia');
	};
		
})

.controller('DetalhesDaOcorrenciaCtrl', function($scope, $state, $stateParams, Ocorrencias) {
	  $scope.ocorrencia = Ocorrencias.get($stateParams.ocorrenciaId);
});
