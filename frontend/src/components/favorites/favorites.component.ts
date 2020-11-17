import appModule from '../../app.module';
import Filters from "../../models/SearchFilters";
import {FavoritesPostRequest, Movie, Serie} from "../../lib/openapi";
import IVideo from "../../models/Video";
import ISearchFilters from "../../models/SearchFilters";

function favoritesController($routeParams: ISearchFilters, favoritesService: any, sessionService: any, $q:any, $scope:any) {
  this.page = 'favorites';
  this.videosList = [];

  const getFavorites = (favoritesVideosList: any) => {
    console.log('getFavoritesVideosList');
    console.log(favoritesVideosList);

    this.videosList = favoritesVideosList;
  };

  const userId: number = +sessionService.get('userId');

  const reloadFavorites = () => {
    $q(favoritesService.getFavoritesVideos(userId))
      .then(getFavorites)
      .catch((e: any) => {
        console.error(e);
      });
  }
  reloadFavorites();

  const rmFavoriteVideo = (v: any) => {
    console.log(v);
    alert('Video removed from favorites');

    reloadFavorites();
  }

  this.rmVideoFromFavorites = (favoriteId: number) => {

    $q(favoritesService.rmFavoriteVideoPromiseFunction(favoriteId))
      .then(rmFavoriteVideo)
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the movies. Retry later!')
      });
  };
}

appModule
  .component('myFavorites', {
    templateUrl: '/src/components/searchResults/searchResults.html',
    controllerAs: 'searchResultsController',
    controller: ['$routeParams', 'favoritesService', 'sessionService', '$q', '$scope', favoritesController],
  });
