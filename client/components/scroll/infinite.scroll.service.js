'use strict';

//import angular from 'angular';

export function InfiniteScrollService($http, $q) {
  'ngInject';

  function ScrollService(options) {
    //var service = {
    this.items = [];
    this.busy = false;
    this.after = '';
    this.pageIndex = 0;
    this.options = options;
  }

  ScrollService.prototype.nextPage = function() {
    if(this.busy) return;
    this.busy = true;

    var me = this;
    var url = '/api/explore/trending?pageIndex=' + this.pageIndex;// + "&jsonp=callback";
    $http.get(url)
      .then(response => {
        //debugger;
        //console.log(response.data);
        var list = response.data.data;
        // var num = 638480;
        // for(var i = 0; i < items.length; i++) {
        //   items[i].data.filename = items[i].url;
        //   this.items.push(items[i].data);
        // }
        for(var i = 0; i < list.length; i++) {
          me.items.push(list[i]);
        }
        me.after = 't3_' + (me.pageIndex + 1);
        me.busy = false;
        me.pageIndex++;
        this.options.callback(this.items);
      });
  };

  var Scroll = function() {
    this.items = [];
    this.busy = false;
    this.after = '';
    this.deferred = $q.defer();
  };

  Scroll.prototype.callback = function() {
    this.deferred.resolve(this.items);
    return this.deferred.promise;
  };

  Scroll.prototype.nextPage = function() {
    if(this.busy) return;
    this.busy = true;

    var url = 'https://api.reddit.com/hot?after=' + this.after;// + "&jsonp=callback";
    //url = "http://www.pgbovine.net/photos/json-files/boston.json";
    //var url = "https://api.flickr.com/services/feeds/photos_public.gne?tags=kitten&format=json";
    //url = "/api/things?a=1";
    //console.log($http.get);

    $http.get(url)
      .then(response => {
        var list = response.data.data.children;
        //var items = response.data;
        var num = 638480;
        //debugger;
        for(var i = 0; i < list.length; i++) {
          list[i].data.filename = 'https://wk-originals-akiajy4shnfla5tevhca.s3.amazonaws.com/' + (num + i) + '_wookmark.jpg';
          this.items.push(list[i].data);
        }
        this.after = 't3_' + this.items[this.items.length - 1].id;
        this.busy = false;

        //return this.items;
        //this.deferred.promise;
      });
    //console.log(url);
    // $http.jsonp(url)
    //   .then(response => {
    //     var items = response.data.data.children;
    //     for (var i = 0; i < items.length; i++) {
    //       this.items.push(items[i].data);
    //     }
    //     this.after = "t3_" + this.items[this.items.length - 1].id;
    //     this.busy = false;
    //   })
      // .success(function(data) {
      //   var items = data.data.children;
      //   for (var i = 0; i < items.length; i++) {
      //     this.items.push(items[i].data);
      //   }
      //   this.after = "t3_" + this.items[this.items.length - 1].id;
      //   this.busy = false;
      //   }.bind(this))
      // .error(function(data, status, headers, config){
      //   console.error('Error fetching feed:', data);
      // });
  };
  return ScrollService;
}
