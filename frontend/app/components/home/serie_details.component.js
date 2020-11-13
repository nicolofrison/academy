angular.module('app').component('myDetails', 
{ templateUrl: 'app/components/home/serie_details.html',
    controller: function ($scope, cssInjector){
        cssInjector.add("app/components/home/serie_details.css");
    }
});