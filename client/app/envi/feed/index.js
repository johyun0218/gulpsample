'use strict';

import angular from 'angular';
import FeedController from './feed.controller';
//import Feeds from './feeds';
//import FeedService from './feeds.service';

export default angular.module('envicase3App.feed', [])
  .controller('FeedController', FeedController)
  .name;
