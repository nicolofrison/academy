import appModule from '../../app.module';
import {Movie, Serie, Episode} from "../../lib/openapi";
import IVideo from "../../models/Video";
import {ISearchFilters, ISeriesFilters} from "../../models/SearchFilters";

function rowController(episodesService: any,seriesService: any,moviesService: any, $q:any, $scope:any) {
  this.videosList = [];
  this.searchFilters = {} as ISearchFilters;

  const updateEpisodes = function (seriesFilters: ISearchFilters) {
    $q(episodesService.getEpisodesPromiseFunction(seriesFilters))
      .then(updateVideosListWithEpisodes)
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the episodes. Retry later!')
      });
  };

  this.$onInit = () => {
    this.searchFilters.orderBy = this.orderBy;
    this.searchFilters.orderType = this.orderType;

    switch(this.typeOfService){
      case 'movies':
        $q(moviesService.getMoviesPromiseFunction(this.searchFilters))
        .then(updateVideosListWithMovies)
        .catch((e: any) => {
          console.error(e);
          alert('There was an error during the request of the movies. Retry later!')
        });
        break;
      case 'series':
        $q(seriesService.getSeriesPromiseFunction(this.searchFilters))
        .then(updateVideosListWithSeries)
        .catch((e: any) => {
          console.error(e);
          alert('There was an error during the request of the series. Retry later!')
        });
        break;
      case 'episodes':
        this.searchFilters = this.searchFilters as ISeriesFilters;
        this.searchFilters.seriesId = this.seriesId;
        this.searchFilters.seasonNumber = this.seasonNumber;
        updateEpisodes(this.searchFilters);
        break;
      default :
    }
  };

  this.$onChanges = (changedObj: any) => {
    console.log(changedObj);
    if (changedObj.seasonNumber && changedObj.seasonNumber.currentValue) {
      this.searchFilters.seasonNumber = changedObj.seasonNumber.currentValue;
      updateEpisodes(this.searchFilters);
    }
  }

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

      this.videosList = episodesList;
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
      seasonNumber: '<',
      seriesId: '<'
    },
    controller:['episodesService','seriesService','moviesService','$q', '$scope', rowController],
  });
