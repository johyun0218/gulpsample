'use strict';

import $ from 'jquery';
import angular from 'angular';

export default class FollowersController {
  followersInfo = {};
  /*@ngInject*/
  constructor($scope, $stateParams, $window, User) {
    console.log($stateParams);
    this.$window = $window;
    this.User = User;
    this.userId = $stateParams.userId;

    //console.log(User.info);
  }

  $onInit() {
    this.User.info({id: this.userId, controller: 'followers'}, function(info) {
      console.log(info.data);
      this.followersInfo = info.data;
    }.bind(this));
  }
}
