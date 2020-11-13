function rowController() {
    let type;
    this.$onInit = function() {
        type = this.tipo;
        console.log(type);
    };

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

    this.listFilm  = listFilm;
    console.log(type);
}

angular.module('app').component('myRow',
{
    templateUrl: 'app/components/row/row.html',
    bindings: {
        tipo: '<'
    },
    controller: rowController
});
