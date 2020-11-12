angular
    .module('app')
    .component('myLogin', {
        templateUrl: 'app/components/login/login.html',
        controllerAs: 'loginCtrl',
        controller: ['storageService', function (storageService) {
            this.loginForm = {};
            this.login = function() {
                // request to api
                const loggedIn = true;

                if (loggedIn) {
                    console.log("email: " + this.loginForm.email + " password: " + this.loginForm.password);
                    storageService.save('loggedIn', true);
                    window.location.href = '/#!/Home';
                } else {
                    console.log("Email and/or password are incorrect!");
                }
            }
        }]
    });/*
    .controller('loginCtrl', ['storageService', function (storageService) {
        this.loginForm = {};
        this.login = function() {
            // request to api
            const loggedIn = true;

            if (loggedIn) {
                console.log("email: " + this.loginForm.email + " password: " + this.loginForm.password);
                storageService.save('loggedIn', true);
                window.location.href = '/#!/Home';
            } else {
                console.log("Email and/or password are incorrect!");
            }
        }
    }]);
*/