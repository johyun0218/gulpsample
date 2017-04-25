'use strict';

export function SearchResource(Restangular) {
  'ngInject';

  var model = Restangular.all('search');

  var Search = {
    showcases(params) {
      return model.customGET('showcases', params);
    },
    users(params) {
      return model.customGET('users', params);
    },
    items(params) {
      return model.customGET('items', params);
    }
  };

  return Search;
}
