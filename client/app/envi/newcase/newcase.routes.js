'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('newcase', {
    url: '/newcase',
    template: require('./newcase.html'),
    controller: 'NewcaseController',
    controllerAs: 'vm',
    authenticate: true
  })
  
}
