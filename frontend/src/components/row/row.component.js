import appModule from '../../app.module';

function rowController() {
  let type;
  this.$onInit = function () {
    type = this.typeOfService;
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
  };
}

appModule
  .component('myRow', {
    templateUrl: '/src/components/row/row.html',
    bindings: {
      typeOfService: '<',
    },
    controller: rowController,
  });
