'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('envicase3App.login', [])
  .controller('LoginController', LoginController)
  .name;
