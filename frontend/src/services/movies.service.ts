import appModule from '../app.module';
import {MoviesApi} from "../lib/openapi";
import {ISearchFilters} from "../models/SearchFilters";

appModule
  .service('moviesApi', MoviesApi)
  .service('moviesService', ['moviesApi', function(moviesApi: MoviesApi) {
    const getMoviesByFilters = async function(filters: ISearchFilters) {
      let orderBy: string = filters.orderBy ? '[' : undefined;
      if (orderBy) {
        orderBy += filters.orderBy[0];
        if (filters.orderBy[1]) {
          orderBy += ',' + filters.orderBy[1];
        }
      }

      return (await moviesApi.getMovies(filters.name, filters.genre, filters.releaseDate, filters.rating, filters.orderBy, filters.orderType)).data;
    }
    this.getMovies = getMoviesByFilters;

    this.getMoviesPromiseFunction = (filters: ISearchFilters) => {
      return function (resolve: any, reject: any) {
        getMoviesByFilters(filters).then(resolve).catch(reject);
      }
    }
  }]);
