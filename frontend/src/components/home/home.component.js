import appModule from '../../app.module';
import '../row/row.component';

function homeController(cssInjector) {
  cssInjector.add('/src/components/home/home.css');
  const ctrl = this;
  ctrl.movies = 'movies';
  ctrl.series = 'series';
}

appModule
  .component('myHome', {
    templateUrl: 'app/components/home/home.html',
    controllerAs: 'homeCtrl',
    controller: ['cssInjector', homeController],
  });
