'use strict';

import angular from 'angular';

export function UtilThumbListService($window, $compile) {
  'ngInject';
  var thumb = {
    element_in_scroll(elem) {
      if ($(elem).length == 0){
        return false;
      }
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();
      //console.log(elemBottom + ':' + docViewBottom + ':' + elemTop + ':' + docViewTop);
      return elemBottom <= docViewBottom;
    },

    append($selector, response, scope) {
      var temp = $compile(response)(scope);

      var $_copy = $selector.clone();
      $selector.find('li').remove();
      $selector.append($_copy.html());
      $selector.append(temp);

      this.thumbListMotion();
    },

    thumbListMotion() {
      var thumbList = $('div.thumb_list_inner >ul >li');
          var thumbTg = thumbList.not('.load_comp');
          var randomVal = Math.random()*thumbTg.length;
          //console.log(thumbTg);
          var thumbListInitMotion= (function(li){
            thumbTg.each(function(i){
              thumbTg.eq(i)
                    .css('opacity', 0)
                    .stop()
                    .delay(90*i)
                    .animate({
                      opacity: 1
                      }, {
                        duration: 600,
                        ease: 'easeOutCubic',
                        complete: function(){
                          $(this).addClass('load_comp');
                        }
                      });
            });
          })(randomVal);
    }
  };

  return thumb;
}
