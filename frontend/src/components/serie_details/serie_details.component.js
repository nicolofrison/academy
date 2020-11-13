import appModule from '../../app.module';
import '../row/row.component';

appModule
  .component('mySerieDetails', {
    templateUrl: '/src/components/serie_details/serie_details.html',
    controller($scope, cssInjector) {
      cssInjector.add('/src/components/serie_details/serie_details.css');
    },
  });
