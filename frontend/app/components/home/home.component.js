function homeController() {
    var ctrl = this;
    ctrl.movies = 'movies';
    ctrl.series = 'series';
}

angular.module('app').component('myHome', 
{ 
    templateUrl: 'app/components/home/home.html',
    controllerAs: 'homeCtrl',
    controller: homeController
});
