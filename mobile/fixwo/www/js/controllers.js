angular.module('starter.controllers', [])

.controller('CadastrarOcorrenciaCtrl', function($scope, $state) {
	
	$scope.goToQrCodeState = function() {
		$state.go('^.^.qrCodeScanner');
	};

	$scope.goToGeolocalizacaoState = function() {
		$state.go('^.^.geolocalizacao');
	};
	
})

.controller('ListarOcorrenciasCtrl', function($scope, $state, Ocorrencias) {
	
	$scope.ocorrencias = Ocorrencias.all();
	
	
})

.controller('DetalhesDaOcorrenciaCtrl', function($scope, $state, $stateParams, Ocorrencias) {
	  $scope.ocorrencia = Ocorrencias.get($stateParams.ocorrenciaId);
});
