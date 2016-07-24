angular.module('starter.controllers', [])

.controller('CadastrarOcorrenciaCtrl', function($scope, $state) {
	
	$scope.goToQrCodeState = function() {
		$state.go('^.^.qrCodeScanner');
	};

	$scope.goToGeolocalizacaoState = function() {
		$state.go('^.^.fotos');
	};
	
})

.controller('ListarOcorrenciasCtrl', function($scope, $state, Ocorrencias) {
	
	$scope.ocorrencias = Ocorrencias.all();
	
})

.controller('QrCodeScannerCtrl', function($scope, $state, Ocorrencias) {

	$scope.goToFotosState = function() {
		$state.go('^.fotos');
	};

})

.controller('FotosCtrl', function($scope, $state, Ocorrencias) {
	
	$scope.goToComentariosState = function() {
		$state.go('^.comentarios');
	};

})

.controller('ComentariosCtrl', function($scope, $state, Ocorrencias) {

	$scope.goToCadastrarOcorrenciaState = function() {
		$state.go('^.tab.cadastrarOcorrencia');
	};
		
})

.controller('DetalhesDaOcorrenciaCtrl', function($scope, $state, $stateParams, Ocorrencias) {
	  $scope.ocorrencia = Ocorrencias.get($stateParams.ocorrenciaId);
});
