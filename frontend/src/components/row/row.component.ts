import appModule from '../../app.module';
import {Movie, Serie, Episode} from "../../lib/openapi";
import IVideo from "../../models/Video";
import {ISearchFilters} from "../../models/SearchFilters";

function rowController(episodesService: any,seriesService: any,moviesService: any, $q:any, $scope:any) {
  let type;
  this.videosList = [];
  this.$onInit = function () {
    type = this.typeOfService;    
    const s: ISearchFilters={};
    s.orderBy=this.orderBy;
    s.orderType=this.orderType;
    switch(type){
      case 'movies':
        $q(moviesService.getMoviesPromiseFunction(s))
        .then(updateVideosListWithMovies)
        .catch((e: any) => {
          console.error(e);
          alert('There was an error during the request of the movies. Retry later!')
        });
        break;
      case 'series':
        $q(seriesService.getSeriesPromiseFunction(s))
        .then(updateVideosListWithSeries)
        .catch((e: any) => {
          console.error(e);
          alert('There was an error during the request of the series. Retry later!')
        });
        break;
      case 'episodes':
        $q(episodesService.getEpisodesPromiseFunction(s))
        .then(updateVideosListWithEpisodes)
        .catch((e: any) => {
          console.error(e);
          alert('There was an error during the request of the episodes. Retry later!')
        });
        break;
      default :
    }
  };
  
  const updateVideosListWithEpisodes = (episodesList: any) => {
    console.log(episodesList);

    if (episodesList.length > 0) {
      episodesList = episodesList
        .filter((e: Episode) => e)
        .map((e: Episode) => {
          const myVideo: IVideo = e as unknown as IVideo;
          myVideo.type = 'episode';
          myVideo.href = '/#!/episodedetails/' + e.id;

          return myVideo;
        });

      this.videosList = this.videosList.concat(episodesList);
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
}

appModule
  .component('myRow', {
    templateUrl: '/src/components/row/row.html',
    bindings: {
      typeOfService: '<',
      orderBy: '<',
      orderType: '<',
    },
    controller:['episodesService','seriesService','moviesService','$q', '$scope', rowController],
  });
