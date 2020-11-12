angular
    .module('app', [
        'myNavbar',
        'ngRoute',
        'angular.css.injector',
        'swxSessionStorage'
    ])
    .factory('storageService', ['$rootScope', function($rootScope) {
        return {
            get: function(key) {
                return sessionStorage.getItem(key);
            },
            save: function(key, data) {
                sessionStorage.setItem(key, data);
            }
        };
    }]);
