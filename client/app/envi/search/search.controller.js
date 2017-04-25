'use strict';
import $ from 'jquery';

export default class SearchControlller {

  showcaseList = [];
  userList = [];
  q = '';
  tabActive = 0;
  isScroll = false;
  isLoadInfo = {
    showcases: false,
    users: false
  };
  localStorage = {
    tab: 0,
    count: 9,
    itemIndex: 1,
    userIndex: 1
  };
  jsSearchCon1 = true;
  jsSearchCon2 = true;
  showcasePromise = null;
  userPromise = null;

  /*@ngInject*/
  constructor($scope, $rootScope, $stateParams, $anchorScroll, $window, $timeout, $compile, Search, User, UtilThumbList) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.$compile = $compile;
    //this.$location = $location;
    this.$window = $window;
    this.$timeout = $timeout;
    this.Search = Search;
    this.User = User;
    this.UtilThumbList = UtilThumbList;

    this.q = this.$stateParams.q;

    this.$rootScope.$on('infiniteScroll', function() {
      console.log('scroll !!');
      this.localStorage.itemIndex++;
      this.setStorage();
      this.dummyShowcase(this.localStorage.count);
      this.getShowcases();
      this.getUsers();
    }.bind(this));
    
  }

  $onInit() {

    this.initStorage();

    if (!this.isLoadInfo.showcases) {
      this.getShowcases({
        count: this.localStorage.itemIndex * this.localStorage.count,
        cursor: ''
      });
      this.isLoadInfo.showcases = true;

      this.getUsers();
    }


    
  }

  initStorage() {
    //  search storage 값이 있으면 세팅 해 준다.
    if (window.localStorage.getItem('search')) {
      this.localStorage = JSON.parse(window.localStorage.getItem('search'));
    }

    var size = this.localStorage.itemIndex * this.localStorage.count;
    this.dummyShowcase(size);

    this.tabActive = this.localStorage.tab;
  }

  dummyShowcase(size) {
    //this.isScroll = true;
    // for (var i = 0; i < size; i++) {
    //   this.showcaseList.push({});
    // }
    //this.isScroll = false;
  }

  search() {
    this.getShowcases();
    this.getUsers();
  }

  setStorage() {
    window.localStorage.setItem('search', JSON.stringify(this.localStorage));
  }
  getStorage() {
    this.localStorage = JSON.parse(window.localStorage.getItem('search'));
    return this.localStorage;
  }

  getShowcases(params) {
    var query = {
      search: this.q,
      count: this.localStorage.count,
      cursor: this.localStorage.itemIndex
    }
    if (params) {
      angular.extend(query, params);
    }

    this.jsSearchCon1 = false;
    this.jsSearchCon2 = false;
    
    
    this.showcasePromise = this.Search.showcases(query)
      .then(function(response) {
      //console.log(response.data);
      //console.log(query);
        
        //var li = $("#divShowcase.thumb_list_inner > ul > li").not('.load_comp');
        Array.prototype.push.apply(this.showcaseList, response.data);
      
      /*
      for (var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        //var index = i;//(this.localStorage.itemIndex - 1) * this.localStorage.count + i;
        
        var index = (query.cursor - 1) * query.count + i;
        //console.log(query.cursor + ':'+ i + ':' + index);
        var li = $('#showcase_'+ index);
        //li.show();
        li.find('a').attr('href', '/showcase/'+ 'ca004b1d-c763-4338-bce8-21c30a050ac3');
        li.find('h2').html('<font color=#fff>'+ this.localStorage.itemIndex+ ':'+ i + '</font>');
        li.find('img').attr('src', obj.showcase.thumbnail.url);
        // li.eq(i).find('a').attr('href', '/showcase/'+ 'ca004b1d-c763-4338-bce8-21c30a050ac3');
        // li.eq(i).find('h2').html('<font color=#fff>'+ i + ':'+ this.localStorage.itemIndex + '</font>');
        // li.eq(i).find('img').attr('src', obj.showcase.thumbnail.url);
        // li.addClass('load_comp');
      }
      */

        this.isScroll = false;

 
      //this.showcaseList = response.data.data;
      //this.UtilThumbList.append($("#divShowcase.thumb_list_inner > ul"), response, this.$scope);
      //this.setThumbPrevPosition();
    }.bind(this));
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
    return elemBottom <= docViewBottom;
  }

  getUsers() {
    this.userPromise = this.Search.users({q: this.q})
      .then(function(response) {
        console.log(response.data);
        this.userList = response.data.data;
      }.bind(this));
  }

  changeFollow(user) {
    user.follows_current_user = !user.follows_current_user;
    var action = undefined;
    if (user.follows_current_user) {
      action = this.User.follow;
    } else {
      action = this.User.unfollow;
    }
    action({followeeId: user.id}, function(data) {
      
    }, function(err) {

    })
  }

  classFollow(user) {
    if(user.follows_current_user === true) // is_followed_by_current_user 2가지가 있음
      return "iFollow selected";
    else
      return "iFollow";
  }

  showTab(tabId) {
    
    //console.log(this.isLoadInfo);
    if (tabId === 'users' && this.isLoadInfo[tabId] === false) {
      this.getUsers();
    }

    this.isLoadInfo[tabId] = true;
  }


  setThumbPrevPosition() {
    //this.localStorage
    if (window.localStorage.getItem('showcase')) {
      var showcaseId = window.localStorage.getItem('showcase');
      window.localStorage.removeItem('showcase');
      console.log('showcaseId:'+ showcaseId);
      if ($('#feed_'+showcaseId).length == 1) {
        var top = $('#feed_'+showcaseId).offset().top;
        $('html, body').animate({scrollTop : top}, 0);
      }
    }
  }

  
}
