import appModule from '../../app.module';
import '../row/row.component';

const cssPath = '/src/components/home/home.css';

function homeController(cssInjector) {
  this.$onInit = function () {
    cssInjector.add(cssPath);
  };
  this.$onDestroy = function () {
    cssInjector.remove(cssPath);
  };

  const ctrl = this;
  ctrl.movies = 'movies';
  ctrl.series = 'series';
}

appModule
  .component('myHome', {
    templateUrl: '/src/components/home/home.html',
    controllerAs: 'homeCtrl',
    controller: ['cssInjector', homeController],
  });
