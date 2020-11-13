import videosService from './services/episodes.js';

const apiBaseUrl = 'localhost:3000';

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
        otherwise('/phones');
      }
    ])
    .controller('appCtrl', [function () {
      console.log(videosService.getVideos());
    }]);