'use strict';

import angular from 'angular';
import {
    InfiniteScrollService
} from './infinite.scroll.service';

export default angular.module('envicase3App.scroll', [])
    .factory('Scroll', InfiniteScrollService)
    .name;
