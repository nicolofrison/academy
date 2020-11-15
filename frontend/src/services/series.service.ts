import appModule from '../app.module';
import {SeriesApi} from "../lib/openapi";
import Filters from "../models/SearchFilters";

appModule
  .service('seriesApi', SeriesApi)
  .service('seriesService', ['seriesApi', function(seriesApi: SeriesApi) {
    this.getSeries = (filters: Filters) => {
      let orderBy: string = filters.orderBy ? '[' : undefined;
      if (orderBy) {
        orderBy += filters.orderBy[0];
        if (filters.orderBy[1]) {
          orderBy += ',' + filters.orderBy[1];
        }
      }

      return function (resolve: any, reject: any) {
        seriesApi.getSeries(filters.name, filters.genre, filters.releaseDate, filters.rating, filters.orderBy, filters.orderType).then(resolve).catch(reject);
      }
    }
  }]);
