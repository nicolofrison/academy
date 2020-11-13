import appModule from '../../app.module';

function rowController() {
  let type;
  this.$onInit = function () {
    type = this.typeOfService;
    /* console.log(type); */
    const listFilm = [{
      title: 'Finder',
    }, {
      title: 'title2',
    }, {
      title: 'title3',
    }, {
      title: 'title4',
    }, {
      title: 'title5',
    }];

    this.listFilm = listFilm;
    console.log(this);
  };
}

appModule
  .component('myRow', {
    templateUrl: 'app/components/row/row.html',
    bindings: {
      typeOfService: '<',
    },
    controller: rowController,
  });
