function moviesController() {
    var ctrl = this;
    ctrl.type = 'movies';
}
angular.module('app').component('myMovies', 
{
    templateUrl: 'app/components/film/film.html',
    controllerAs: 'moviesCtrl',
    controller: moviesController
});