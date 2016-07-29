angular.module('jsonService', ['ngResource'])
.factory('JsonService', function($resource) {
  return $resource('data.json');
});

angular.module('searchMapJsonService', ['ngResource'])
.factory('SearchMapJsonService', function($resource) {
  return $resource('search.json');
});