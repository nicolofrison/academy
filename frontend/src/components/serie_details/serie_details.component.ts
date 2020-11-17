import appModule from '../../app.module';
import '../row/row.component';
import {FavoritesPostRequest} from '../../lib/openapi';
import {ISeriesFilters} from "../../models/SearchFilters";

const cssPath = '/src/components/serie_details/serie_details.css';

appModule
  .component('mySerieDetails', {
    templateUrl: '/src/components/serie_details/serie_details.html',
    controller: ['$routeParams', 'cssInjector', 'sessionService', 'favoritesService', 'seriesService', '$q', function ($routeParams, cssInjector, sessionService, favoritesService, seriesService, $q) {
      console.log($routeParams);
      this.seriesId = +$routeParams.id;
      this.type = 'episodes';

      this.$onInit = function () {
        cssInjector.add(cssPath);
      };
      this.$onDestroy = function () {
        cssInjector.remove(cssPath);
      };

      const getSerieSeasons = (seasons: number[]) => {
        this.seasons = seasons;
        this.seasons.push(10);
      };

      const seriesFilter: ISeriesFilters = {seriesId: this.seriesId};
      $q(seriesService.getSeriesSeasonsPromiseFunction(seriesFilter))
        .then(getSerieSeasons)
        .catch((e: any) => {
          console.error(e);
          alert('There was an error during the request of the movies. Retry later!')
        });

      const addFavoriteVideo = (v: any) => {
        console.log(v);
        alert('Serie added to favorites');
      }

      this.addVideoToFavorite = () => {
        const favoritesPostRequest: FavoritesPostRequest = {
          usersId: +sessionService.get('userId'),
          seriesId: +this.seriesId
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
