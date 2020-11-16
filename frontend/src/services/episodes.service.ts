import appModule from '../app.module';
import {EpisodesApi} from "../lib/openapi";

appModule
  .service('episodesApi', EpisodesApi);
