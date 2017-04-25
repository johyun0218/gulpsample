'use strict';

export default class NewcaseController {
  inputImage = '/assets/images/test.jpg';
  outputImage = null;
  cropImage = null;
  tagInfo = {};
  tagIndex = 0;
  items = ['item1', 'item2', 'item3'];

  /*@ngInject*/
  constructor($scope, ModalBasic, $log) {
    this.$scope = $scope;
    this.ModalBasic = ModalBasic;
    this.$log = $log;
    //this.$document = $document;

    $("#containment-wrapper div.draggable").draggable({ containment: "parent", scroll: false  });
    $("#containment-wrapper").on('click', ".draggable", function(e) {
			
			var me = $(this);
			var left = 30;//me.offset().left + 60;
			var top = -20;					
			$(".tag-menu", this).show();
			$(".tag-menu", this).css({top:top, left:left});						
		});
    $("#containment-wrapper").on('click', "ul > li", function(e) {
			var me = $(this);
      var index = me.parent().parent().parent().parent().attr('index');
      var scope = angular.element('#containment-wrapper').scope();
      scope.index = index; // context 정보를 찾을 수 없어 임시로 index 값을 넣어둠

			if (me.hasClass('delete-showcase')) {
				me.parent().parent().parent().parent().remove();
        scope.$apply(function(){
            delete scope.vm.tagInfo[index];
        });
			} else if (me.hasClass('edit-showcase')) {
        scope.vm.ModalBasic
          .open('lg', 'searchitem.html', 'SearchItemController', scope.vm.tagInfo[index])
          .then(function(result) {
            this.vm.tagInfo[this.index] = result;
            delete this.index;
          }.bind(scope))
          .catch(err => console.log(err));
			} else if (me.hasClass('cancel-showcase')) {
				me.parent().parent().hide();
				console.log('remove');
			}
			return false;
		});

    //  $scope.$watch('tagList', function updatePdfUrl(newPdfUrl, oldPdfUrl) {
    //    this.tagList += ' ';
    //    //this.$scope.$apply();
    //    console.log('tagList change');
    //  }.bind(this));
    
  }

  drapTagCreate() {
    var $this = $(this);
    var thisPos = $this.position();
    var parentPos = $this.parent().position();
    var x = thisPos.left;// - parentPos.left;
    var y = thisPos.top;// - parentPos.top;

    var index = $this.attr('index');
    var scope = angular.element('#containment-wrapper').scope();
    scope.vm.tagInfo[index].x = x;
    scope.vm.tagInfo[index].y = y;
  }

  drapTagStop() {
    //console.log('drapTagStop');
    var $this = $(this);
    var thisPos = $this.position();
    var parentPos = $this.parent().position();

    var x = thisPos.left;// - parentPos.left;
    var y = thisPos.top;// - parentPos.top;

    var index = $this.attr('index');
    if (index) {
      var scope = angular.element('#containment-wrapper').scope();
      scope.$apply(function(){
        scope.vm.tagInfo[index].x = x;
        scope.vm.tagInfo[index].y = y;
      });
    }
  }

  onUpdate(data) {
    console.log(data);
  }

  getCropImage() {

  }

  plusTag($event) {
    var wrapperOffset = $( "#containment-wrapper" ).offset();
    var me = $($event.currentTarget);
    //debugger;
    var top = me.offset().top - wrapperOffset.top;
    var left = me.offset().left + 30 - wrapperOffset.left;
    //console.log(top + ':'+ left);
    var index = this.tagIndex++;

    this.ModalBasic
      .open('lg', 'searchitem.html', 'SearchItemController', {})
      .then(function(result) {
        //debugger;
        this.tagInfo[index] = result;

        var html = [];
        html.push("<div class='tag-menu ui-widget-content' style='display:none;width:150px;solid #000;text-align:center;vertical-align:middle;position:absolute;'>");
        html.push("<ul>");			
        html.push("<li class='delete-showcase'>Delete showcase</li>");
        html.push("<li class='edit-showcase' style='text-align:left;'>Edit showcase</li></li>");
        html.push("<li class='cancel-showcase' style='text-align:left;'>Cancle</li></li>");
        html.push("</ul></li>");
        html.push("</div></li>");

        var div = "<div index='"+ index + "' class='draggable ui-widget-content' style='width:30px;height:30px;solid #000;text-align:center;vertical-align:middle;position:absolute;top:"+ top + "px;;left:"+ left + "px;cursor:pointer;'><font color='green'>선물</font><div style='position:relative;'>" + html.join('') + "</div></div>";
        $('#containment-wrapper').append(div);
        $('.draggable').draggable({ containment: "parent", scroll: false, create: this.drapTagCreate, stop: this.drapTagStop });

      }.bind(this))
      .catch(err => console.log(err));

    
  }

  openShoppingItem(size, parentSelector) {

    this.ModalBasic
      .open('lg', 'searchitem.html', 'SearchItemController', {})
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
}
