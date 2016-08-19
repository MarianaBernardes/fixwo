var teste = "ola";
angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('NavBackButtonCtrl', function($scope, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})

.controller('TabCadastrarOcorrenciaCtrl', function($scope, $state, $cordovaBarcodeScanner) {

	$scope.readQrCode = function() {
		// leio qrcode e em seguida
		$cordovaBarcodeScanner.scan().then(
			function(imageData) {

				var qrcodetemp = JSON.parse(imageData.text);

				var params = {
					qrcode: qrcodetemp,
					location: qrcodetemp.location,
					lat: null,
					lon: null,
					option: 'qrcode'
				};//*/

				// recupero localização do qrcode
				$state.go('^.^.cadastrarOcorrencia', params);

				console.log("Barcode Format -> " + imageData.format);
				console.log("Cancelled -> " + imageData.cancelled);
				       
				},

				function(error) {
					alert("An error happened -> " + error.message);
					console.log("An error happened -> " + error);
				} 
			);
	}

	//$scope.goToGeolocationState

	$scope.readGeolocation = function(){
				var curlat = 0;
				var curlon = 0;

				var params = {
					qrcode: null,
					location: curlat.toString()+', '+curlon.toString(),
					lat: curlat,
					lon: curlon,
					option: 'geolocation'
				};

		$state.go('^.^.cadastrarOcorrencia', params);
	}

})

.controller('CadastrarOcorrenciaCtrl', function($scope, $state, $cordovaCamera) {
	$scope.qrcode 	= $state.params.qrcode;
	$scope.lon 			= $state.params.lon;
	$scope.lat			= $state.params.lat;
	$scope.location = $state.params.location;
	$scope.option = $state.params.qrcodeOrGeolocation;

	$scope.fotos = [];
	$scope.fotosFileEntry = [];


	function upload(fileEntry) {
	    // !! Assumes variable fileURL contains a valid URL to a text file on the device,
	    var fileURL = fileEntry.toURL();

	    var success = function (r) {
	        console.log("Successful upload...");
	        console.log("Code = " + r.responseCode);
	        displayFileData(fileEntry.fullPath + " (content uploaded to server)");
	    }

	    var fail = function (error) {
	        alert("An error has occurred: Code = " + error.code);
	    }

	    var options = new FileUploadOptions();
	    options.fileKey = "file";
	    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
	    options.mimeType = "image/jpeg";

	    var params = {};
	    params.value1 = "test";
	    params.value2 = "param";

	    options.params = params;

	    var ft = new FileTransfer();
	    // SERVER must be a URL that can handle the request, like
	    // http://some.server.com/upload.php
	    ft.upload(fileURL, encodeURI(SERVER), success, fail, options);
	};


	//Faz download de uma imagem de um servidor
	//remote file é o link da imagem
	function downloadFile(remoteFile) {
		document.addEventListener(
	    	"deviceready",   
	      	function () {
		        //var remoteFile = "http://xiostorage.com/wp-content/uploads/2015/10/test.png";
		        var uri = encodeURI(remoteFile);
		        var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
		        alert("Download ...");
		        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
		        	function(fileSystem) {
		        		alert('file system open: ' + fileSystem.name);
		            	fileSystem.root.getFile(localFileName, 
		            		{create: true, exclusive: false}, 
		            		function(fileEntry) {
		            			alert("fileEntry.name: " + fileEntry.name);
		                		var localPath = fileEntry.toURL();
		                		if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
		                    		localPath = localPath.substring(7);
		               			}
		               			alert(localPath);
		                		var ft = new FileTransfer();
		                		ft.download(uri, localPath,
		                			function(entry) {
		                				console.log("download complete: " + entry.fullPath);
		        						alert("download complete: " + entry.fullPath);
		                				$scope.fotos.push(entry.toURL());
		                        		// var dwnldImg = document.getElementById("dwnldImg");
		                        		// dwnldImg.src = entry.fullPath;
		                        		// dwnldImg.style.visibility = "visible";
		                        		// dwnldImg.style.display = "block";
		                    		}, function fail(error) { 
										console.log("download error source " + error.source);
								        alert("download error source " + error.source);
								        console.log("download error target " + error.target);
								        alert("download error target " + error.target);
								        console.log("upload error code" + error.code);
								        alert("upload error code" + error.code); 
									}
								);
		            		}, function fail(error) { 
								alert(error.code); 
							}
						);
		        	}, function fail(error) { 
						alert(error.code); 
					}
				);
			}, false
		);
    }


	function b64DecodeUnicode(str) {
	    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	    }).join(''));
	}


	$scope.goToCadastrarOcorrenciaState = function() {

	};

	$scope.adicionarFoto = function() {

		//upload(fileEntry);
		var cameraOptions = {
	      quality: 80,
	      destinationType: Camera.DestinationType.FILE_URI,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      encodingType: Camera.EncodingType.JPEG,
	      mediaType: Camera.MediaType.PICTURE,
	      targetWidth: 800,
	      targetHeight: 600,
	      allowEdit: false,
	      correctOrientation: true,
	      saveToPhotoAlbum: true
	    };

	    document.addEventListener(
	    	"deviceready",   
	      	function () {
	        	$cordovaCamera.getPicture(cameraOptions).then(	
	        		//Recupera a URL da foto
	        		function (imageUri) {
	        			//alert(imageUri);
	        			//Insere a url no vetor de urls 
	          			$scope.fotos.push(imageUri);
	        			//Acessa o sistema de arquivos de persistência
	          			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
	          				function (fs) {
								//alert('file system open: ' + fs);
								//Converte a URL da imagem em um File Entry
								window.resolveLocalFileSystemURL(imageUri, 
								    function success(fileEntry) {
								        //alert("got file: " + fileEntry.fullPath);
								        console.log("got file: " + fileEntry.fullPath);
								        //Copia a foto para o sistema de arquivos 
								        //de persistência do aplicativo
								        copyFileEntryTo(fileEntry, fs.root);
								        //Recupera o FileEntry da foto persistida
								        fs.root.getFile(fileEntry.name, 
										{ create: true, exclusive: false }, 
							    			function (newFileEntry) {
							    				//alert(newFileEntry.name);
							    				//Insere o FileEntry da foto persistida no
							    				//vetor de FileEntry
							    				$scope.fotosFileEntry.push(newFileEntry);
							    			}, function fail(error) { 
							    				alert(error.code); 
							    			}
							    		);
								    }, function (error) {
									    // If don't get the FileEntry (which may happen when testing
									    // on some emulators), copy to a new FileEntry.
									    alert(error.message);
									    //createNewFileEntry(imgUri);
								    }
								);
							}, function fail(error) { 
								alert(error.code); 
							}
						);
					}, function(error) {
	      				alert(error.message);
	      			}
	    		)
			}, false
		);

	}

	//Copia um arquivo para outro diretório
	function copyFileEntryTo(fileEntry, parentNewFileEntry) {
		function win(entry) {
		    console.log("New Path: " + entry.fullPath);
		    //alert("New Path: " + entry.fullPath);
		}

		function fail(error) {
		    alert(error.code);
		}
	    // copy the file to a new directory and rename it
	    fileEntry.copyTo(parentNewFileEntry, fileEntry.name, win, fail);
	}

	//Recebe um fileEntry e remove o arquivo
	function removeFile(fileEntry) {
		function success(fileEntry) {
    		console.log("Removal succeeded");
    		alert("Removal succeeded");
		}
		function fail(error) {
    		alert('Error removing file: ' + error.code);
		}
		// remove the file
		entry.remove(success, fail);
	}

	//Recebe um fileEntry e um objeto e escreve este objeto no arquivo.
	function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (image.jpeg).
	    fileEntry.createWriter(
	    	function (fileWriter) {
				fileWriter.onwriteend = function() {
		        	alert("Successful file write...");
		        	console.log("Successful file write...");
		            readFile(fileEntry);
		        };
		        fileWriter.onerror = function (e) {
		        	alert("Failed file write: " + e.toString());
		            console.log("Failed file write: " + e.toString());
		        };
		        // If data object is not passed in,
		        // create a new Blob instead.
		        if (!dataObj) {
		            dataObj = new Blob(['some file data'], { type: 'text/plain' });
		        }
		        fileWriter.write(dataObj);
	    	}
	    );
	}

	function getFileEntry(imgUri) {
		var fileEntryReturn = null;
		document.addEventListener("deviceready", onDeviceReady, false);

		function onDeviceReady() {
		    window.resolveLocalFileSystemURL(imgUri, 
			    function success(fileEntry) {
			        // Do something with the FileEntry object, like write to it, upload it, etc.
			        //writeFile(fileEntry, imgUri);
			        alert("got file: " + fileEntry.fullPath);
			        console.log("got file: " + fileEntry.fullPath);
			        fileEntryReturn = fileEntry;
			        // displayFileData(fileEntry.nativeURL, "Native URL");
			    }, function (error) {
				    // If don't get the FileEntry (which may happen when testing
				    // on some emulators), copy to a new FileEntry.
				    alert(error.message);
				    //return null;
				    //createNewFileEntry(imgUri);
			    }
			);
		}

		return fileEntryReturn;
	}

	function createNewFileEntry(imgUri) {
		document.addEventListener("deviceready", onDeviceReady, false);

		function onDeviceReady() {
	   		window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, 
		    	function success(dirEntry) {
			        // JPEG file
			        dirEntry.getFile("tempFile.jpeg", 
			        	{ create: true, exclusive: false }, 
			        	function (fileEntry) {
			            	// Do something with it, like write to it, upload it, etc.
			            	// writeFile(fileEntry, imgUri);
			            	console.log("got file: " + fileEntry.fullPath);
			            	// displayFileData(fileEntry.fullPath, "File copied to");
			        	}, onErrorCreateFile);
		    	}, onErrorResolveUrl);
	   	}
	}

})

