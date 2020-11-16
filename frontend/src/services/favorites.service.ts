import appModule from '../app.module';
import {Favorite, FavoritesApi, FavoritesPostRequest, Movie, Serie} from "../lib/openapi";
import {ISearchFilters} from "../models/SearchFilters";
import IVideo from "../models/Video";

appModule
  .service('favoritesApi', FavoritesApi)
  .service('favoritesService', ['favoritesApi', 'moviesService', 'seriesService', '$q', function(favoritesApi: FavoritesApi, moviesService: any, seriesService: any, $q: any) {
    const getFavoritesVideosByUserId = async (userId: number, filters: ISearchFilters = {}): Promise<IVideo[]> => {
      console.log('Service:');
      console.log(userId);
      const favorites: Favorite[] = (await favoritesApi.getFavorites(userId)).data;
      console.log(favorites);

      const videos: IVideo[] = [];

      if (!filters.type || filters.type === 'movies') {
        const moviesList: Movie[] = await moviesService.getMovies(filters);

        moviesList
          .forEach((m: Movie) => {
          const myVideo: IVideo = m as IVideo;
          myVideo.type = 'movie';
          myVideo.href = '/#!/moviedetails/' + m.id;

          if (favorites.find((f) => f.moviesId === myVideo.id)) {
            videos.push(myVideo);
          }
        });
      }

      if (!filters.type || filters.type === 'series') {
        const seriesList: Serie[] = await seriesService.getSeries(filters);
        console.log(seriesList);

        seriesList
          .forEach((s: Serie) => {
          const myVideo: IVideo = s as unknown as IVideo;
          myVideo.type = 'serie';
          myVideo.href = '/#!/seriedetails/' + s.id;

          if (favorites.find((f) => f.seriesId === myVideo.id)) {
            videos.push(myVideo);
          }
        });
      }


      return videos;
    }

    this.getFavoritesVideos = function (userId: number, filters: ISearchFilters) {
      return function (resolve: any, reject: any) {
        getFavoritesVideosByUserId(userId, filters).then(resolve).catch(reject);
      }
    }

    this.addFavoriteVideoPromiseFunction = (favoritesPostRequest: FavoritesPostRequest) => {
      return function (resolve: any, reject: any) {
        favoritesApi.postFavorites(favoritesPostRequest).then(resolve).catch(reject);
      }
    }
  }]);
