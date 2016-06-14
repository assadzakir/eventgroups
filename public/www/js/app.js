angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('signUp', {
      url: '/sign-up',
      templateUrl: 'templates/sign-up.html',
      controller: 'SignUpCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: '/facts',
      views: {
        'home-tab': {
          templateUrl: 'templates/facts.html'
        }
      }
    })
    .state('tabs.facts2', {
      url: '/facts2',
      views: {
        'home-tab': {
          templateUrl: 'templates/facts2.html'
        }
      }
    })
    .state('tabs.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('tabs.navstack', {
      url: '/navstack',
      views: {
        'about-tab': {
          templateUrl: 'templates/nav-stack.html'
        }
      }
    })
    .state('tabs.contact', {
      url: '/contact',
      views: {
        'contact-tab': {
          templateUrl: 'templates/contact.html'
        }
      }
    });

   $urlRouterProvider.otherwise('/sign-up');

})

.controller('SignInCtrl', function($scope, $state) {

  $scope.signIn = function(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function(data) {
      console.log(data);
      $state.go('tabs.home');
    }, function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error.message);
      // ...
    });
  };

  $scope.signOut = function() {
    firebase.auth().signOut().then(function() {
      $state.go('signUp');
    }, function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error.message);
      // ...
    });
  };

})

.controller('SignUpCtrl', function($scope, $state) {

  $scope.signUp = function(user) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function(data) {
      console.log(data);
      $state.go('tabs.home');
    }, function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error.message);
    });
  };

})
  .controller('facebookCtrl', function($scope, $state) {
    var provider = new firebase.auth.FacebookAuthProvider();

    $scope.fbLogin = function () {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

      //firebase.auth().signInWithRedirect(provider).then(function(result) {
      //  debugger;
      //  if (result.credential) {
      //    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //    var token = result.credential.accessToken;
      //    console.log(result)
      //    // ...
      //  }
      //  // The signed-in user info.
      //  var user = result.user;
      //}).catch(function(error) {
      //  // Handle Errors here.
      //  var errorCode = error.code;
      //  var errorMessage = error.message;
      //  // The email of the user's account used.
      //  var email = error.email;
      //  // The firebase.auth.AuthCredential type that was used.
      //  var credential = error.credential;
      //  // ...
      //});;
      //
      //firebase.auth().getRedirectResult().then(function(result) {
      //  debugger;
      //  if (result.credential) {
      //    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //    var token = result.credential.accessToken;
      //    console.log(result)
      //    // ...
      //  }
      //  // The signed-in user info.
      //  var user = result.user;
      //}).catch(function(error) {
      //  // Handle Errors here.
      //  var errorCode = error.code;
      //  var errorMessage = error.message;
      //  // The email of the user's account used.
      //  var email = error.email;
      //  // The firebase.auth.AuthCredential type that was used.
      //  var credential = error.credential;
      //  // ...
      //});

    }
  })
  .controller('gmailCtrl', function($scope, $state) {
  })
  .controller('twitterCtrl', function($scope, $state) {
  })


.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});
