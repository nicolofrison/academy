import appModule from '../app.module';
import {SeriesApi} from "../lib/openapi";
import {ISearchFilters} from "../models/SearchFilters";

appModule
  .service('seriesApi', SeriesApi)
  .service('seriesService', ['seriesApi', function(seriesApi: SeriesApi) {
    const getSeriesByFilters = async function(filters: ISearchFilters) {
      let orderBy: 'creationDate' | 'likes' | 'ratings' | 'views' = undefined;
      let orderType: 'asc' | 'desc' = undefined;
      if (filters.orderBy) {
        orderBy = filters.orderBy;
        if (filters.orderType) {
          orderType = filters.orderType;
        }
      }

      return (await seriesApi.getSeries(filters.name, filters.genre, filters.releaseDate, filters.rating, orderBy, orderType)).data;
    }
    this.getSeries = getSeriesByFilters;

    this.getSeriesPromiseFunction = (filters: ISearchFilters) => {
      return function (resolve: any, reject: any) {
        getSeriesByFilters(filters).then(resolve).catch(reject);
      }
    }
  }]);
