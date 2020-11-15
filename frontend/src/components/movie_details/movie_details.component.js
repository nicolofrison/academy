import appModule from '../../app.module';

const cssPath = '/src/components/movie_details/movie_details.css';

appModule
  .component('myMovieDetails', {
    templateUrl: '/src/components/movie_details/movie_details.html',
    controller: ['$scope', 'cssInjector', function ($scope, cssInjector) {
      this.$onInit = function () {
        cssInjector.add(cssPath);
      };
      this.$onDestroy = function () {
        cssInjector.remove(cssPath);
      };
    }],
  });
