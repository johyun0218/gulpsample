'use strict';

export function ShowcaseResource(Restangular) {
  'ngInject';

  var model = Restangular.all('showcase');

  

  var Showcase = {
    getInfo(params) {
      return model.customGET(params.id, {});
    },
    getComments(params) {
      return model.one(params.id).customGET('comments', params);
    },
    addComment(params) {
      return model.one(params.id).post('comments', params);
    },
    deleteComment(params) {
      return model.one(params.id, 'comments').one(params.commentId).remove();
    }
  };

  return Showcase;
}
