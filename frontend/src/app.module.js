import angular from 'angular';
// eslint-disable-next-line no-unused-vars
import ngRoute from 'angular-route';
import { videosService } from './services/videos';

const apiBaseUrl = 'http://localhost:3100';

angular
  .module('app', [
    'ngRoute',
  ])
  .config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider
        .when('/phones', {
          template: 'phones',
        })
        .when('/phones/:phoneId', {
          template: 'phone',
        })
        .otherwise('/phones');
    },
  ])
  .controller('appCtrl', [async function () {
    videosService.setBaseUrl(apiBaseUrl);
    console.log(await videosService.getVideos());
  }]);
