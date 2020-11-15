import appModule from './app.module';

//  models
import Filters from "./models/SearchFilters";

//  services
import { videosService } from './services/videos';
import {EpisodesApi, VideosApi} from "./lib/openapi/api";

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
  .directive('ngAlias', ['$compile', function ngAlias($compile) {
    return {
      restrict: "A",
      link: function(scope: any, element: any, attrs: any) {
        var args = attrs.ngAlias.split('as').map(function(elm: any){return elm.replace(/ /g,'')});

        scope[args[0]] = '';

        var dot: string[] = args[1].split('.');

        var object: any = {};

        dot.forEach(function(value: any, index: any){
          index === 0
            ? object = scope[value]
            : object = object[value] === null ? object[value] = {} : object[value];
        });

        console.log(object)

        scope[args[0]] = object;
      }
    };
  }])
  .factory('storageService', () => ({
    get(key: string): any {
      //  console.log('get');
      return sessionStorage.getItem(key);
    },
    save(key: string, data: any) {
      //  console.log('set');
      sessionStorage.setItem(key, data);
    },
  }))
  .service('videosApi', VideosApi)
  .service('videosService', ['videosApi', function(videosApi: VideosApi) {
    this.getVideos = (filters: Filters) => {
      let type: 'movies' | 'series' = undefined;
      if (filters.type) {
        type = filters.type;
      }

      let orderBy: string = filters.orderBy ? '[' : undefined;
      if (orderBy) {
        orderBy += filters.orderBy[0];
        if (filters.orderBy[1]) {
          orderBy += ',' + filters.orderBy[1];
        }
      }

      return function (resolve: any, reject: any) {
        videosApi.getVideos(filters.name, filters.genre, filters.releaseDate, filters.rating, type, orderBy).then(resolve).catch(reject);
      }
    }
  }])
  .service('episodesApi', EpisodesApi)
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
