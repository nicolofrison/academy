import appModule from '../../app.module';
import '../row/row.component';
import {FavoritesPostRequest, Movie, Serie} from '../../lib/openapi';
import {ISeriesFilters} from "../../models/SearchFilters";
import {IComponentController} from "angular";

const cssPath = '/src/components/movieDetails/movieDetails.css';

class SerieDetailsController implements IComponentController {
  private userId: number;
  private serie: Serie;
  private rowType: string = 'episodes';
  private seasons: number[];
  private selectedSeason: number;

  private posRating: any[] = new Array(0);
  private negRating: any[] = new Array(5);

  constructor($routeParams: any, private cssInjector: any, sessionService: any, private favoritesService: any, seriesService: any, private $q: any) {
    //  console.log($routeParams);

    this.$q(seriesService.getSerieByIdPromiseFunction(+$routeParams.id))
      .then((serie: Serie) => {
        this.serie = serie;
        console.log(serie);
        if (this.serie.rating) {
          this.posRating = new Array(this.serie.rating);
          this.negRating = new Array(5-this.serie.rating);
        }
      })
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the serie. Retry later!')
      });

    const seriesFilter: ISeriesFilters = {seriesId: +$routeParams.id};
    $q(seriesService.getSeriesSeasonsPromiseFunction(seriesFilter))
      .then((seasons: number[]) => {
        this.seasons = seasons;
        this.selectedSeason = this.seasons[0];
      })
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the movies. Retry later!')
      });
  }

  addVideoToFavorite() {
    const favoritesPostRequest: FavoritesPostRequest = {
      usersId: +this.userId,
      seriesId: +this.serie.id
    };
    //  console.log(favoritesPostRequest);

    this.$q(this.favoritesService.addFavoriteVideoPromiseFunction(favoritesPostRequest))
      .then((v: any) => {
        //  console.log(v);
        alert('Serie added to favorites');
      })
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the movies. Retry later!')
      });
  }

  $onInit(): void {
    this.cssInjector.add(cssPath);
  }

  $onDestroy = function () {
    this.cssInjector.remove(cssPath);
  };

}

appModule
  .component('mySerieDetails', {
    templateUrl: '/src/components/serieDetails/serieDetails.html',
    controller: ['$routeParams', 'cssInjector', 'sessionService', 'favoritesService', 'seriesService', '$q', SerieDetailsController],
  });
