var app2 = angular.module('fixWOLogin', []);

var app = angular.module('fixWO', ['ngRoute']);

app.service('clienteIDService', function() {
	  var clienteID = null;

	  var setID = function(newObj) {
	      clienteID = newObj;
	  };

	  var getID = function(){
	      return clienteID;
	  };

	  return {
	    setID: setID,
	    getID: getID
	  };

	});

app.service('osIDService', function() {
	  var osID = null;

	  var setOSID = function(newObj) {
	      osID = newObj;
	  };

	  var getOSID = function(){
	      return osID;
	  };

	  return {
	    setOSID: setOSID,
	    getOSID: getOSID
	  };

	});


app.controller('Mapa', function($scope) {
	SearchMapJsonService.get(function(search){
	    $scope.searchQuery = search.searchQuery;
	    $scope.locais = search.locais;
	  });
	});

app.controller('Main', function($scope) {
	
	});

app.controller('loginCtrl', function($scope, $http, clienteIDService) {
 	$scope.myData = null;
	$scope.getLogin = function (txtUsuario,txtPassword) {
		$http.get("http://localhost:8080/usuario").then(function (response) {
      		var x=1;
      		
      		angular.forEach(response, function(item){
                   if(item.login == txtUsuario){
                   	if(item.hashSenha == txtPassword){
                   		clienteIDService.setID(item.id);
                   		if(1 in item.grupo){
                   			window.location.assign("http://localhost/fixwoFrontEnd/WebContent/User.html")
      						x=0;
      					}else if(2 in item.grupo){
      						if(3 in item.grupo){
      							window.location.assign("http://localhost/fixwoFrontEnd/WebContent/CliTriador.html")
      							x=0;
      						}
      						else if(4 in item.grupo){
      							window.location.assign("http://localhost/fixwoFrontEnd/WebContent/CliResponsavel.html")
      							x=0;
      						}
      						else{
								window.location.assign("http://localhost/fixwoFrontEnd/WebContent/Cliente.html")
      							x=0;      						
      						}
      					}else if(3 in item.grupo){
      							window.location.assign("http://localhost/fixwoFrontEnd/WebContent/pages/atividadesTriador2.html")
      							x=0;
      					}
      					else if(4 in item.grupo){
      						window.location.assign("http://localhost/fixwoFrontEnd/WebContent/pages/atividades2.html")
      						x=0;
      					}else{
      						window.location.assign("http://localhost/fixwoFrontEnd/WebContent/Cliente.html")
      						x=0;
      					}
      				 }
      				}
      			});
      		if(x == 1){
      			//$scope.myData = "Dados incorretos";
      		}
  		},function(response) {
      	//Second function handles error
      	$scope.myData = "Não foi possível conectar ao servidor";
  		});
  		};
	});


