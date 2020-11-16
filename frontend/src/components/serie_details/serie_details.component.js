import appModule from '../../app.module';
import '../row/row.component';

const cssPath = '/src/components/serie_details/serie_details.css';

appModule
  .component('mySerieDetails', {
    templateUrl: '/src/components/serie_details/serie_details.html',
    controllerAs: 'episodesCtrl',
    controller: ['$scope', 'cssInjector', function ($scope, cssInjector) {
      this.$onInit = function () {
        cssInjector.add(cssPath);
        this.type = 'episodes';
      };
      this.$onDestroy = function () {
        cssInjector.remove(cssPath);
      };
    }],
  });
