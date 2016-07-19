var app = angular.module('angularjs-starter', ['jsonService']);

app.controller('Main', function($scope, JsonService) {
  JsonService.get(function(data){
    $scope.estado = data.estado;
    $scope.cidades = data.cidades;
  });
});