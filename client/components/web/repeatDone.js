'use strict';

import angular from 'angular';

export default angular.module('envicase3App.repeatDone', [])
  .directive('repeatDone', function() {
    return function(scope, element, attrs) {
      if(scope.$last) {
        scope.$eval(attrs.repeatDone);
      }
    };
  })
  .name;
