// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    try {
      db = $cordovaSQLite.openDB({name:"my.db", location:'default'});
      /*db = $cordovaSQLite.openDB({name:"ocorrencias.db", location:'default',
      createFromLocation: 1});//*/
    }
    catch (error) {
      alert('Não conseguiu abrir o banco!');
    }
    
    $cordovaSQLite.execute(db,'DROP TABLE ocorrencias');
    //CREATE TABLE 
    $cordovaSQLite.execute(db,
      'CREATE TABLE IF NOT EXISTS ocorrencias (id INTEGER PRIMARY KEY,'+
      'titulo TEXT, localizacao TEXT, estado TEXT, classificacao TEXT, '+
      'data TEXT, comentario TEXT, imagem TEXT)');
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.cadastrarOcorrencia', {
    url: '/tabcadastrarOcorrencia',
    views: {
      'tab-cadastrarOcorrencia': {
        templateUrl: 'templates/tab-cadastrarOcorrencia.html',
        controller: 'TabCadastrarOcorrenciaCtrl'
      }
    }
  })

  .state('tab.listarOcorrencias', {
      url: '/listarOcorrencias',
      views: {
        'tab-listarOcorrencias': {
          templateUrl: 'templates/tab-listarOcorrencias.html',
          controller: 'ListarOcorrenciasCtrl'
        }
      }
    })
  
  .state('tab.detalhesDaOcorrencia', {
      url: '/listarOcorrencias/:ocorrenciaId',
      views: {
        'tab-listarOcorrencias': {
          templateUrl: 'templates/tab-detalhesDaOcorrencia.html',
          controller: 'DetalhesDaOcorrenciaCtrl'
        }
      }
    })


  .state('cadastrarOcorrencia', {
      url: '/cadastrarOcorrencia',
  	  params: {
          qrcode: null,
          location: null,
          lat: null,
          lon: null,
          option: null
        },
      templateUrl: 'templates/cadastrarOcorrencia.html',
      controller: 'CadastrarOcorrenciaCtrl'
    })

  .state('fotos', {
      url: '/fotos',
      templateUrl: 'templates/fotos.html',
      controller: 'FotosCtrl'
    })

  .state('comentarios', {
      url: '/comentarios',
      templateUrl: 'templates/comentarios.html',
      controller: 'ComentariosCtrl'
    })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

  .state('registrar', {
      url: '/registrar',
      templateUrl: 'templates/registrar.html',
      controller: 'RegistrarCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
