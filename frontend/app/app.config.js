angular
    .module('app')
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider.
        when('/phones', {
          template: 'phones'
        }).
        when('/phones/:phoneId', {
          template: 'phone'
        }).
        when('/login', {
          template: '<my-login></my-login>'
        }).
        when('/home', {
          template: '<my-home></my-home>'
        }).
        when('/search', {
          template: '<my-search></my-search>'
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