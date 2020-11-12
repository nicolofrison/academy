angular.module('app').component('mySearch', 
{ templateUrl: 'app/components/search/search.html',
    controller: function ($scope, cssInjector){
        cssInjector.add("app/components/search/search.css");
    }
});