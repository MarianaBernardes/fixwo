var teste = "ola";
angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('NavBackButtonCtrl', function($scope, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})

.controller('TabCadastrarOcorrenciaCtrl', function($scope, $state, $cordovaBarcodeScanner) {
	
	$scope.teste = teste;
	$scope.goToQrCodeState = function() {
	$cordovaBarcodeScanner.scan().then
	  (
	    function(imageData) {
			$state.go('^.^.cadastrarOcorrencia', {qrcode: imageData.text});
	      	console.log("Barcode Format -> " + imageData.format);
	      	console.log("Cancelled -> " + imageData.cancelled);
	    },
	    function(error) {
	      	console.log("An error happened -> " + error);
	    }          
	  );
	}

	$scope.getCadOcorr = function(){
		var text = '{"location":"teste"}';
		$state.go('^.^.cadastrarOcorrencia', {qrcode : text} );
	}

})

.controller('CadastrarOcorrenciaCtrl', function($scope, $state, $cordovaCamera, $stateParams) {

	$scope.qrcodeJson = JSON.parse($state.params.qrcode);
	$scope.location = $scope.qrcodeJson.location;
	$scope.fotos = [];


	$scope.uploadP = function() {
		document.addEventListener("deviceready", onDeviceReady, error);

		function onDeviceReady() {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto,
            	function(message) { alert('get picture failed'); },
                { quality: 50, 
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
            );
        }

        function error() {

        }

		function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://some.server.com/upload.php"), win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

	}

	function download() {
		var fileTransfer = new FileTransfer();
		var uri = encodeURI("http://xiostorage.com/wp-content/uploads/2015/10/test.png");

		fileTransfer.download(
		    uri,
		    filePath,
		    function(entry) {
		        console.log("download complete: " + entry.fullPath);
		        alert("download complete: " + entry.fullPath);
		        //$scope.fotos.push(filePath);
		    },
		    function(error) {
		        console.log("download error source " + error.source);
		        alert("download error source " + error.source);
		        console.log("download error target " + error.target);
		        alert("download error target " + error.target);
		        console.log("upload error code" + error.code);
		        alert("upload error code" + error.code);

		    }
		);
	}





	$scope.goToCadastrarOcorrenciaState = function() {
		$state.go('^.tab.cadastrarOcorrencia');
	};

	$scope.adicionarFoto = function() {

		var cameraOptions = {
	      quality: 80,
	      destinationType: Camera.DestinationType.DATA_URL,
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
	        		function (imageData) {
	          			$scope.fotos.push("data:image/jpeg;base64," + imageData);
	          			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
	          				function (fs) {
								alert('file system open: ' + fs.name);
					    		fs.root.getFile("image.jpeg", 
					    			{ create: true, exclusive: false }, 
					    			function (fileEntry) {
					    				alert("fileEntry is file?" + fileEntry.isFile.toString());
					    				alert("fileEntry.name: " + fileEntry.name);
					    				alert("fileEntry.fullPath " + fileEntry.fullPath);
								    	writeFile(fileEntry, imageData);
					    			}, function fail(error) { 
					    				alert(error.code); 
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
	    window.resolveLocalFileSystemURL(imgUri, 
		    	function success(fileEntry) {
		        // Do something with the FileEntry object, like write to it, upload it, etc.
		        writeFile(fileEntry, imgUri);
		        alert("got file: " + fileEntry.fullPath);
		        console.log("got file: " + fileEntry.fullPath);
		        // displayFileData(fileEntry.nativeURL, "Native URL");
		    }, function (error) {
		      // If don't get the FileEntry (which may happen when testing
		      // on some emulators), copy to a new FileEntry.
		      alert(error.message);
		      createNewFileEntry(imgUri);
		    }
		);
	}

	function persistanceFile(file) {
		alert(1);
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
			alert(fs.name);
			alert(2);
    		console.log('file system open: ' + fs.name);
    		fs.root.getFile(file, 
    		{ create: true, exclusive: false }, 
    		function (fileEntry) {
    			alert(fileEntry.isFile.toString());
       			console.log("fileEntry is file?" + fileEntry.isFile.toString());
		        // fileEntry.name == 'someFile.txt'
			    // fileEntry.fullPath == '/someFile.txt'
			    writeFile(fileEntry, null);
    		}, onErrorCreateFile);
		}, onErrorLoadFs);
	}

	function createNewFileEntry(imgUri) {
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
