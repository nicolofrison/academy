function seriesController() {
    var ctrl = this;
    ctrl.type = 'series';
}

angular
  .module('app')
  .component('mySeries', {
    templateUrl: 'app/components/series/series.html',
      controllerAs: 'seriesCtrl',
      controller: seriesController
});
