'use strict';

import angular from 'angular';
import FollowersController from './followers.controller';

export default angular.module('envicase3App.followers', [])
  .controller('FollowersController', FollowersController)
  .name;
