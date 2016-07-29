angular.module('starter.controllers', [])

.controller('CadastrarOcorrenciaCtrl', function($scope, $state) {
	

	$scope.goToQrCodeState = function() {
		var qrCodeLocation = { 
			location: 'Banheiro 01 PV3, UFLA'
		}
		$state.go('^.^.qrCodeScanner', {location: qrCodeLocation});
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
