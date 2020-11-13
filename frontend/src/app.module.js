import angular from 'angular';
import 'angular-route';
import 'angular-css-injector';

const appModule = angular
  .module('app', [
    'ngRoute',
    'angular.css.injector',
    'swxSessionStorage',
  ]);
export default appModule;
