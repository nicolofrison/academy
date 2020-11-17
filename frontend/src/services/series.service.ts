import appModule from '../app.module';
import {Episode, EpisodesApi, SeriesApi} from "../lib/openapi";
import {ISearchFilters, ISeriesFilters} from "../models/SearchFilters";

appModule
  .service('seriesApi', SeriesApi)
  .service('seriesService', ['seriesApi', 'episodesApi', function(seriesApi: SeriesApi, episodesApi: EpisodesApi) {
    const getSeriesByFilters = async function(filters: ISeriesFilters) {
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

    const getSeriesSeasonsByFilters = async function(filters: ISeriesFilters) {
      const episodes: Episode[] = (await episodesApi.getEpisodes(filters.seriesId)).data;
      const seasons: number[] = [];

      episodes
        .forEach((e) => {
          if (!seasons.find((s) => s === e.seasonNumber)) {
            seasons.push(e.seasonNumber);
          }
        })
      seasons.sort();

      return seasons;
    }

    this.getSeriesSeasonsPromiseFunction = (filters: ISeriesFilters) => {
      return function (resolve: any, reject: any) {
        getSeriesSeasonsByFilters(filters).then(resolve).catch(reject);
      }
    }

    this.getSeriesPromiseFunction = (filters: ISeriesFilters) => {
      return function (resolve: any, reject: any) {
        getSeriesByFilters(filters).then(resolve).catch(reject);
      }
    }

    const getSerieById = async function(serieId: number) {
      return (await seriesApi.getSerieById(serieId)).data;
    }

    this.getSerieByIdPromiseFunction = (id: number) => {
      return function (resolve: any, reject: any) {
        getSerieById(id).then(resolve).catch(reject);
      }
    }
  }]);
