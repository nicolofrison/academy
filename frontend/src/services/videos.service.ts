import appModule from '../app.module';
import {VideosApi} from "../lib/openapi";
import Filters from "../models/SearchFilters";

appModule
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
  }]);
