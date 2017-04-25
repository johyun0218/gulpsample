import angular from 'angular';

export default class SearchItemController {
   //$ctrl = this;

   searchText = '';
   itemList = [];
   step = 1;
   //item = {};
   shopTagInfo = {};
   vm = {};

  /*@ngInject*/
  constructor($scope, $uibModalInstance, params, Search) {
    this.vm.$uibModalInstance = $uibModalInstance;
    this.vm.Search = Search;
    this.vm.shopTagInfo = params;


    // fn
    this.vm.ok = this.ok;
    this.vm.cancel = this.cancel;
    this.vm.search = this.search;
    this.vm.selectItem = this.selectItem;
    
    // field
    this.vm.searchText = this.searchText;
    this.vm.itemList = this.itemList;
    this.vm.step = this.step;
    if (typeof this.vm.shopTagInfo.itemId !== 'undefined') {
      this.vm.step = 2;
    }
    $scope.vm = this.vm;
  }


  selectItem(item) {
    this.step = 2;
    //this.item = item;
    this.shopTagInfo.itemId = item.id;
  }
  

  ok() {
    this.$uibModalInstance.close(this.shopTagInfo);
  };

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  };

  search() {
    //console.log(this.searchText);
    var query = {
      search: this.searchText,
      count: 10,
      cursor: ''
    }
    this.Search.items(query)
      .then(function(response) {
        this.itemList = response.data;
        //console.log(this.itemList);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
      });
  }
}

