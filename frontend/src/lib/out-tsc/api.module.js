"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("./api/api");
const angular = require("../angular/index");
const apiModule = angular.module('api', [])
    .factory('DefaultApi', api.DefaultApi);
exports.default = apiModule;
