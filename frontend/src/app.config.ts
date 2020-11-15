import appModule from './app.module';

//  directives
import './directives/ngAlias.directive'

//  services
import './services/episodes.service';
import './services/videos.service';
import './services/session.service';
import { videosService } from './services/videos';
import {EpisodesApi} from "./lib/openapi/api";

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
import './components/search_results/search_results.component';

//  variables
const apiBaseUrl: string = 'http://localhost:3100';

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
      .when('/moviedetails', {
        template: '<my-movie-details></my-movie-details>',
      })
      .when('/seriedetails', {
        template: '<my-serie-details></my-serie-details>',
      })
      .when('/searchresults', {
        template: '<my-search-results></my-search-results>',
      })
      .otherwise('/home');
  }])
  .controller('appCtrl', ['storageService', '$scope', 'episodesApi', async (storageService: any, $scope: any, episodesApi: EpisodesApi) => {
    /*
    try {
      console.log(await episodesApi.getEpisodes());
    } catch (e) {
      console.log('Get episodes error';
    }
    */
    $scope.isLogged = () => storageService.get('loggedIn') === 'true';
    videosService.setBaseUrl(apiBaseUrl);
  }]);