app2.controller('FormCtrlUser', function ($scope, $http) {
	$scope.postdata = function (login,senha,nome,email,tipo1,tipo2,tipo3,tipo4) {
	if(tipo1!='' && tipo2!='' && tipo3!='' && tipo4!=''){
		var data = {
				login: login,
				senha: senha,
				nome: nome,
				email: email,
				grupo: [
				        {
				        	id: tipo1
				        },
				        {
				        	id: tipo2
				        },
				        {
				        	id: tipo3
				        },
				        {
				        	id: tipo4
				        }
				],
				ativo: 1
				};
		}else if(tipo1!='' && tipo2!='' && tipo3!='' && tipo4==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo1
					        },
					        {
					        	id: tipo2
					        },
					        {
					        	id: tipo3
					        }
					],
					ativo: 1
				};
		}else if(tipo1!='' && tipo2=='' && tipo3!='' && tipo4==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo1
					        },
					        {
					        	id: tipo3
					        },
					        {
					        	id: tipo4
					        }
					],
					ativo: 1
				};
		}else if(tipo1!='' && tipo2!='' && tipo3=='' && tipo4==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo1
					        },
					        {
					        	id: tipo2
					        },
					        {
					        	id: tipo4
					        }
					],
					ativo: 1
				};
		}else if(tipo1!='' && tipo2!='' && tipo3=='' && tipo4==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo1
					        },
					        {
					        	id: tipo2
					        }
					      
					],
					ativo: 1
				};
		}else if(tipo1!='' && tipo3!='' && tipo2=='' && tipo4==''){
				var data = {
						login: login,
						senha: senha,
						nome: nome,
						email: email,
						grupo: [
						        {
						        	id: tipo1
						        },
						        {
						        	id: tipo3
						        }
						      
						],
						ativo: 1
				};
		}else if(tipo1!='' && tipo4!='' && tipo2=='' && tipo3==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo1
					        },
					        {
					        	id: tipo4
					        }
					      
					],
					ativo: 1
				};
		}else if(tipo1!='' && tipo2=='' && tipo3=='' && tipo4==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo1
					        }
					],
					ativo: 1
				};
		}else if(tipo2!='' && tipo4!='' && tipo3=='' && tipo1==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo2
					        },
					        {
					        	id: tipo4
					        }
					],
					ativo: 1
				};
		}else if(tipo2!='' && tipo3!='' && tipo4=='' && tipo1==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo2
					        },
					        {
					        	id: tipo3
					        }
					],
					ativo: 1
				};
		}else if(tipo2!='' && tipo3!='' && tipo4!='' && tipo1==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo2
					        },
					        {
					        	id: tipo3
					        },
					        {
					        	id: tipo4
					        }
					],
					ativo: 1
				};
		}else if(tipo2!='' && tipo3=='' && tipo4=='' && tipo1==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo2
					        }
					],
					ativo: 1
				};
		}else if(tipo3!='' && tipo4!='' && tipo2=='' && tipo1==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo3
					        },
					        {
					        	id: tipo4
					        }
					],
					ativo: 1
				};
		}else if(tipo3!='' && tipo4=='' && tipo2=='' && tipo1==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo3
					        }
					],
					ativo: 1
				};
		}
		else if(tipo3=='' && tipo4!='' && tipo2=='' && tipo1==''){
			var data = {
					login: login,
					senha: senha,
					nome: nome,
					email: email,
					grupo: [
					        {
					        	id: tipo4
					        }
					],
					ativo: 1
				};
		}
	
	
	//Call the services
	$http.post('http://localhost:8080/usuario', JSON.stringify(data)).then(function (response) {
	if (response.data)
	$scope.msg = "Post Data Submitted Successfully!";
	}, function (response) {
	$scope.msg = "Service not Exists";
	});
	
	if(tipo2!=''){
		var data2 = {
				nome: nome
		};
		
		$http.post('http://localhost:8080/cliente', JSON.stringify(data2)).then(function (response) {
			if (response.data)
			$scope.msg = "Post Data Submitted Successfully!";
			}, function (response) {
			$scope.msg = "Service not Exists";
			});
	}

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
        templateUrl : 'pages/HomeCliente.html'
    })
    
    .when('/homeUser', {
    	controller: 'Main',
        templateUrl : 'pages/HomeUser.html'
    })
    
    .when('/homeCliTriador', {
    	controller: 'Main',
        templateUrl : 'pages/HomeCliTriador.html'
    })
    
    .when('/homeCliResponsavel', {
    	controller: 'Main',
        templateUrl : 'pages/HomeCliResponsavel.html'
    })
    
    .when('/mapa', {
    	controller: 'Main',
        templateUrl : 'pages/mapa.html',
    })
    
    .when('/reclamacoes', {
    	controller: 'OS',
        templateUrl : 'pages/listaReclamacoesCliente.html',
    })
    
    .when('/reclamacoesUser', {
    	controller: 'OSUser',
        templateUrl : 'pages/listaReclamacoesUser.html'
    })
    
    .when('/reclamacaoCliente', {
    	controller: 'Reclamacao',
        templateUrl : 'pages/reclamacaoCliente.html',
    })
    
    .when('/reclamacaoUser', {
    	controller: 'ReclamacaoUser',
        templateUrl : 'pages/reclamacaoUser.html',
    })
    
    .when('/atividadesTriador', {
    	controller: 'AtividadesTriador',
        templateUrl : 'pages/atividadesTriador.html'
    })
    
    .when('/atividades', {
    	controller: 'Atividades',
        templateUrl : 'pages/atividades.html'
    })
    
    .when('/buscaOSCliente', {
    	controller: 'Main',
        templateUrl : 'pages/buscaReclamacoesCliente.html',
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

app.controller('OS', function($scope, $http, $location, clienteIDService, osIDService) {
 	$scope.allOS = null;
 	
 	var OSs = [];
 	var OSs2 = [];
 	var id = clienteIDService.getID();
 	
 	$http.get("http://localhost:8080/ordemservico").then(function (response) {
 		
 		angular.forEach(response, function(item){
            if(item.cliente == id){
            	OSs.push(item);
            }
 		});
 		$scope.allOS = OSs;
 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});
 	
 	$scope.redirOS = function (id) {
 		osIDService.setOSID(id);
 		$location.path('reclamacaoCliente');
 	};
 	
 	$scope.busca = function (value) {
 			var localID = 0;
 			$http.get("http://localhost:8080/local").then(function (response) {
 		 		
 		 		angular.forEach(response, function(item){
 		            if(item.descricao == value){
 		            	localID = item.id;
 		            }
 		 		});
 		 		
 		 		angular.forEach(OSs, function(item2){
 		            if(item2.local == localID){
 		            	OSs2.push(item2);
 		            }
 		 		});
 		 		
 		 		$scope.allOS = OSs2;
 		 	},function(response) {
 		 		      //Second function handles error
 		 		      $scope.myData = "Something went wrong";
 		 	});
 			
 	};
 	
});

app.controller('OSUSer', function($scope, $http, $location, clienteIDService, osIDService) {
 	$scope.allOS = null;
 	
 	var OSs = [];
 	var id = clienteIDService.getID();
 	
 	$http.get("http://localhost:8080/ordemservico").then(function (response) {
 		
 		angular.forEach(response, function(item){
            if(item.cliente == id){
            	OSs.push(item);
            }
 		});
 		$scope.allOS = OSs;
 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});
 	
 	$scope.redirOS = function (id) {
 		osIDService.setOSID(id);
 		$location.path('/reclamacaoUser');
 	};
 	
 	$scope.busca = function (value) {
			var localID = 0;
			$http.get("http://localhost:8080/local").then(function (response) {
		 		
		 		angular.forEach(response, function(item){
		            if(item.descricao == value){
		            	localID = item.id;
		            }
		 		});
		 		
		 		angular.forEach(OSs, function(item2){
		            if(item2.local == localID){
		            	OSs2.push(item2);
		            }
		 		});
		 		
		 		$scope.allOS = OSs2;
		 	},function(response) {
		 		      //Second function handles error
		 		      $scope.myData = "Something went wrong";
		 	});
			
	};
 	
});

app.controller('Reclamacao', function($scope, $http, osIDService) {
 	$scope.allOS = null;
 	
 	var OSs = [];
 	var idOS = osIDService.getOSID();
 	var user = null;
 	var comentarios = [];
 	var user_comentarios = [];
 	
 	$http.get("http://localhost:8080/ordemservico").then(function (response) {
 		
 		angular.forEach(response, function(item){
            if(item.id == idOS){
            	OSs.push(item);
            }
 		});
 		
 		$scope.results = OSs;
 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});
 	
 	$http.get("http://localhost:8080/comentario").then(function (response) {
 		
 		angular.forEach(response, function(item4){
 			angular.forEach(OSs, function(item5){
 				if(item4.ordemServico == item5.id){
 					comentarios.push(item4);
 				}
 			});
 		});
 		
 		$scope.comentarios = comentarios;
 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});
 	
$http.get("http://localhost:8080/usuario").then(function (response) {
 		
 		angular.forEach(response, function(item2){
 			angular.forEach(OSs, function(item3){
 				if(item2.id == item3.solicitante){
 					user = item2.nome;
 				}
 			});
 			
 			angular.forEach(comentarios, function(item6){
 				if(item2.id == item6.usuario){
 					item6.usuario= item2.nome;
 					user_comentarios.push(item6);
 				}
 			});
 			
 		});
 		
 		$scope.usuario = user;
 		$scope.user_comentarios = user_comentarios;
 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});

	angular.forEach(response, function(item2){
		angular.forEach(OSs, function(item3){
			if(item2.id == item3.solicitante){
				user = item2.nome;
			}
		});
	});
	
	$scope.results = OSs;
	$scope.usuario = OSs;
 	
 	$scope.putdata = function (comment) {
 		var data = {
				status: Concluido,
				avaliacao: true,
				feedback: comment
				};
 		
 		$http.put('http://localhost:8080/ordemservico/'+idOS, JSON.stringify(data)).then(function (response) {
 			if (response.data)
 				$scope.msg = "Post Data Submitted Successfully!";
 			}, function (response) {
 			$scope.msg = "Service not Exists";
 			});
 	};

});

app.controller('Atividades', function($scope, $http, $location, clienteIDService, osIDService) {
 	$scope.atividades = null;
 	
 	var OSs = [];
 	var Seto = [];
 	var id = clienteIDService.getID();
 	
 	$http.get("http://localhost:8080/setor").then(function (response) {
 		
 		angular.forEach(response, function(item){
 			Seto.push(item);
 		});

 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});
 	
 	$http.get("http://localhost:8080/ordemservico").then(function (response) {
 		
 		angular.forEach(response, function(item){
            if(item.avaliacao == false){
            	angular.forEach(Seto, function(item2){
         			if(item.setor == item2.id){
         				if(item2.responsavelSetor == id){
         					OSs.push(item);
         				}
         			}
         		});
            }
 		});
 		
 		$scope.atividades = OSs;
 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});
 	
 	$scope.redirOS = function (id) {
 		osIDService.setOSID(id);
 		$location.path('/reclamacaoCliente');
 	};
});

app.controller('AtividadesTrador', function($scope, $http, $location, clienteIDService, osIDService) {
 	$scope.atividades = null;
 	
 	var OSs = [];
 	var id = clienteIDService.getID();
 	
 	$http.get("http://localhost:8080/ordemservico").then(function (response) {
 		
 		angular.forEach(response, function(item){
            if(item.avaliacao == false){
            	OSs.push(item);
            }
 		});
 		$scope.atividades = OSs;
 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});
 	
 	$http.get("http://localhost:8080/setor").then(function (response) {
 		
 		$scope.setores = response;
 	},function(response) {
 		      //Second function handles error
 		      $scope.myData = "Something went wrong";
 	});
 	
 	$scope.defResp = function (setor_value, ativ) {
 		var data = {
				setor: setor_value.id,
				};
 		
 		$http.put('http://localhost:8080/ordemservico/'+ativ.id, JSON.stringify(data)).then(function (response) {
 			if (response.data)
 				$scope.msg = "Post Data Submitted Successfully!";
 			}, function (response) {
 			$scope.msg = "Service not Exists";
 			});
 	};
 	
});