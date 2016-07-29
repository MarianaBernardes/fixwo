var app = angular.module('fixWO', ['jsonService','searchMapJsonService']);

app.controller('Main', function($scope, JsonService) {
	  JsonService.get(function(data){
	    $scope.estado = data.estado;
	    $scope.cidades = data.cidades;
	  });
	});

app.controller('Mapa', function($scope, SearchMapJsonService) {
	SearchMapJsonService.get(function(search){
	    $scope.searchQuery = search.searchQuery;
	    $scope.locais = search.locais;
	  });
	});