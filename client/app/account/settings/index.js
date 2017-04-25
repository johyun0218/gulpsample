'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('envicase3App.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
