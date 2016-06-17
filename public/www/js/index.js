angular.module('ionicApp', ['ionic'])


  .run(function($cordovaPush,$ionicPlatform,$rootScope) {

    var androidConfig = {
      "senderID": "6654639009467199534",
    };






      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        $cordovaPush.register(androidConfig).then(function(result) {
          // Success
          alert(result)
        }, function(err) {
          alert(err)
          // Error
        })

        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
          switch(notification.event) {
            case 'registered':
              if (notification.regid.length > 0 ) {
                alert('registration ID = ' + notification.regid);
              }
              break;

            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
              break;

            case 'error':
              alert('GCM error = ' + notification.msg);
              break;

            default:
              alert('An unknown GCM event has occurred');
              break;
          }
        });
      });



  })






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
      })/*
     .state('tabs.contact', {
     url: '/contact',
     views: {
     'contact-tab': {
     templateUrl: 'templates/contact.html'
     }
     }
     });*/

    $urlRouterProvider.otherwise('/sign-up');

  })

//.config(function($stateProvider, $urlRouterProvider) {
//
//  $stateProvider
//    .state('tabs', {
//      url: "/tab",
//      abstract: true,
//      templateUrl: "tabs.html"
//    })
//    .state('tabs.home', {
//      url: "/home",
//      views: {
//        'home-tab': {
//          templateUrl: "home.html",
//          controller: 'HomeTabCtrl'
//        }
//      }
//    });
//
//   $urlRouterProvider.otherwise("/tab/home");
//
//})

//.controller('HomeTabCtrl', function($scope, $state, $firebase) {
//
//
//   var ref = new Firebase("https://dchatapp.firebaseio.com/chat");
//         $scope.messages = $firebase(ref);
//        $scope.addMessage = function(e) {
//           $scope.sendMsg = function() {
//
//                  $scope.messages.$add({from: $scope.name, body: $scope.msg});
//                  $scope.msg = "";
//
//                }
//        };
//        $scope.clear = function(){
//          $scope.name = "";
//        };
//
//
//  console.log('HomeTabCtrl');
//
//})
  .controller('SignInCtrl', function($scope, $state,$window) {
   // window.onNotificationGCM = onNotificationGCM;
    $scope.signIn = function(user) {



      if(!user)
      {
        alert('Please type email and password');
        return
      }
      firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function(data) {
        console.log(data);
        alert(data);

        /*if ($window.plugins && $window.plugins.pushNotification) {

          var pushNotification = $window.plugins.pushNotification;
          pushNotification.register(function(result) {
            //alert('Callback Success! Result = '+result)
          }, function(error) {
            //alert(error);
          },{"senderID":"project-6654639009467199534","ecb":"onNotificationGCM"});
        }*/
        $state.go('tabs.home');
      }, function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(error.message);
        // ...
      });


    };
   /* function onNotificationGCM(e){
      switch( e.event )
      {
        case 'registered':
          if ( e.regid.length > 0 )
          {
            alert("Regid " + e.regid)
            console.log("Regid " + e.regid);
            //console.log("AuthenticationFactory.user.userID " + userID);
            /!*     //alert('registration id = '+e.regid);
             pushNotificationIds.android = e.regid;
             $http.post(appConfig.apiBaseUrl + 'registerdevice', {
             "userID" : userID,
             "device" : "android",
             "regID" : e.regid,
             }).success(function (data, status) {
             console.log('registration ID saved successfully.');
             }).error(function (status) {
             console.log('registration ID not saved successfully.');
             });*!/

            //pushNotificationIds
          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          alert('message = '+e.message+' msgcnt = '+e.msgcnt);
          console.log('message = '+e.message+' msgcnt = '+e.msgcnt);
          break;

        case 'error':
          alert('GCM error = '+e.msg);
          console.log('GCM error = '+e.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          console.log('An unknown GCM event has occurred');
          break;
      }
    }*/
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
      if(!user)
      {
        alert('Please type email and password');
        return
      }

      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function(data) {
        alert(data);
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
    provider.addScope('user_actions.books');

    $scope.fbLogin = function () {
    /*  firebase.auth().signInWithPopup(provider).then(function(result) {
        alert(result);
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
*/
      firebase.auth().signInWithRedirect(provider).then(function(result) {
        debugger;
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          console.log(result)
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });;

      firebase.auth().getRedirectResult().then(function(result) {
        debugger;
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          console.log(result)
          // ...
        }
        // The signed-in user info.
        var user = result.user;
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

    }
  })
  .controller('gmailCtrl', function($scope, $state) {
  })
  .controller('twitterCtrl', function($scope, $state) {
  })


  .controller('HomeTabCtrl', function($scope) {
    console.log('HomeTabCtrl');
  });



