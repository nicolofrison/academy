angular
    .module('myNavbar')
    .component('myNavbar', {
        templateUrl: '/app/components/navbar/navbar.html',
        bindings: {
            loggedIn: '<'
        }
    });