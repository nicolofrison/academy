angular.module('app').component('myProfile', 
{ 
    templateUrl: 'app/components/profile/profile.html',
    controller: function ($scope, cssInjector){
        cssInjector.add("app/components/profile/changeProfile.css");
    }
});