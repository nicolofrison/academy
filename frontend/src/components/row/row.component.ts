import appModule from '../../app.module';
import IVideo from "../../models/Video";
import {ISearchFilters} from "../../models/SearchFilters";
import {IComponentController, IOnChangesObject} from "angular";

class VideosController implements IComponentController {
  private videosList: IVideo[] = [];
  private searchFilters: ISearchFilters = {};

  //  Bindings
  private typeOfService: 'episodes' | 'movies' | 'series';
  private orderBy: "creationDate" | "likes" | "ratings" | "views";
  private orderType: "asc" | "desc";
  private seasonNumber: number;
  private seriesId: number;

  constructor(private episodesService: any,private seriesService: any,private moviesService: any, private $q:any) {

  }

  $onInit(): void {
    switch(this.typeOfService) {
      case 'movies':
        this.searchFilters.orderBy = this.orderBy;
        this.searchFilters.orderType = this.orderType;
        this.updateMovies();
        break;
      case 'series':
        this.searchFilters.orderBy = this.orderBy;
        this.searchFilters.orderType = this.orderType;
        this.updateSeries();
        break;
      case 'episodes':
        if (this.seriesId && this.seasonNumber) {
          this.searchFilters.seriesId = this.seriesId;
          this.searchFilters.seasonNumber = this.seasonNumber;
          this.updateEpisodes();
        }
        break;
      default :
    }
  }

  $onChanges(onChangesObj: IOnChangesObject): void {
    //  console.log(onChangesObj);
    if (this.seriesId) {
      if (!this.searchFilters.seriesId) {
        this.searchFilters.seriesId = this.seriesId;
      }

      if (onChangesObj.seasonNumber && onChangesObj.seasonNumber.currentValue) {
        //  console.log('Change season number');
        this.searchFilters.seasonNumber = onChangesObj.seasonNumber.currentValue;
        this.updateEpisodes();
      }
    }
  }

  private updateVideosList = (videos: IVideo[]) => {
    if (videos.length > 0) {
      videos = videos
        .map((v: IVideo) => {
          const myVideo: IVideo = v as unknown as IVideo;
          if ('seasonNumber' in v) {
            //  Episodes
            myVideo.type = 'episode';
            myVideo.href = '/#!/episodedetails/' + myVideo.id;
          } else if ('quality' in v) {
            //  Movies
            myVideo.type = 'movie';
            myVideo.href = '/#!/moviedetails/' + myVideo.id;
          } else {
            //  Series
            myVideo.type = 'serie';
            myVideo.href = '/#!/seriedetails/' + myVideo.id;
          }

          return myVideo;
        });

      this.videosList = this.videosList.concat(videos);
    }
  }

  private updateEpisodes() {
    //  console.log('updateEpisodes');
    //  console.log(this.searchFilters);
    this.$q(this.episodesService.getEpisodesPromiseFunction(this.searchFilters))
      .then(this.updateVideosList)
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the episodes. Retry later!')
      });
  }

  private updateMovies() {
    console.log('update movies');
    this.$q(this.moviesService.getMoviesPromiseFunction(this.searchFilters))
      .then(this.updateVideosList)
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the movies. Retry later!')
      });
  }

  private updateSeries() {
    this.$q(this.seriesService.getSeriesPromiseFunction(this.searchFilters))
      .then(this.updateVideosList)
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the series. Retry later!')
      });
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
    controller:['episodesService','seriesService','moviesService','$q', VideosController],
  });
