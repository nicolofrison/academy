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

import ApiClient from '../ApiClient';

/**
 * The Movies model module.
 * @module model/Movies
 * @version 1.0
 */
class Movies {
    /**
     * Constructs a new <code>Movies</code>.
     * @alias module:model/Movies
     */
    constructor() { 
        
        Movies.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Movies</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Movies} obj Optional instance to populate.
     * @return {module:model/Movies} The populated <code>Movies</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Movies();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('genre')) {
                obj['genre'] = ApiClient.convertToType(data['genre'], 'String');
            }
            if (data.hasOwnProperty('duration')) {
                obj['duration'] = ApiClient.convertToType(data['duration'], 'String');
            }
            if (data.hasOwnProperty('actors')) {
                obj['actors'] = ApiClient.convertToType(data['actors'], 'String');
            }
            if (data.hasOwnProperty('releaseDate')) {
                obj['releaseDate'] = ApiClient.convertToType(data['releaseDate'], 'String');
            }
            if (data.hasOwnProperty('creationDate')) {
                obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'String');
            }
            if (data.hasOwnProperty('quality')) {
                obj['quality'] = ApiClient.convertToType(data['quality'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Number} id
 */
Movies.prototype['id'] = undefined;

/**
 * @member {String} description
 */
Movies.prototype['description'] = undefined;

/**
 * @member {String} genre
 */
Movies.prototype['genre'] = undefined;

/**
 * @member {String} duration
 */
Movies.prototype['duration'] = undefined;

/**
 * @member {String} actors
 */
Movies.prototype['actors'] = undefined;

/**
 * @member {String} releaseDate
 */
Movies.prototype['releaseDate'] = undefined;

/**
 * @member {String} creationDate
 */
Movies.prototype['creationDate'] = undefined;

/**
 * @member {String} quality
 */
Movies.prototype['quality'] = undefined;






export default Movies;

