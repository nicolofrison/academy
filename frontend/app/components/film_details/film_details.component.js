angular.module('app').component('myFilmDetails', 
{ templateUrl: 'app/components/film_details/film_details.html',
    controller: function ($scope, cssInjector){
        cssInjector.add("app/components/film_details/film_details.css");
    }
});