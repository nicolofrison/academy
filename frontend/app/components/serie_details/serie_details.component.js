angular.module('app').component('myDetails', 
{ templateUrl: 'app/components/serie_details/serie_details.html',
    controller: function ($scope, cssInjector){
        cssInjector.add("app/components/serie_details/serie_details.css");
    }
});