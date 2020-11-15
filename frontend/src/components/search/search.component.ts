import appModule from '../../app.module';
import SearchFilters from '../../models/SearchFilters';

const cssPath = '/src/components/search/search.css';

appModule
  .component('mySearch', {
    templateUrl: '/src/components/search/search.html',
    controllerAs: 'searchController',
    controller: ['cssInjector', '$location', function (cssInjector, $location) {
      this.$onInit = function() {
        cssInjector.add(cssPath);
      };
      this.$onDestroy = function() {
        cssInjector.remove(cssPath);
      };

      this.searchForm = {};
      this.search = () => {
        console.log('searchController.search()');

        const filters: SearchFilters = new SearchFilters();
        filters.name = this.searchForm.name;
        filters.genre = this.searchForm.genre;
        filters.releaseDate = this.searchForm.releaseDate;
        filters.rating = this.searchForm.rating;
        if (this.searchForm.type && this.searchForm.type.movies !== this.searchForm.type.series) {
          filters.type = this.searchForm.type.movies ? 'movies' : 'series';
        }

        console.log('Filters:');
        console.log(filters);

        $location.url('/searchresults' + filters.toUrlQuery(true));
      }
    }],
  });
