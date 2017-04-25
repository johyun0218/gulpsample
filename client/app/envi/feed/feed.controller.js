'use strict';

//import ngInfiniteScroll from 'ng-infinite-scroll';

//import jquery from 'jquery';

export default class FeedController {
  //scroll = undefined;
  //popup = '11';
  //isModalShow = false;
  products = [];
  //awesomeNewsFeeds = [];
  timeout;
  //Restangular;
  Newsfeed;

  pageIndex = 1;
  count = 20;

  isFeedBlank = true;

  feedPromise = null;

  /*@ngInject*/
  constructor($scope, $rootScope, $location, $anchorScroll, $timeout, $window, $compile, Newsfeed, initValue) {
    //this.$http = $http;
    this.$scope = $scope;
    this.$window = $window;
    this.$compile = $compile;
    //this.timeout = $timeout;
    this.products = [];
    //this.Restangular = Restangular;
    this.Newsfeed = Newsfeed;
    this.initValue = initValue;

    // window.localStorage.setItem('back', 1);
    // window.localStorage.removeItem('back');
    // window.localStorage.getItem('back')

    if (window.localStorage.getItem('newsfeed')) {
      this.pageIndex = parseInt(window.localStorage.getItem('newsfeed'), 10);
    } else {
      window.localStorage.setItem('newsfeed', 1);
    }

    if (window.localStorage.getItem('back') !== '1') {
      this.pageIndex = 1
      window.localStorage.setItem('newsfeed', this.pageIndex);
    }
  }

  element_in_scroll(elem) {
    if ($(elem).length == 0){
      return false;
    }
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    //console.log(elemBottom + ':' + docViewBottom + ':' + elemTop + ':' + docViewTop);
    //return ((elemBottom <= docViewBottom) && (elemTop <= docViewTop));
    return elemBottom <= docViewBottom;
  }

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

  setThumbPrevPosition() {
    if (window.localStorage.getItem('showcase')) {
      var showcaseId = window.localStorage.getItem('showcase');
      window.localStorage.removeItem('showcase');
      console.log('showcaseId:'+ showcaseId);
      var top = $('#feed_'+showcaseId).offset().top;
      $('html, body').animate({scrollTop : top}, 0);
    }
  }

  getNewsfeed() {
    //var count = this.pageSize * this.pageIndex;
    var cursor = 1;
    cursor = window.localStorage.getItem('newsfeed');
    this.feedPromise = this.Newsfeed.getList({
      count: this.count,
      cursor: cursor
    })
      .then(function(response) {
        //$('div.thumb_list_inner').html(response);
        console.log(response);
        if(response !== '') {
          this.isFeedBlank = false;
          return;
        }

        // var temp = this.$compile(response)(this.$scope);

        // var $_copy = $("div.thumb_list_inner > ul").clone();
				// $("div.thumb_list_inner > ul > li").remove();
				// $("div.thumb_list_inner > ul").append($_copy.html());
				// $("div.thumb_list_inner > ul").append(temp);


        // this.thumbListMotion();

        // this.setThumbPrevPosition();

    }.bind(this));
  }


  $onInit() {

    //var me;
    //me = this;
    //console.log(this.$window);
    angular.element(this.$window).bind('scroll', function(e) {
      //console.log('scroll');
      if(this.element_in_scroll('.thumb_list_inner li:last')) {
        //console.log('마지막 도착!!' + e);
        //debugger;
        window.localStorage.setItem('newsfeed', ++this.pageIndex);
        this.getNewsfeed();
      }
    }.bind(this));

    this.getNewsfeed();
    

    // this.Restangular.one('newsfeed').get()
    //   .then(function(response) {
    //     this.awesomeNewsFeeds = response.data.data;
    //   }.bind(this));
    // feed.getNewsfeed()
    //   .then(function(response) {
    //     console.log(response);
    //   });
    // this.$http.get('/api/newsfeed')
    //   .then(response => {
    //     console.log(response.data);
    //     this.awesomeNewsFeeds = response.data.data.data;
    //   });

    //console.log(window.localStorage.getItem('back'));
    // if (window.localStorage.getItem('back') !== '1') {
    //   var url = '/api/explore/trendinghtml?pageIndex=1';// + "&jsonp=callback";
    //   this.$http.get(url)
    //     .then(response => {
    //       $('div.thumb_list_inner ul').html(response.data);
    //     })
    //     .then(function() {
    //       var thumbList = $('div.thumb_list_inner >ul >li');
    //       var thumbTg = thumbList.not('.load_comp');
    //       var randomVal = Math.random()*thumbTg.length;
    //       //console.log(thumbTg);
    //       var thumbListInitMotion= (function(li){
    //         thumbTg.each(function(i){
    //           thumbTg.eq(i)
    //                 .css('opacity', 0)
    //                 .stop()
    //                 .delay(10*i)
    //                 .animate({
    //                   opacity: 1
    //                   }, {
    //                     duration: 600,
    //                     ease: 'easeOutCubic',
    //                     complete: function(){
    //                       $(this).addClass('load_comp');
    //                     }
    //                   });
    //         });
    //       })(randomVal);
    //     })
    //     .catch(function(e){
    //       console.log(e);
    //     });

    //     //window.localStorage.removeItem('back');
    // }

    
  }

  newcase() {
    if (!this.initValue.isApple && !this.initValue.isAndroid) {
      alert('웹 화면  페이지 이동은 어디로??');
    }
    console.log(this.initValue);
  }

  layoutDone() {
    this.timeout(function() {
      console.log('complete');
    });
  }
}
