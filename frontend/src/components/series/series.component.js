import appModule from '../../app.module';

function seriesController() {
  const ctrl = this;
  ctrl.type = 'series';
}

appModule
  .component('mySeries', {
    templateUrl: 'app/components/series/series.html',
    controllerAs: 'seriesCtrl',
    controller: seriesController,
  });
