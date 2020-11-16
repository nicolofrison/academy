import appModule from '../app.module';
import {SeriesApi} from "../lib/openapi";
import {ISearchFilters} from "../models/SearchFilters";

appModule
  .service('seriesApi', SeriesApi)
  .service('seriesService', ['seriesApi', function(seriesApi: SeriesApi) {
    const getSeriesByFilters = async function(filters: ISearchFilters) {
      let orderBy: string = filters.orderBy ? '[' : undefined;
      if (orderBy) {
        orderBy += filters.orderBy[0];
        if (filters.orderBy[1]) {
          orderBy += ',' + filters.orderBy[1];
        }
      }

      return (await seriesApi.getSeries(filters.name, filters.genre, filters.releaseDate, filters.rating, filters.orderBy, filters.orderType)).data;
    }
    this.getSeries = getSeriesByFilters;

    this.getSeriesPromiseFunction = (filters: ISearchFilters) => {
      return function (resolve: any, reject: any) {
        getSeriesByFilters(filters).then(resolve).catch(reject);
      }
    }
  }]);
