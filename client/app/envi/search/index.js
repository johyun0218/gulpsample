'use strict';

import angular from 'angular';
import SearchControlller from './search.controller';

export default angular.module('envicase3App.search', [])
  .controller('SearchControlller', SearchControlller)
  .name;
