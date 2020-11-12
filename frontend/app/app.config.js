angular
    .module('app')
    .config(['$routeProvider',
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
    when('/home', {
      template: '<my-home></my-home>'
    }).
    when('/search', {
      template: '<my-search></my-search>'
    }).
    otherwise('/home');
  }
]);