import appModule from '../app.module';
import {EpisodesApi} from "../lib/openapi";
import {ISeriesFilters} from "../models/SearchFilters";

appModule
  .service('episodesApi', EpisodesApi)
  .service('episodesService', ['episodesApi', function(episodesApi: EpisodesApi) {
    const getEpisodesByFilters = async function(filters: ISeriesFilters) {
      return (await episodesApi.getEpisodes(filters.seriesId)).data;
    }
    
    this.getEpisodes = getEpisodesByFilters;

    this.getEpisodesPromiseFunction = (filters: ISeriesFilters) => {
      return function (resolve: any, reject: any) {
        getEpisodesByFilters(filters).then(resolve).catch(reject);
      }
    }
  }]);
