import appModule from '../app.module';
import {MoviesApi} from "../lib/openapi";
import {ISearchFilters} from "../models/SearchFilters";

appModule
  .service('moviesApi', MoviesApi)
  .service('moviesService', ['moviesApi', function(moviesApi: MoviesApi) {
    const getMoviesByFilters = async function(filters: ISearchFilters) {
      let orderBy: 'creationDate' | 'likes' | 'ratings' | 'views' = undefined;
      let orderType: 'asc' | 'desc' = undefined;
      if (filters.orderBy) {
        orderBy = filters.orderBy;
        if (filters.orderType) {
          orderType = filters.orderType;
        }
      }

      return (await moviesApi.getMovies(filters.name, filters.genre, filters.releaseDate, filters.rating, orderBy, orderType)).data;
    }
    this.getMovies = getMoviesByFilters;

    this.getMoviesPromiseFunction = (filters: ISearchFilters) => {
      return function (resolve: any, reject: any) {
        getMoviesByFilters(filters).then(resolve).catch(reject);
      }
    }
  }]);
