var app3 = angular.module('fixQR', ['ngCordova']);

var app2 = angular.module('fixWOLogin', []);


var app = angular.module('fixWO', ['ngRoute']);

app.controller('Mapa', function($scope) {
	SearchMapJsonService.get(function(search){
	    $scope.searchQuery = search.searchQuery;
	    $scope.locais = search.locais;
	  });
	});

app.controller('Main', function($scope) {
	
	});

app.controller('OS', function($scope, $http) {
 	$scope.allOS = null;
 	$http.get("http://localhost:8080/ordemservico").then(function (response) {
 		$scope.allOS = response;
 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});
});

app.controller('BuscaOS', function($scope) {
	SearchMapJsonService.get(function(data){
		$scope.allOS=[];
	    if(data.local == busca) $scope.allOS.push(data);
	  });
	});

app2.controller('FormCtrlUser', function ($scope, $http) {
	$scope.postdata = function (login,senha,nome,email,tipo1,tipo2,tipo3,tipo4) {
	var data = {
	login: login,
	senha: senha,
	nome: nome,
	email: email,
	tipo1: tipo1,
	tipo2: tipo2,
	tipo3: tipo3,
	tipo4: tipo4,
	ativo: 1
	};
	//Call the services
	$http.post('http://localhost:8080/usuario', JSON.stringify(data)).then(function (response) {
	if (response.data)
	$scope.msg = "Post Data Submitted Successfully!";
	}, function (response) {
	$scope.msg = "Service not Exists";
	});
	window.location.assign("http://localhost/fixwoFrontEnd/WebContent/pages/login.html")
	};
});

app.controller('postserviceCtrl', function ($scope, $http) {
	$scope.descricao = null;
	$scope.postdata = function (descricao) {
	var data = {
	descricao: descricao,
	};
	//Call the services
	$http.post('http://posttestserver.com/post.php', JSON.stringify(data)).then(function (response) {
	if (response.data)
	$scope.msg = "Post Data Submitted Successfully!";
	}, function (response) {
	$scope.msg = "Service not Exists";
	$scope.statusval = response.status;
	$scope.statustext = response.statusText;
	$scope.headers = response.headers();
	});
	};
});
    
app.controller('pageRedirect', function ($location, $scope) {
    $scope.goTo = function (page) {
        $location.path('/' + page);
    };
});

app.config(function($routeProvider) {
	$routeProvider
    // Set defualt view of our app to home
     
    .when('/', {
    	controller: 'Main',
        templateUrl : 'pages/homeCliente.html'
    })
    
    .when('/homeUser', {
    	controller: 'Main',
        templateUrl : 'pages/homeUser.html'
    })

    .when('/reclamacoes', {
    	controller: 'Main',
        templateUrl : 'pages/listaReclamacoesCliente.html'
    })

    .when('/cadastrar', {
    	controller: 'Main',
        templateUrl : 'pages/cadastrarUsuario.html'
    })

	.when('/cadastrarLocal', {
		controller: 'Main',
        templateUrl : 'pages/cadastrarLocal.html'
    })
    
    .when('/mapa', {
    	controller: 'Main',
        templateUrl : 'pages/mapa.html',
    })
    
    .when('/OSListaCliente', {
    	controller: 'Main',
        templateUrl : 'pages/listaReclamacoesCliente.html',
    })
    
    .when('/OSListaUSer', {
    	controller: 'Main',
        templateUrl : 'pages/listaReclamacoesUser.html',
    })
    
    .when('/imprimirQR', {
    	controller: 'Main',
        templateUrl : 'pages/imprimirQRCode.html',
    })
    
    .when('/OSCliente', {
    	controller: 'Main',
        templateUrl : 'pages/reclamacaoCliente.html',
    })
    
    .when('/OSUser', {
    	controller: 'Main',
        templateUrl : 'pages/reclamacaoUser.html',
    })
    
    .when('/buscaOSCliente', {
    	controller: 'Main',
        templateUrl : 'pages/buscaReclamacoesCliente.html',
    })
    
    .when('/buscaOSUser', {
    	controller: 'Main',
        templateUrl : 'pages/buscaReclamacoesUser.html',
    });
});

app.factory('QRCode', function() {
	 var savedData = {}
	 function set(data) {
	   local = data;
	 }
	 function get() {
	  return local;
	 }

	 return {
	  set: set,
	  get: get
	 }

});

app.controller('generatedQRCode', function ($scope, QRCode) {
    $scope.local = QRCode.get();
    
    $scope.printIt = function(){
 	   var table = document.getElementById('printArea').innerHTML;
 	   var myWindow = $window.open('', '', 'width=800, height=600');
 	   myWindow.document.write(table);
 	   myWindow.print();
 };

});

