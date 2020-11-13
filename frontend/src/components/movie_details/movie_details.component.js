import appModule from '../../app.module';

appModule
  .component('myMovieDetails', {
    templateUrl: '/src/components/movie_details/movie_details.html',
    controller($scope, cssInjector) {
      cssInjector.add('/src/components/movie_details/movie_details.css');
    },
  });
