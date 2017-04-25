'use strict';

import $ from 'jquery';
import angular from 'angular';

export default class ShowRoomController {
  // 기본 값 설정
  userId = '';
  userInfo = {user: {
    followers: {
      count: 0
    },
    followees: {
      count: 0
    }
  }
  };
  showcasesList = [];
  enviedList = [];
  /*@ngInject*/
  constructor($scope, $stateParams, $window, User, Auth) {
    //console.log($stateParams);
    this.$window = $window;
    this.User = User;
    this.Auth = Auth;

    this.userId = $stateParams.userId;
  }

  $onInit() {

    if (this.userId.length === 0) {
      this.Auth.getCurrentUserSync().$promise
        .then(function(result) {
          this.userId = result._id;
          this.userInfo = result;
          this.showroomInfo();
        }.bind(this));
    } else {
      // 1. 기본 정보
      this.User.info({id: this.userId}, function(info) {
        console.log(info.data);
        this.userInfo = info.data;

        this.showroomInfo();
      }.bind(this), function(err) {
        alert(err.data.message);
        console.log(err);
      });
    }
  }

  showroomInfo() {
    console.log(this.userId);

    // 1. showcase list
    this.User.get({id: this.userId, controller: 'showcases'}, function(info) {
      console.log(info.data);
      this.showcasesList = info.data;
      //this.userInfo = info.data;
    }.bind(this));

    // 2. envied - 아직 구현 되지 않음
    // this.User.get({id: this.userId, controller: 'envied-showcases'}, function(info) {
    //   console.log(info.data);
    //   this.enviedInfo = info.data;
    // }.bind(this));
  }
}
