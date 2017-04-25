'use strict';

import angulr from 'angular';
import routes from './newcase.routes';

import NewcaseController from './newcase.controller';
import SearchItemController from './searchitem/searchitem.controller';

export default angular.module('envicase3App.newcase', [])
  .config(routes)
  .controller('NewcaseController', NewcaseController)
  .controller('SearchItemController', SearchItemController)
  .name;
