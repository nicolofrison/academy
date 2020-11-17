import appModule from '../../app.module';
import {FavoritesPostRequest} from '../../lib/openapi';

const cssPath = '/src/components/movie_details/movie_details.css';

appModule
  .component('myMovieDetails', {
    templateUrl: '/src/components/movie_details/movie_details.html',
    controller: ['$routeParams', 'cssInjector', 'sessionService', 'favoritesService', '$q', function ($routeParams, cssInjector, sessionService, favoritesService, $q) {
      console.log($routeParams);
      const movieId: number = $routeParams.id;
      this.$onInit = function () {
        cssInjector.add(cssPath);
      };
      this.$onDestroy = function () {
        cssInjector.remove(cssPath);
      };

      const addFavoriteVideo = (v: any) => {
        console.log(v);
        alert('Movie added to favorites');
      }

      this.addVideoToFavorite = () => {
        const favoritesPostRequest: FavoritesPostRequest = {
          usersId: +sessionService.get('userId'),
          moviesId: +movieId
        };
        console.log(favoritesPostRequest);

        $q(favoritesService.addFavoriteVideoPromiseFunction(favoritesPostRequest))
          .then(addFavoriteVideo)
          .catch((e: any) => {
            console.error(e);
            alert('There was an error during the request of the movies. Retry later!')
          });
      };
    }],
  });
