import appModule from './app.module';

//  services
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
      .otherwise('/home');
  }])
  .factory('storageService', () => ({
    get(key: string): any {
      console.log('get');
      return sessionStorage.getItem(key);
    },
    save(key: string, data: any) {
      console.log('set');
      sessionStorage.setItem(key, data);
    },
  }))
  .service('episodesApi', EpisodesApi)
  .controller('appCtrl', ['storageService', '$scope', 'episodesApi', async (storageService: any, $scope: any, episodesApi: EpisodesApi) => {
    console.log(await episodesApi.getEpisodes());
    $scope.isLogged = () => storageService.get('loggedIn') === 'true';
    videosService.setBaseUrl(apiBaseUrl);
    console.log(await videosService.getVideos());
  }]);
