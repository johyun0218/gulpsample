'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';
import {
  UtilThumbListService
} from './util.thumbList.service';

export default angular.module('envicase3App.util', [])
  .factory('Util', UtilService)
  .factory('UtilThumbList', UtilThumbListService)
  .name;
