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
    firebase.auth().signOut().then().then(function() {
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

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});
