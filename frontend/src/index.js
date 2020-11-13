import {Videos,videosService} from './services/episodes.js';

const apiBaseUrl = 'http://localhost:3100';

angular.module('app', [
        'ngRoute'
    ])
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
    .controller('appCtrl', [async function () {
        videosService.setBaseUrl(apiBaseUrl);
        console.log(await videosService.getVideos());
    }]);