'use strict';

export function NotificationResource(Restangular) {
  'ngInject';

  var model = Restangular.all('noti');

  var Notification = {
    getList(params) {
      
      return model.customGET('', params);
    },
    read(ids) {
      var params = {ids: ids};
      return model.post('mark-as-read', params);
    }
  };

  return Notification;
}
