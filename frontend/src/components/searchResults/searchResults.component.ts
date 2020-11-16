import appModule from '../../app.module';
import Filters from "../../models/SearchFilters";
import {Movie, Serie} from "../../lib/openapi";
import IVideo from "../../models/Video";
import ISearchFilters from "../../models/SearchFilters";

function resultsController($routeParams: ISearchFilters, moviesService: any, seriesService: any, $q:any, $scope:any) {
  this.videosList = [];

  const updateVideosListWithMovies = (moviesList: any) => {
    console.log(moviesList);

    if (moviesList.length > 0) {
      moviesList = moviesList
        .filter((m: Movie) => m)
        .map((m: Movie) => {
          const myVideo: IVideo = m as IVideo;
          myVideo.type = 'movie';
          myVideo.href = '/#!/moviedetails/' + m.id;

          return myVideo;
      });

      this.videosList = this.videosList.concat(moviesList);
    }
  }

  const updateVideosListWithSeries = (seriesList: any) => {
    console.log(seriesList);

    if (seriesList.length > 0) {
      seriesList = seriesList
        .filter((s: Serie) => s)
        .map((s: Serie) => {
          const myVideo: IVideo = s as unknown as IVideo;
          myVideo.type = 'serie';
          myVideo.href = '/#!/seriedetails/' + s.id;

          return myVideo;
        });

      this.videosList = this.videosList.concat(seriesList);
    }
  }

  const filters: Filters = $routeParams;

  if (!filters.type || filters.type === 'movies') {
    $q(moviesService.getMoviesPromiseFunction(filters))
      .then(updateVideosListWithMovies)
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the movies. Retry later!')
      });
  }

  if (!filters.type || filters.type === 'series') {
    $q(seriesService.getSeriesPromiseFunction(filters))
      .then(updateVideosListWithSeries)
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the series. Retry later!')
      });
  }
}

appModule
  .component('mySearchResults', {
    templateUrl: '/src/components/searchResults/searchResults.html',
    controllerAs: 'searchResultsController',
    controller: ['$routeParams', 'moviesService', 'seriesService', '$q', '$scope', resultsController],
  });
