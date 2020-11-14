import appModule from '../../app.module';
import '../row/row.component';

function moviesController() {
  const ctrl = this;
  ctrl.type = 'movies';
}
appModule
  .component('myMovies', {
    templateUrl: '/src/components/movies/movies.html',
    controllerAs: 'moviesCtrl',
    controller: moviesController,
  });
