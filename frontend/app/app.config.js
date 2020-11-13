angular
    .module('app')
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider.
        when('/login', {
          template: '<my-login></my-login>'
        }).
        when('/home', {
          template: '<my-home></my-home>'
        }).
        when('/search', {
          template: '<my-search></my-search>'
        }).
        when('/movies', {
          template: '<my-movies></my-movies>'
        }).
        when('/details', {
          template: '<my-details></my-details>'
        }).
        when('/signUp', {
          template: '<my-sign-up></my-sign-up>'
        }).
        when('/profile', {
          template: '<my-profile></my-profile>'
        }).
        when('/filmdetails', {
          template: '<my-film-details></my-film-details>'
        }).
        otherwise('/home');
      }
    ])
    .factory('storageService', ['$rootScope', function($rootScope) {
      return {
        get: function(key) {
          console.log("get");
          return sessionStorage.getItem(key);
        },
        save: function(key, data) {
          console.log("set");
          sessionStorage.setItem(key, data);
        }
      };
    }])
    .controller('appCtrl', ['storageService', '$scope', function (storageService, $scope) {
      $scope.isLogged = () => storageService.get('loggedIn') === "true";
    }]);