import appModule from '../app.module';
import {EpisodesApi} from "../lib/openapi";
import {ISearchFilters} from "../models/SearchFilters";

appModule
  .service('episodesApi', EpisodesApi)
  .service('episodesService', ['episodesApi', function(episodesApi: EpisodesApi) {
    const getEpisodesByFilters = async function(filters: ISearchFilters) {
      return (await episodesApi.getEpisodes(filters.seriesId)).data;
    }

    this.getEpisodes = getEpisodesByFilters;

    this.getEpisodesPromiseFunction = (filters: ISearchFilters) => {
      return function (resolve: any, reject: any) {
        getEpisodesByFilters(filters).then(resolve).catch(reject);
      }
    }

    const getEpisodeById = async function(episodeId: number) {
      return (await episodesApi.getEpisodeById(episodeId)).data;
    }

    this.getEpisodeByIdPromiseFunction = (id: number) => {
      return function (resolve: any, reject: any) {
        getEpisodeById(id).then(resolve).catch(reject);
      }
    }
  }]);
