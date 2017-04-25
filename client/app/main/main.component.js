import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';
  slides = [];

  /*@ngInject*/
  constructor($http, $scope, initValue, Auth, Carousel) {
    this.$http = $http;
    this.$scope = $scope;
    this.initValue = initValue;
    this.Carousel = Carousel;
    this.isLoggedIn = Auth.isLoggedInSync;
    //console.log(initValue);
  }

  $onInit() {
    this.slides.push({image: 'assets/images/test.jpg', title: 'title1', name: 'name1', description: 'description1'});
    this.slides.push({image: 'assets/images/test.jpg', title: 'title2', name: 'name2', description: 'description1'});
    this.slides.push({image: 'assets/images/test.jpg', title: 'title3', name: 'name3', description: 'description1'});
    this.slides.push({image: 'assets/images/test.jpg', title: 'title4', name: 'name4', description: 'description1'});
    this.slides.push({image: 'assets/images/test.jpg', title: 'title5', name: 'name5', description: 'description1'});
    this.slides.push({image: 'assets/images/test.jpg', title: 'title6', name: 'name6', description: 'description1'});
    this.slides.push({image: 'assets/images/test.jpg', title: 'title7', name: 'name7', description: 'description1'});
  }
}

export default angular.module('envicase3App.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