app.controller('imprimirQRCode', function ($scope, SearchLocalJsonService, QRCode){
    $scope.locQRCode=[];
    SearchLocalJsonService.get(function(data){
    $scope.localQR=data;
    });
       
    $scope.changedValue=function(item){
    	//QRCode.set(item);
    	$scope.locQRCode.push(item.name);
    }    
    
    $scope.printIt = function(){
  	   var table = document.getElementById('printArea').innerHTML;
  	   var myWindow = $window.open('', '', 'width=800, height=600');
  	   myWindow.document.write(table);
  	   myWindow.print();
    }
});

app3.directive('qrcode', ['$window', function($window) {

    var canvas2D = !!$window.CanvasRenderingContext2D,
        levels = {
          'L': 'Low',
          'M': 'Medium',
          'Q': 'Quartile',
          'H': 'High'
        },
        draw = function(context, qr, modules, tile) {
          for (var row = 0; row < modules; row++) {
            for (var col = 0; col < modules; col++) {
              var w = (Math.ceil((col + 1) * tile) - Math.floor(col * tile)),
                  h = (Math.ceil((row + 1) * tile) - Math.floor(row * tile));

              context.fillStyle = qr.isDark(row, col) ? '#000' : '#fff';
              context.fillRect(Math.round(col * tile),
                               Math.round(row * tile), w, h);
            }
          }
        };

    return {
      restrict: 'E',
      template: '<canvas class="qrcode"></canvas>',
      link: function(scope, element, attrs) {
        var domElement = element[0],
            $canvas = element.find('canvas'),
            canvas = $canvas[0],
            context = canvas2D ? canvas.getContext('2d') : null,
            download = 'download' in attrs,
            href = attrs.href,
            link = download || href ? document.createElement('a') : '',
            trim = /^\s+|\s+$/g,
            error,
            version,
            errorCorrectionLevel,
            data,
            size,
            modules,
            tile,
            qr,
            $img,
            setVersion = function(value) {
              version = Math.max(1, Math.min(parseInt(value, 10), 10)) || 4;
            },
            setErrorCorrectionLevel = function(value) {
              errorCorrectionLevel = value in levels ? value : 'M';
            },
            setData = function(value) {
              if (!value) {
                return;
              }

              data = value.replace(trim, '');
              qr = qrcode(version, errorCorrectionLevel);
              qr.addData(data);

              try {
                qr.make();
              } catch(e) {
                error = e.message;
                return;
              }

              error = false;
              modules = qr.getModuleCount();
            },
            setSize = function(value) {
              size = parseInt(value, 10) || modules * 2;
              tile = size / modules;
              canvas.width = canvas.height = size;
            },
            render = function() {
              if (!qr) {
                return;
              }

              if (error) {
                if (link) {
                  link.removeAttribute('download');
                  link.title = '';
                  link.href = '#_';
                }
                if (!canvas2D) {
                  domElement.innerHTML = '<img src width="' + size + '"' +
                                         'height="' + size + '"' +
                                         'class="qrcode">';
                }
                scope.$emit('qrcode:error', error);
                return;
              }

              if (download) {
                domElement.download = 'qrcode.png';
                domElement.title = 'Download QR code';
              }

              if (canvas2D) {
                draw(context, qr, modules, tile);

                if (download) {
                  domElement.href = canvas.toDataURL('image/png');
                  return;
                }
              } else {
                domElement.innerHTML = qr.createImgTag(tile, 0);
                $img = element.find('img');
                $img.addClass('qrcode');

                if (download) {
                  domElement.href = $img[0].src;
                  return;
                }
              }

              if (href) {
                domElement.href = href;
              }
            };

        if (link) {
          link.className = 'qrcode-link';
          $canvas.wrap(link);
          domElement = link;
        }

        setVersion(attrs.version);
        setErrorCorrectionLevel(attrs.errorCorrectionLevel);
        setSize(attrs.size);

        attrs.$observe('version', function(value) {
          if (!value) {
            return;
          }

          setVersion(value);
          setData(data);
          setSize(size);
          render();
        });

        attrs.$observe('errorCorrectionLevel', function(value) {
          if (!value) {
            return;
          }

          setErrorCorrectionLevel(value);
          setData(data);
          setSize(size);
          render();
        });

        attrs.$observe('data', function(value) {
          if (!value) {
            return;
          }

          setData(value);
          setSize(size);
          render();
        });

        attrs.$observe('size', function(value) {
          if (!value) {
            return;
          }

          setSize(value);
          render();
        });

        attrs.$observe('href', function(value) {
          if (!value) {
            return;
          }

          href = value;
          render();
        });
      }
    };
  }]);
