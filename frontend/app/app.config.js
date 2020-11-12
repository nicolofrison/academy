angular.module('phonecatApp').
config(['$routeProvider',
  function config($routeProvider) {
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
    otherwise('/phones');
  }
]);