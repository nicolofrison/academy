angular.module('app').component('myFilmDetails', 
{ templateUrl: 'app/components/home/film_details.html',
    controller: function ($scope, cssInjector){
        cssInjector.add("app/components/home/film_details.css");
    }
});