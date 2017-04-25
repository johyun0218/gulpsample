'use strict';

import angular from 'angular';

export default angular.module('envicase3App.bnLazySrc', [])
  .directive('bnLazySrc', function() {
		var $window = window;
		var $document = $(document);

    var lazyLoader = (function() {

			var images = [];
			var renderTimer = null;
			var renderDelay = 100;
			var win = $( $window );
			var doc = $document;
			var documentHeight = doc.height();
			var documentTimer = null;
			var documentDelay = 2000;
			var isWatchingWindow = false;

			function addImage( image ) {
				images.push( image );
				if ( ! renderTimer ) {
					startRenderTimer();
				}

				if ( ! isWatchingWindow ) {
					startWatchingWindow();
				}
			}


			// I remove the given image from the render queue.
			function removeImage( image ) {
				// Remove the given image from the render queue.
				for ( var i = 0 ; i < images.length ; i++ ) {
					if ( images[ i ] === image ) {
						images.splice( i, 1 );
						break;
					}
				}

				// If removing the given image has cleared the
				// render queue, then we can stop monitoring 
				// the window and the image queue.
				if ( ! images.length ) {
					clearRenderTimer();
					stopWatchingWindow();
				}
			}

			function checkDocumentHeight() {
				if ( renderTimer ) {
					return;
				}
				var currentDocumentHeight = doc.height();
				if ( currentDocumentHeight === documentHeight ) {
					return;
				}
				documentHeight = currentDocumentHeight;
				startRenderTimer();
			}
			function checkImages() {

				var visible = [];
				var hidden = [];

				var windowHeight = win.height();
				var scrollTop = win.scrollTop();

				var topFoldOffset = scrollTop;
				var bottomFoldOffset = ( topFoldOffset + windowHeight );

				for ( var i = 0 ; i < images.length ; i++ ) {
					var image = images[ i ];
					if ( image.isVisible( topFoldOffset, bottomFoldOffset ) ) {
						visible.push( image );
					} else {
						hidden.push( image );
					}
				}

				for ( var i = 0 ; i < visible.length ; i++ ) {
					visible[ i ].render();
				}

				images = hidden;
				clearRenderTimer();
				if ( ! images.length ) {
					stopWatchingWindow();
				}
			}

			function clearRenderTimer() {
				clearTimeout( renderTimer );
				renderTimer = null;
			}
			function startRenderTimer() {
				renderTimer = setTimeout( checkImages, renderDelay );
			}

			function startWatchingWindow() {
				isWatchingWindow = true;
				win.on( "resize.bnLazySrc", windowChanged );
				win.on( "scroll.bnLazySrc", windowChanged );
				documentTimer = setInterval( checkDocumentHeight, documentDelay );
			}
			function stopWatchingWindow() {
				isWatchingWindow = false;
				win.off( "resize.bnLazySrc" );
				win.off( "scroll.bnLazySrc" );

				clearInterval( documentTimer );
			}

			function windowChanged() {
				if ( ! renderTimer ) {
					startRenderTimer();
				}
			}


			// Return the public API.
			return({
				addImage: addImage,
				removeImage: removeImage
			});
    })();

    function LazyImage( element ) {

					// I am the interpolated LAZY SRC attribute of 
					// the image as reported by AngularJS.					
					var source = null;

					// I determine if the image has already been 
					// rendered (ie, that it has been exposed to the
					// viewport and the source had been loaded).
					var isRendered = false;

					// I am the cached height of the element. We are 
					// going to assume that the image doesn't change 
					// height over time.
					var height = null;


					// ---
					// PUBLIC METHODS.
					// ---


					// I determine if the element is above the given 
					// fold of the page.
					function isVisible( topFoldOffset, bottomFoldOffset ) {

						// If the element is not visible because it 
						// is hidden, don't bother testing it.
						if ( ! element.is( ":visible" ) ) {

							return( false );

						}

						// If the height has not yet been calculated, 
						// the cache it for the duration of the page.
						if ( height === null ) {

							height = element.height();

						}

						// Update the dimensions of the element.
						var top = element.offset().top;
						var bottom = ( top + height );

						// Return true if the element is:
						// 1. The top offset is in view.
						// 2. The bottom offset is in view.
						// 3. The element is overlapping the viewport.
						return( 
								(
									( top <= bottomFoldOffset ) &&
									( top >= topFoldOffset )
								)
							||
								(
									( bottom <= bottomFoldOffset ) &&
									( bottom >= topFoldOffset )
								)
							||
								(
									( top <= topFoldOffset ) &&
									( bottom >= bottomFoldOffset )
								)
						);
						
					}


					// I move the cached source into the live source.
					function render() {
						isRendered = true;
						renderSource();
					}


					// I set the interpolated source value reported
					// by the directive / AngularJS.
					function setSource( newSource ) {
						source = newSource;
						if ( isRendered ) {
							renderSource();
						}
					}

					function renderSource() {
						element[0].src = source;
					}
					// Return the public API.
					return({
						isVisible: isVisible,
						render: render,
						setSource: setSource
					});
				}


    // I bind the UI events to the scope.
    function link( $scope, element, attributes ) {
      var lazyImage = new LazyImage( element );
      // Start watching the image for changes in its
      // visibility.
      lazyLoader.addImage( lazyImage );
      // Since the lazy-src will likely need some sort
      // of string interpolation, we don't want to 
      attributes.$observe(
        "bnLazySrc",
        function( newSource ) {

          lazyImage.setSource( newSource );

        }
      );


      // When the scope is destroyed, we need to remove
      // the image from the render queue.
      $scope.$on(
        "$destroy",
        function() {
          lazyLoader.removeImage( lazyImage );
        }
      );

    }
    // Return the directive configuration.
    return({
			link: link,
      restrict: "A"
    });
  })
  .name;
