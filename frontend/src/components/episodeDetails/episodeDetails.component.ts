import appModule from '../../app.module';
import {Episode} from '../../lib/openapi';

const cssPath = '/src/components/movieDetails/movieDetails.css';

appModule
  .component('myEpisodeDetails', {
    templateUrl: '/src/components/episodeDetails/episodeDetails.html',
    controller: ['$routeParams', 'cssInjector', 'episodesService', 'favoritesService', 'sessionService', '$q', function ($routeParams, cssInjector, episodesService, favoritesService, sessionService, $q) {
      //  console.log($routeParams);
      this.userId = +sessionService.get('userId');

      $q(episodesService.getEpisodeByIdPromiseFunction(+$routeParams.id))
        .then((episode: Episode) => {
          this.episode = episode;
          console.log(episode);
        })
        .catch((e: any) => {
          console.error(e);
          alert('There was an error during the request of the movies. Retry later!')
        });

      this.$onInit = function () {
        cssInjector.add(cssPath);
      };
      this.$onDestroy = function () {
        cssInjector.remove(cssPath);
      };
    }],
  });
