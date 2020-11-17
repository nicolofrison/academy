import appModule from '../../app.module';
import {FavoritesPostRequest} from '../../lib/openapi';

const cssPath = '/src/components/movie_details/movie_details.css';

appModule
  .component('myEpisodeDetails', {
    templateUrl: '/src/components/movie_details/movie_details.html',
    controller: ['$routeParams', 'cssInjector', 'sessionService', 'favoritesService', '$q', function ($routeParams, cssInjector, sessionService, favoritesService, $q) {
      console.log($routeParams);
      this.$onInit = function () {
        cssInjector.add(cssPath);
      };
      this.$onDestroy = function () {
        cssInjector.remove(cssPath);
      };

      const addFavoriteVideo = () => {

      }
      this.addVideoToFavorite = () => {
        const favoritesPostRequest: FavoritesPostRequest = {
          usersId: sessionService.get('userId')
        };
/*
        $q(favoritesService.addFavoriteVideo())
          .then(addToFavorite)
          .catch((e: any) => {
            console.error(e);
            alert('There was an error during the request of the movies. Retry later!')
          });*/
      };
    }],
  });
