import appModule from '../../app.module';
import '../row/row.component';
import {FavoritesPostRequest} from '../../lib/openapi';

const cssPath = '/src/components/serie_details/serie_details.css';

appModule
  .component('mySerieDetails', {
    templateUrl: '/src/components/serie_details/serie_details.html',
    controller: ['$routeParams', 'cssInjector', 'sessionService', 'favoritesService', '$q', function ($routeParams, cssInjector, sessionService, favoritesService, $q) {
      console.log($routeParams);
      const serieId: number = $routeParams.id;
      this.type = 'episodes';

      this.$onInit = function () {
        cssInjector.add(cssPath);
      };
      this.$onDestroy = function () {
        cssInjector.remove(cssPath);
      };
      const addFavoriteVideo = (v: any) => {
        console.log(v);
        alert('Serie added to favorites');
      }

      this.addVideoToFavorite = () => {
        const favoritesPostRequest: FavoritesPostRequest = {
          usersId: +sessionService.get('userId'),
          seriesId: +serieId
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
