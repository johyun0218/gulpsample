'use strict';

import angular from 'angular';

export default angular.module('envicase3App.onEnter', [])
  .directive('onEnter', function() {
    return {
      link(scope, element, attrs) {
        element.on('keydown keypress', function (event) {
          if(event.which === 13) {
            scope.$apply(function (){
                scope.$eval(attrs.onEnter);
            });

            event.preventDefault();
          }
        });
      }
    }
  })
  .name;


// export function EnterService(scope, element, attrs) {
//   'ngInject';

//   return function (scope, element, attrs) {
//       element.bind('keydown keypress', function(event) {
//         if(event.which === 13) {
//           scope.$apply(function() {
//             scope.$eval(attrs.ngEnter);
//           });

//           event.preventDefault();
//         }
//       });
//     };
// }

// export default angular.module('envicase3App.base', [])
//   .directive('enviEnter', function() {
//     return function (scope, element, attrs) {
//       element.bind('keydown keypress', function(event) {
//         if(event.which === 13) {
//           scope.$apply(function() {
//             scope.$eval(attrs.ngEnter);
//           });

//           event.preventDefault();
//         }
//       });
//     };
// })
// .name;
