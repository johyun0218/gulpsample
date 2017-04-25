'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, RestangularProvider) {
  'ngInject';

  RestangularProvider.setBaseUrl('api');

  RestangularProvider.addRequestInterceptor(function(element) {
    return element;
  });

  RestangularProvider.addResponseInterceptor(function(data) {
    return data;
  });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}
