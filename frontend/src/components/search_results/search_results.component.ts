import appModule from '../../app.module';
import Filters from "../../models/SearchFilters";
import {Movie, Serie} from "../../lib/openapi";
import Video from "../../models/Video";
import ISearchFilters from "../../models/SearchFilters";

function resultsController($routeParams: ISearchFilters, videosService: any, $q:any, $scope:any) {
  const updateVideosList = (videosList: any) => {
    if (videosList.data.length > 0) {
      //  console.log(videosList);
      videosList = videosList.data[0].concat(videosList.data[1]);

      videosList = videosList
        .filter((v: Movie | Serie | Video) => v)
        .map((v: Movie | Serie | Video) => {
          const myVideo: Video = v as Video;
          // if the filed 'quality' is in v then v is a movie because serie not have the field quality
          myVideo.type = 'quality' in v ? 'movie' : 'serie';
          myVideo.href = myVideo.type === 'serie'
            ? '/#!/seriedetails/' + v.id
            : '/#!/moviedetails/' + v.id;
          return myVideo;
      });

      //  console.log('Videos list');
      //  console.log(videosList);

      this.videosList = videosList;
    } else {
      this.videosList = [];
    }
  }

  const filters: Filters = $routeParams;

  $q(videosService.getVideos(filters))
    .then(updateVideosList)
    .catch((e: any) => {
      console.error(e);
      alert('There was an error during the request. Retry later!')
    });
}

appModule
  .component('mySearchResults', {
    templateUrl: '/src/components/search_results/search_results.html',
    controllerAs: 'searchResultsController',
    controller: ['$routeParams', 'videosService', '$q', '$scope', resultsController],
  });
