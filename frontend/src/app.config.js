import appModule from './app.module';

//  services
import { videosService } from './services/episodes';

//  components
import './components/navbar/navbar.component';
import './components/login/login.component';

//  variables
const apiBaseUrl = 'http://localhost:3100';

appModule
  .config(['$routeProvider', function config($routeProvider) {
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
      .when('/details', {
        template: '<my-details></my-details>',
      })
      .when('/signUp', {
        template: '<my-sign-up></my-sign-up>',
      })
      .when('/profile', {
        template: '<my-profile></my-profile>',
      })
      .when('/filmdetails', {
        template: '<my-film-details></my-film-details>',
      })
      .otherwise('/home');
  }])
  .factory('storageService', () => ({
    get(key) {
      console.log('get');
      return sessionStorage.getItem(key);
    },
    save(key, data) {
      console.log('set');
      sessionStorage.setItem(key, data);
    },
  }))
  .controller('appCtrl', ['storageService', '$scope', async (storageService, $scope) => {
    $scope.isLogged = () => storageService.get('loggedIn') === 'true';
    videosService.setBaseUrl(apiBaseUrl);
    console.log(await videosService.getVideos());
  }]);
