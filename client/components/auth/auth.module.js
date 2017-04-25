'use strict';

import angular from 'angular';
import constants from '../../app/app.constants';
import util from '../util/util.module';
import ngCookies from 'angular-cookies';
import {
  authInterceptor
} from './interceptor.service';
import {
  routerDecorator
} from './router.decorator';
import {
  AuthService
} from './auth.service';
import {
  UserResource
} from './user.service';
import {
  NewsFeedResource
} from './newsfeed.service';
import {
  ShowcaseResource
} from './showcase.service';
import {
  SearchResource
} from './search.service';
import {
  NotificationResource
} from './notification.service';
import {
  ExploreResource
} from './explore.service';
import {
  FacebookResource
} from './facebook.service';

import uiRouter from 'angular-ui-router';

function addInterceptor($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
}

export default angular.module('envicase3App.auth', [constants, util, ngCookies, uiRouter])
  .factory('authInterceptor', authInterceptor)
  .run(routerDecorator)
  .factory('Auth', AuthService)
  .factory('User', UserResource)
  .factory('Newsfeed', NewsFeedResource)
  .factory('Showcase', ShowcaseResource)
  .factory('Search', SearchResource)
  .factory('Notification', NotificationResource)
  .factory('Explore', ExploreResource)
  .factory('Facebook', FacebookResource)
  .config(['$httpProvider', addInterceptor])
  .name;
