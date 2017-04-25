'use strict';

export default function routers($stateProvider) {
  'ngInject';

  $stateProvider.state('feed', {
    url: '/feed',
    template: require('./feed/feed.html'),
    controller: 'FeedController',
    controllerAs: 'vm',
    authenticate: true
  })
  .state('showcase', {
    url: '/showcase/:showcaseId',
    template: require('./showcase/showcase.html'),
    controller: 'ShowCaseController',
    controllerAs: 'vm',
    authenticate: true
  })
  .state('showroom', {
    url: '/showroom/:userId',
    template: require('./showroom/showroom.html'),
    controller: 'ShowRoomController',
    controllerAs: 'vm',
    authenticate: true
  })
  .state('followers', {
    url: '/showroom/:userId/followers',
    template: require('./followers/followers.html'),
    controller: 'FollowersController',
    controllerAs: 'vm',
    authenticate: true
  })
  .state('followees', {
    url: '/showroom/:userId/followees',
    template: require('./followees/followees.html'),
    controller: 'FolloweesController',
    controllerAs: 'vm',
    authenticate: true
  })
  // .state('showroomInfo', {
  //   url: '/showroom/:userId',
  //   template: require('./showroom/showroom.html'),
  //   controller: 'ShowRoomController',
  //   controllerAs: 'vm'
  // })
  .state('spotlight', {
    url: '/spotlight',
    template: require('./spotlight/spotlight.html'),
    controller: 'SpotlightController',
    controllerAs: 'vm',
    authenticate: true
  })
  .state('notification', {
    url: '/notification',
    template: require('./notification/notification.html'),
    controller: 'NotificationController',
    controllerAs: 'vm',
    authenticate: true
  })
  .state('search', {
    url: '/search/:q',
    template: require('./search/search.html'),
    controller: 'SearchControlller',
    controllerAs: 'vm',
    authenticate: true
  });
}
