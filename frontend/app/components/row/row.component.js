angular.module('app').component('myRow', 
{
    templateUrl: 'app/components/row/row.html',
    controller: function() {
        const listFilm = [{
            title: 'title1'
        },{
            title: 'title2'
        },{
            title: 'title3'
        },{
            title: 'title4'
        },{
            title: 'title5'
        }];

        this.listFilm  = listFilm; 
    }


});