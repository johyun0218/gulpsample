'use strict';

import angular from 'angular';

export default angular.module('envicase3App.ngCroppie', [])
  .directive('ngCroppie', function() {
    return {
      restrict: 'AE',
      scope: {
                src: '=',
                rotation: '=',
                viewport: '=?',
                boundry: '=?',
                type: '@',
                zoom: '@',
                mousezoom: '@',
                zoomslider: '@',
                exif: '@',
                orientation: '@',
                update: '=',
                ngModel: '=',
                targetbutton: '@'
            },
            link: function (scope, elem, attr) {
              // defaults
              if (scope.viewport == undefined) {
                  scope.viewport = {w: null, h: null};
              }
              if (scope.boundry == undefined) {
                  scope.boundry = {w: null, h: null};
              }

              // catches
              scope.viewport.w = (scope.viewport.w != undefined) ? scope.viewport.w : 300;
              scope.viewport.h = (scope.viewport.h != undefined) ? scope.viewport.h : 300;
              scope.boundry.w = (scope.boundry.w != undefined) ? scope.boundry.w : 400;
              scope.boundry.h = (scope.boundry.h != undefined) ? scope.boundry.h : 400;

              // viewport cannot be larger than the boundaries
              if (scope.viewport.w > scope.boundry.w) {
                  scope.viewport.w = scope.boundry.w
              }
              if (scope.viewport.h > scope.boundry.h) {
                  scope.viewport.h = scope.boundry.h
              }

              // convert string to Boolean
              var zoom = (scope.zoom === 'true' || typeof scope.zoom == 'undefined'),
                  mouseZoom = (scope.mousezoom === 'true' || typeof scope.mousezoom == 'undefined'),
                  zoomSlider = (scope.zoomslider === 'true' || typeof scope.zoomslider == 'undefined');

              // define options
              var options = {
                  viewport: {
                      width: scope.viewport.w,
                      height: scope.viewport.h,
                      type: scope.type || 'square'
                  },
                  boundary: {
                      width: scope.boundry.w,
                      height: scope.boundry.h
                  },
                  enableZoom: zoom,
                  mouseWheelZoom: mouseZoom,
                  showZoomer: zoomSlider,
                  enableExif: scope.exif,
                  enableOrientation: scope.orientation
              };

              if (scope.update != undefined) {
                  options.update = scope.update;
              }

              

              // create new croppie and settime for updates
              var c = new Croppie(elem[0], options);
              // get Croppie elements for further calculations
              var croppieBody = angular.element(elem[0])[0];
              var croppieCanvas = angular.element(elem[0].getElementsByClassName('cr-boundary'))[0];

              var intervalID;

              var croppieCanvasRectangle = croppieCanvas.getBoundingClientRect();

              // initialize interval only if action regitered within ngCroppie container
              // croppieBody.addEventListener("mousedown", function() {
              //     intervalID = window.setInterval(function() {
              //         c.result('canvas').then(function(img) {
              //             scope.$apply(function() {
              //                 scope.ngModel = img;
              //             });
              //         });
              //     }, 250);
              // }, false);

              // check mouseZoom property to avoid needless event listener initialization
              // if (mouseZoom) {
              //     // separated "wheel" event listener to prevent conflict with Croppie default "wheel" event listener
              //     croppieBody.addEventListener('wheel', function(evt) {
              //         //console.log('Wheel event called');
              //         evt.preventDefault();
              //         if ((evt.clientX > croppieCanvasRectangle.left) && (evt.clientX < croppieCanvasRectangle.right) && (evt.clientY < croppieCanvasRectangle.bottom) && (evt.clientY > croppieCanvasRectangle.top)) {
              //             c.result('canvas').then(function(img) {
              //                 scope.$apply(function() {
              //                     scope.ngModel = img;
              //                 });
              //             });
              //         }
              //     }, false);
              // }

              if (scope.cropResult != undefined) {
                
              }
              
              var targetbutton = angular.element(scope.targetbutton);
          
              targetbutton.click(function () {
                c.result({
                  type: 'canvas',
				          size: { width: scope.viewport.w, height: scope.viewport.h }
                }).then(function (img) {
                  scope.$apply(function () {
                      scope.ngModel = img;
                  });
                });
              });
              

              // destroy all created intervals
              croppieBody.addEventListener('mouseup', function() {
                  clearInterval(intervalID);
              }, false);
              croppieBody.addEventListener('mouseleave', function() {
                  clearInterval(intervalID);
              }, false);
              croppieBody.addEventListener('mouseout', function() {
                  clearInterval(intervalID);
              }, false);

              scope.$on('$destroy', function (event) {
                  clearInterval(intervalID);
              });



              // image rotation
              // scope.$watch('rotation', function(newValue, oldValue) {
              //     if (scope.orientation === 'false' || scope.orientation == undefined) {
              //         throw 'ngCroppie: Cannot rotate without \'orientation\' option';
              //     } else {
              //         c.rotate(newValue - oldValue);
              //     }
              // });

              // respond to changes in src
              scope.$watch('src', function(newValue, oldValue) {
                  if (scope.src != undefined) {
                      c.bind(scope.src);
                      c.result('canvas').then(function(img) {
                          scope.$apply(function () {
                              scope.ngModel = img;
                          });
                      });
                  }
              });
            }
    }
  })
  .name;
