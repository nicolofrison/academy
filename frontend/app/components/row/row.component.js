angular.module('app').component('myRow', 
{
    templateUrl: 'app/components/row/row.html',
    bindings: {
        tipo: '<'
    },
    controller: function() {
        const listFilm = [{
            title: 'Finder'
        },{
            title: 'title2'
        },{
            title: 'title3'
        },{
            title: 'title4'
        },{
            title: 'title5'
        }];
        
        console.log(this);
        console.log(this.tipo);
        this.listFilm  = listFilm; 
    }
});