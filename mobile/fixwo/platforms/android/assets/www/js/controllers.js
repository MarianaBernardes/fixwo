angular.module('starter.controllers', ['ionic','ngCordova'])

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

	$scope.goToFotosState = function() {
		$state.go('^.fotos');
	};
})

.controller('ListarOcorrenciasCtrl', function($scope, $state, Ocorrencias) {
	
	$scope.ocorrencias = Ocorrencias.all();
	
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
