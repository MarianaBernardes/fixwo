

angular.module('jsonService', ['ngResource'])
.factory('JsonService', function($resource) {
  return $resource('data.json');
});

angular.module('searchMapJsonService', ['ngResource'])
.factory('SearchMapJsonService', function($resource) {
  return $resource('mapa.json');
});

angular.module('searchLocalJsonService', ['ngResource'])
.factory('SearchLocalJsonService', function($resource) {
  return $resource('local.json');
});

angular.module('searchOSJsonService', ['ngResource'])
.factory('SearchOSJsonService', function($resource) {
  return $resource('os.json');
});

angular.service('CommonService', function(){
	  this.value = '';
	});