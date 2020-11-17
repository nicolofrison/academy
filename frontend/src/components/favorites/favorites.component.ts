import appModule from '../../app.module';
import Filters from "../../models/SearchFilters";
import {Movie, Serie} from "../../lib/openapi";
import IVideo from "../../models/Video";
import ISearchFilters from "../../models/SearchFilters";

function favoritesController($routeParams: ISearchFilters, favoritesService: any, sessionService: any, $q:any, $scope:any) {
  this.videosList = [];

  const getFavorites = (favoritesVideosList: any) => {
    console.log('getFavoritesVideosList');
    console.log(favoritesVideosList);

    this.videosList = favoritesVideosList;
  };

  const userId: number = +sessionService.get('userId');

  $q(favoritesService.getFavoritesVideos(userId))
    .then(getFavorites)
    .catch((e: any) => {
      console.error(e);
    })
}

appModule
  .component('myFavorites', {
    templateUrl: '/src/components/searchResults/searchResults.html',
    controllerAs: 'searchResultsController',
    controller: ['$routeParams', 'favoritesService', 'sessionService', '$q', '$scope', favoritesController],
  });
