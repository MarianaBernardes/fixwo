var appLogin = angular.module('fixWOLogin', []);
function controllerForm($scope, $http) {
      $scope.rsJSON = [ ];
      $scope.alertaLoginCorreto = true;
      $scope.alertaLoginErro    = true;
      $scope.entrar = function() {
        consultarUsuario($http,$scope);
      };
 }
  

  function consultarUsuario($http,$scope){
    $http.post('login/index.php',{ usuario : $scope.txtUsuario , password : $scope.txtPassword })
        .success(function(data) {
           if (typeof(data.usuario) == "undefined"){
             $scope.alertaLoginErro = false;   
             $scope.alertaLoginCorreto = true;   
             $scope.txtUsuario    = '';
             $scope.Password = '';   
           }else{
             $scope.rsJSON = data.usuario;
             $scope.alertaLoginCorreto = false;            
             $scope.alertaLoginErro = true;   
           }
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });   
        
  }

var app = angular.module('fixWO', ['jsonService','searchMapJsonService', 'searchLocalJsonService', 'ngRoute',
                                   'fixWO.login', 'ngCordova']);

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

app.controller('OS', function($scope, SearchOSJsonService) {
	SearchMapJsonService.get(function(data){
	    $scope.allOS = data;
	  });
	});

app.controller('BuscaOS', function($scope, SearchOSJsonService, busca) {
	SearchMapJsonService.get(function(data){
		$scope.allOS=[];
	    if(data.local == busca) $scope.allOS.push(data);
	  });
	});


app.controller('FormCtrlUser', function ($scope, $http) {
    
    $scope.data = {
        login: "default",
        senha: "default",
        nome: "default",
        email: "default",
        tipo: "default",
        profile_foto: "default"
    };
    $scope.submitForm = function() {
        console.log("Submetendo dados....");
        $http.post('http://localhost:8080/usuario', JSON.stringify(data)).success(function(){/*callback*/});
    };
});

app.controller('FormCtrlLocal', function ($scope, $http) {
    
    $scope.data = {
        descricao: "default",
        area: "default",
        cliente: $scope.usuario.login,
    };
    $scope.submitForm = function() {
        console.log("Submetendo dados....");
        $http.post('http://localhost:8080/local', JSON.stringify(data)).success(function(){/*callback*/});
    };
    QRCode($scope, SearchLocalJsonService);
});
    

app.controller('search', function(CommonService){
	  $scope.goToResult = function(searchBoxValue){
	    CommonService.value = searchBoxValue;
	    // Redirect to result view
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
     
    // route for the home page
    .when('/', {
        templateUrl : 'pages/homeCliente.html',
        controller  : 'mainController'
    })

    // route for the about page
    .when('/reclamacoes', {
        templateUrl : 'pages/listaReclamacoesCliente.html',
        controller  : 'mainController'
    })

    // route for the contact page
    .when('/mapa', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    })

	.when('/qrcode', {
        templateUrl : 'pages/imprimirQRCode.html',
        controller  : 'mainController'
    })
	
	.when('/logout', {
        templateUrl : 'pages/login.html',
        controller  : 'mainController'
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

app.directive('qrcode', ['$window', function($window) {

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
