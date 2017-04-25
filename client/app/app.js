'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
import RestangularProvider from 'restangular';
import cgBusy from 'angular-busy';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngInfiniteScroll from 'ng-infinite-scroll';
import ngFileUpload from 'ng-file-upload';
import uiCarousel from 'angular-ui-carousel';
import angularMoment from 'angular-moment';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import _Enter from '../components/directives/enter';
import _LazySrc from '../components/directives/lazysrc';
import _Croppie from '../components/directives/croppie';
import _NewLine from '../components/directives/newline';
//import _Scroll from '../components/scroll/infinite.scroll.module';
import _Modal from '../components/modal/modal.service';
import account from './account';
import admin from './admin';
import envi from './envi';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';



import './app.css';

angular.module('envicase3App', [ngCookies, ngResource, ngSanitize, ngAnimate, 'btford.socket-io', uiRouter, RestangularProvider,
  uiBootstrap, ngInfiniteScroll, ngFileUpload, cgBusy,
  _Auth, _Enter, _LazySrc, _Croppie, _Modal, _NewLine,
  envi, account, admin, navbar, footer, main, constants, socket, util,
  'ui.carousel','angularMoment'
])
  .config(routeConfig)
  .value('initValue', envicase.data) // _index.html 에서 생성됨
  .run(function($rootScope, $location, $window, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    window.localStorage.clear();

    $window.fbAsyncInit = function() {
      FB.init({ 
        appId: '1253169141448950',
        status: true, 
        cookie: true, 
        xfbml: true,
        version: 'v2.4'
      });
    };

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });

    $rootScope.$on('$locationChangeSuccess', function() {
      $rootScope.$$listeners['infiniteScroll'] = [];

      if($rootScope.previousLocation == $location.path()) {
        window.localStorage.setItem('back', 1);
      } else {
        window.localStorage.removeItem('back');
      }
      $rootScope.previousLocation = $rootScope.actualLocation;
      $rootScope.actualLocation = $location.path();
    });

    


    angular.element($window).bind('scroll', function(e) {
      //console.log($(window).scrollTop() + $(window).height() + ':' + $(document).height());
      if($(window).scrollTop() + $(window).height() == $(document).height() && $(window).scrollTop() > 700) {
        $rootScope.$broadcast('infiniteScroll', {});
      }

    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['envicase3App'], {
      strictDi: true
    });
  });
