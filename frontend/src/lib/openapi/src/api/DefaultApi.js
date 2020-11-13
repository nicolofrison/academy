/**
 * netflop
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import Episodes from '../model/Episodes';
import InlineObject from '../model/InlineObject';
import InlineObject1 from '../model/InlineObject1';
import InlineObject2 from '../model/InlineObject2';
import InlineObject3 from '../model/InlineObject3';
import InlineObject4 from '../model/InlineObject4';
import InlineResponse200 from '../model/InlineResponse200';
import Movies from '../model/Movies';
import OneOfMoviesSeries from '../model/OneOfMoviesSeries';
import Review from '../model/Review';
import Series from '../model/Series';

/**
* Default service.
* @module api/DefaultApi
* @version 1.0
*/
export default class DefaultApi {

    /**
    * Constructs a new DefaultApi. 
    * @alias module:api/DefaultApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the getEpisodes operation.
     * @callback module:api/DefaultApi~getEpisodesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Episodes>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Your GET endpoint
     * @param {module:api/DefaultApi~getEpisodesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Episodes>}
     */
    getEpisodes(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [Episodes];
      return this.apiClient.callApi(
        '/episodes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getFavorites operation.
     * @callback module:api/DefaultApi~getFavoritesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/OneOfMoviesSeries>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Your GET endpoint
     * @param {Object} opts Optional parameters
     * @param {Number} opts.usersId 
     * @param {module:api/DefaultApi~getFavoritesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/OneOfMoviesSeries>}
     */
    getFavorites(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'usersId': opts['usersId']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [OneOfMoviesSeries];
      return this.apiClient.callApi(
        '/favorites', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getLikes operation.
     * @callback module:api/DefaultApi~getLikesCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Your GET endpoint
     * @param {Object} opts Optional parameters
     * @param {module:model/InlineObject2} opts.inlineObject2 
     * @param {module:api/DefaultApi~getLikesCallback} callback The callback function, accepting three arguments: error, data, response
     */
    getLikes(opts, callback) {
      opts = opts || {};
      let postBody = opts['inlineObject2'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/likes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getMovies operation.
     * @callback module:api/DefaultApi~getMoviesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Movies>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Your GET endpoint
     * @param {module:api/DefaultApi~getMoviesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Movies>}
     */
    getMovies(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [Movies];
      return this.apiClient.callApi(
        '/movies', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getReviews operation.
     * @callback module:api/DefaultApi~getReviewsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Review>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Your GET endpoint
     * @param {Object} opts Optional parameters
     * @param {Number} opts.moviesId 
     * @param {Number} opts.seriesId 
     * @param {module:api/DefaultApi~getReviewsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Review>}
     */
    getReviews(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'moviesId': opts['moviesId'],
        'seriesId': opts['seriesId']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [Review];
      return this.apiClient.callApi(
        '/reviews', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getSeries operation.
     * @callback module:api/DefaultApi~getSeriesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Series>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Your GET endpoint
     * @param {module:api/DefaultApi~getSeriesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Series>}
     */
    getSeries(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [Series];
      return this.apiClient.callApi(
        '/series', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the getVideos operation.
     * @callback module:api/DefaultApi~getVideosCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/OneOfMoviesSeries>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Your GET endpoint
     * @param {module:api/DefaultApi~getVideosCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/OneOfMoviesSeries>}
     */
    getVideos(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [OneOfMoviesSeries];
      return this.apiClient.callApi(
        '/videos', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the postFavorites operation.
     * @callback module:api/DefaultApi~postFavoritesCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/InlineObject4} opts.inlineObject4 
     * @param {module:api/DefaultApi~postFavoritesCallback} callback The callback function, accepting three arguments: error, data, response
     */
    postFavorites(opts, callback) {
      opts = opts || {};
      let postBody = opts['inlineObject4'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/favorites', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the postLogin operation.
     * @callback module:api/DefaultApi~postLoginCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse200} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/InlineObject} opts.inlineObject 
     * @param {module:api/DefaultApi~postLoginCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InlineResponse200}
     */
    postLogin(opts, callback) {
      opts = opts || {};
      let postBody = opts['inlineObject'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse200;
      return this.apiClient.callApi(
        '/login', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the postRegister operation.
     * @callback module:api/DefaultApi~postRegisterCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/InlineObject1} opts.inlineObject1 
     * @param {module:api/DefaultApi~postRegisterCallback} callback The callback function, accepting three arguments: error, data, response
     */
    postRegister(opts, callback) {
      opts = opts || {};
      let postBody = opts['inlineObject1'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/register', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the postReviews operation.
     * @callback module:api/DefaultApi~postReviewsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/InlineObject3} opts.inlineObject3 
     * @param {module:api/DefaultApi~postReviewsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    postReviews(opts, callback) {
      opts = opts || {};
      let postBody = opts['inlineObject3'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/reviews', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
