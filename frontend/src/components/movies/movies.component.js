import '../row/row.component';
import appModule from '../../app.module';

function moviesController() {
  this.type = 'movies';
  this.OrderType = 'desc';
  this.lastAddedOrderByCreationDate = 'creationDate';
  this.mostPopularOrderByViews = 'views';
  this.recommendedOrderByRatings = 'ratings';
  this.mostLikedOrderByLikes = 'likes';
}

appModule
  .component('myMovies', {
    templateUrl: '/src/components/movies/movies.html',
    controllerAs: 'moviesCtrl',
    controller: moviesController
  });
