import appModule from '../../app.module';
import {FavoritesPostRequest, Movie} from '../../lib/openapi';
import {IComponentController} from "angular";

const cssPath = '/src/components/movieDetails/movieDetails.css';

class MovieDetailsController implements IComponentController {
  private userId: number;
  private movie: Movie;

  private posRating: any[] = new Array(0);
  private negRating: any[] = new Array(5);

  constructor($routeParams: any, private cssInjector: any, sessionService: any, private favoritesService: any, moviesService: any, private $q: any) {
    //  console.log($routeParams);
    this.userId = +sessionService.get('userId');

    this.$q(moviesService.getMovieByIdPromiseFunction(+$routeParams.id))
      .then((movie: Movie) => {
        this.movie = movie;
        //  console.log(movie);
        if (this.movie.rating) {
          this.posRating = new Array(this.movie.rating);
          this.negRating = new Array(5-this.movie.rating);
        }
      })
      .catch((e: any) => {
        console.error(e);
        alert('There was an error during the request of the movies. Retry later!')
      });
  }

  addVideoToFavorite() {
    const favoritesPostRequest: FavoritesPostRequest = {
      usersId: this.userId,
      moviesId: this.movie.id
    };
    //  console.log(favoritesPostRequest);

    this.$q(this.favoritesService.addFavoriteVideoPromiseFunction(favoritesPostRequest))
      .then((v: any) => {
        //  console.log(v);
        alert('Movie added to favorites');
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
  .component('myMovieDetails', {
    templateUrl: '/src/components/movieDetails/movieDetails.html',
    controller: ['$routeParams', 'cssInjector', 'sessionService', 'favoritesService', 'moviesService', '$q', MovieDetailsController],
  });
