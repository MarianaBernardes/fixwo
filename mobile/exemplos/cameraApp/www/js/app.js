// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('camera', {
    url: '/camera',
        templateUrl: 'templates/camera.html',
        controller: 'MyCtrl'
  })

    .state('camera2', {
    url: '/camera2',
          params: {
      image: null
      },
        templateUrl: 'templates/camera2.html',
        controller: 'MyCtrl2'
  });

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/camera');
});

angular.module('starter.controllers', ['ionic','ngCordova'])
.controller('MyCtrl', function($scope, $state, $cordovaCamera) {

  $scope.image = { src: null };

  // $scope.takePicture = function() {
  //    document.addEventListener("deviceready", function () {

  //     var options = {
  //       quality: 50,
  //       destinationType: Camera.DestinationType.DATA_URL,
  //       sourceType: Camera.PictureSourceType.CAMERA,
  //       allowEdit: true,
  //       encodingType: Camera.EncodingType.JPEG,
  //       targetWidth: 100,
  //       targetHeight: 100,
  //       popoverOptions: CameraPopoverOptions,
  //       saveToPhotoAlbum: false,
  //       correctOrientation:true
  //     };

  //     $cordovaCamera.getPicture(options).then(function(imageData) {
  //       var image = document.getElementById('myImage');
  //       image.src = "data:image/jpeg;base64," + imageData;
  //       $scope.user.picture = image.src;
  //     }, function(err) {
  //       // error
  //     });

  //   }, false);
  // };

  $scope.takePicture = function() {
     document.addEventListener("deviceready", function () {

      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
      };

      $cordovaCamera.getPicture(options).then(function(imageUrl) {
        var image = document.getElementById('myImage');
        image.src = imageUrl;
        window.FilePath.resolveNativePath(imageUrl, function (result) {
            imageURI = 'file://' + result;
            $state.go('^.camera2', {image : imageURI} );
            console.log(imageURI);
            resolve(imageURI);
        });
        $state.go('^.camera2', {image : imageUrl} );
        $scope.image.src = imageURI;
        window.location.reload(true); 
      }, function(err) {
      // error
    });


    //$cordovaCamera.cleanup().then(...); // only for FILE_URI

  //}, false);
  };



  function getFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

        // Do something with the FileEntry object, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        $scope.image.src = fileEntry.fullPath;
        console.log("got file: " + fileEntry.fullPath);
        // displayFileData(fileEntry.nativeURL, "Native URL");

    }, function () {
      // If don't get the FileEntry (which may happen when testing
      // on some emulators), copy to a new FileEntry.
        createNewFileEntry(imgUri);
    });
};

})

  .controller('MyCtrl2', function($scope, $state, $stateParams) {


    $scope.image = $state.params.image;

  });




angular.module('starter.services', ['ionic','ngCordova'])
.factory('Camera', function($q) {

   return {
      getPicture: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

});
