'use strict';

export function NewsFeedResource(Restangular) {
  'ngInject';

  var model = Restangular.all('newsfeed');

  var Newsfeed = {
    getList(params) {
      
      return model.customGET('', params);
    }
  };

  return Newsfeed;
}
