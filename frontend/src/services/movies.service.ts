import appModule from '../app.module';
import {MoviesApi} from "../lib/openapi";
import Filters from "../models/SearchFilters";

appModule
  .service('moviesApi', MoviesApi)
  .service('moviesService', ['moviesApi', function(moviesApi: MoviesApi) {
    this.getMovies = (filters: Filters) => {
      let orderBy: string = filters.orderBy ? '[' : undefined;
      if (orderBy) {
        orderBy += filters.orderBy[0];
        if (filters.orderBy[1]) {
          orderBy += ',' + filters.orderBy[1];
        }
      }

      return function (resolve: any, reject: any) {
        moviesApi.getMovies(filters.name, filters.genre, filters.releaseDate, filters.rating, filters.orderBy, filters.orderType).then(resolve).catch(reject);
      }
    }
  }]);
