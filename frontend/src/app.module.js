import angular from 'angular';
// eslint-disable-next-line no-unused-vars
import ngRoute from 'angular-route';
// eslint-disable-next-line no-unused-vars

const appModule = angular
  .module('app', [
    'ngRoute',
    'angular.css.injector',
    'swxSessionStorage',
  ]);
export default appModule;
