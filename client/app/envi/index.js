'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';
import routing from './envi.routes';
import feed from './feed';
import showcase from './showcase';
import showroom from './showroom';
import followers from './followers';
import followees from './followees';
import spotlight from './spotlight';
import search from './search';
import newcase from './newcase';
import nontification from './notification';

import repeatDone from '../../components/web/repeatDone';

export default angular.module('envicase3App.envi', [uiRouter, feed, showcase, showroom, followers, followees, 
  spotlight, search, newcase, nontification, repeatDone])
  .config(routing)
  .name;
