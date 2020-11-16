import appModule from '../../app.module';

function seriesController() {
  const ctrl = this;
  ctrl.type = 'series';
}

appModule
  .component('mySeries', {
    templateUrl: '/src/components/series/series.html',
    controllerAs: 'seriesCtrl',
    controller: seriesController,
  });
