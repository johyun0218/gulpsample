'use strict';

import angular from 'angular';

export default angular.module('envicase3App.newlines', [])
  .filter('newlines', function() {
    return function(text) {
      if (text) {
        return text.replace(/\n/g, '<br />');
      }
    }
  })
  .name;

