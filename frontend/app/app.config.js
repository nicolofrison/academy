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
      template: '<mynavbar></mynavbar>'
    });
  }
]);