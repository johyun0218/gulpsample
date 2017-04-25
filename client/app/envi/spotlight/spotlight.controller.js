'use strict';

//import jquery from 'jquery';

export default class SpotlightController {
  topList = [];
  editorList = [];
  trendingList = [];

  topPromise = null;
  editorPromise = null;
  trendingPromise = null;

  delay = 0;
	minDuration = 0;
	message = 'Please Wait...';
	backdrop = true;
	templateUrl = '';


  /*@ngInject*/
  constructor($http, $scope, $stateParams, $window, Explore) {
    this.$http = $http;
    this.$window = $window;

    this.Explore = Explore;
  }

  $onInit() {
    this.getTopList();
    this.getEidtorList();
  }

  getTopList() {
    this.topPromise = this.Explore.getList({count: 10})
      .then(result => this.topList = result.data)
      .catch(err => console.log(err));
  }

  getEidtorList() {
    this.editorPromise = this.Explore.featured({count: 10})
      .then(result => this.editorList = result.data)
      .catch(err => console.log(err));
  }
}
