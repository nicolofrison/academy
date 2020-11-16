import '../row/row.component';
import appModule from '../../app.module';

function seriesController() {
  this.type = 'series';
  this.OrderType = 'desc';
  this.lastAddedOrderByCreationDate = 'creationDate';
  this.mostPopularOrderByViews = 'views';
  this.recommendedOrderByRatings = 'ratings';
  this.mostLikedOrderByLikes = 'likes';
}

appModule
  .component('mySeries', {
    templateUrl: '/src/components/series/series.html',
    controllerAs: 'seriesCtrl',
    controller: seriesController,
  });
