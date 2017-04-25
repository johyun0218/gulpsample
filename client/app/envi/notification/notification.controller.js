'use strict';

export default class NotificationController {

  notiList = [];
  notiPromise = null;

  delay = 0;
	minDuration = 0;
	message = 'Please Wait...';
	backdrop = true;
	templateUrl = '';

  /*@ngInject*/
  constructor($scope, $rootScope, Notification) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.Notification = Notification;
  }

  $onInit() {
    this.getList();
  }

  getList() {
    this.notiPromise = this.Notification.getList()
      .then(result => this.notiList = result.data)
      .catch(err => console.log(err));
  }
}