.controller('ListarOcorrenciasCtrl', function($scope, $state, Ocorrencias) {

	$scope.ocorrencias = Ocorrencias.all();

	$scope.detalhesDaOcorrencia = function(ocorrId) {
		console.log(ocorrId);
		alert(ocorrId);
		$state.go('^.^.detalhesDaOcorrencia', {ocorrenciaId : ocorrId});
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

	$scope.usuario = { nome: null, cpf:null, email:null, senha: null};

	$scope.login = function() {
		console.log("nome: "+$scope.usuario.nome + ";cpf: "+$scope.usuario.cpf+
			";email: "+$scope.usuario.email+";senha: "+$scope.usuario.senha);
		$state.go('^.tab.cadastrarOcorrencia');
	};

	$scope.registrar = function() {
		$state.go('^.registrar');
	};
		
})

.controller('RegistrarCtrl', function($scope, $state) {

	$scope.usuario = { nome: null, cpf:null, email:null, senha: null};

	$scope.registrar = function() {
		console.log("nome: "+$scope.usuario.nome + ";cpf: "+$scope.usuario.cpf+
			";email: "+$scope.usuario.email+";senha: "+$scope.usuario.senha);
		$state.go('^.tab.cadastrarOcorrencia');
	};
		
})

.controller('DetalhesDaOcorrenciaCtrl', function($scope, $state, $stateParams, Ocorrencias) {
	console.log($state.params.ocorrenciaId);
	alert($state.params.ocorrenciaId);
	$scope.ocorrencia = Ocorrencias.get($state.params.ocorrenciaId);
});
