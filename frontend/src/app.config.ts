import appModule from './app.module';

//  directives
import './directives/ngAlias.directive'

//  services
import './services/episodes.service';
import './services/favorites.service';
import './services/movies.service';
import './services/series.service';
import './services/session.service';

//  components
import './components/navbar/navbar.component';
import './components/login/login.component';
import './components/search/search.component';
import './components/signUp/signUp.component';
import './components/profile/profile.component';
import './components/home/home.component';
import './components/movies/movies.component';
import './components/movie_details/movie_details.component';
import './components/series/series.component';
import './components/serie_details/serie_details.component';
import './components/searchResults/searchResults.component';
import './components/favorites/favorites.component';

appModule
  .config(['$routeProvider', function config($routeProvider: any) {
    $routeProvider
      .when('/login', {
        template: '<my-login></my-login>',
      })
      .when('/home', {
        template: '<my-home></my-home>',
      })
      .when('/search', {
        template: '<my-search></my-search>',
      })
      .when('/movies', {
        template: '<my-movies></my-movies>',
      })
      .when('/series', {
        template: '<my-series></my-series>',
      })
      .when('/signUp', {
        template: '<my-sign-up></my-sign-up>',
      })
      .when('/profile', {
        template: '<my-profile></my-profile>',
      })
      .when('/episodedetails/:id', {
        template: '<my-episode-details></my-episode-details>',
      })
      .when('/moviedetails/:id', {
        template: '<my-movie-details></my-movie-details>',
      })
      .when('/seriedetails/:seriesId', {
        template: '<my-serie-details></my-serie-details>',
      })
      .when('/searchresults', {
        template: '<my-search-results></my-search-results>',
      })
      .when('/favorites', {
        template: '<my-favorites></my-favorites>',
      })
      .otherwise('/home');
  }])
  .controller('appCtrl', ['sessionService', '$scope', async (sessionService: any, $scope: any) => {
    $scope.isLogged = () => sessionService.get('loggedIn') === 'true';
  }]);
