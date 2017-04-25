'use strict';

export function ExploreResource(Restangular) {
  'ngInject';

  var model = Restangular.all('explore');

  var Explore = {
    getList(params) {
      return model.customGET('', params);
    },
    trending(params) {
      return model.customGET('trending', params);
    },
    featured(params) {
      return model.customGET('featured', params);
    }
  };
  return Explore;
}
