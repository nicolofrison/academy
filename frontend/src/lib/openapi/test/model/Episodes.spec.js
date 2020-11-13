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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Netflop);
  }
}(this, function(expect, Netflop) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Netflop.Episodes();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('Episodes', function() {
    it('should create an instance of Episodes', function() {
      // uncomment below and update the code to test Episodes
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be.a(Netflop.Episodes);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property genre (base name: "genre")', function() {
      // uncomment below and update the code to test the property genre
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property duration (base name: "duration")', function() {
      // uncomment below and update the code to test the property duration
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property actors (base name: "actors")', function() {
      // uncomment below and update the code to test the property actors
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property releaseDate (base name: "releaseDate")', function() {
      // uncomment below and update the code to test the property releaseDate
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property creationDate (base name: "creationDate")', function() {
      // uncomment below and update the code to test the property creationDate
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property quality (base name: "quality")', function() {
      // uncomment below and update the code to test the property quality
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property season (base name: "season")', function() {
      // uncomment below and update the code to test the property season
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property episode (base name: "episode")', function() {
      // uncomment below and update the code to test the property episode
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

    it('should have the property seriesId (base name: "seriesId")', function() {
      // uncomment below and update the code to test the property seriesId
      //var instane = new Netflop.Episodes();
      //expect(instance).to.be();
    });

  });

}));
