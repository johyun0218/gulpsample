$(document).ready(function() {
	
	/* set header */
	setHeader();
	$(window).scroll(function(){
		setHeader();
	});
	function setHeader()
	{
		if ( $(window).scrollTop() > 50 )
			$("#wrap").addClass("fixed");
		else
			$("#wrap").removeClass("fixed");
	}
	/* //set header */

	/* 상하 정렬 */
	if ( $(".jsPos1").length )
	{
		$(".jsPos1").css("margin-top", -($(".jsPos1").height()/2));
	}
	/* //상하 정렬 */

	/* 풋터상세보기  */
 	$(document).on('click', '#footer .btnOpen', function(){
 		$("body").addClass("footerOpen");
 	});
 	/* //풋터상세보기 */

	 /* list4 */
	$(".mList4 .iFollow").click(function(){
		if ( $(this).hasClass("selected") )
			$(this).removeClass("selected");
		else
			$(this).addClass("selected");
	});
	/* //list4 */

	/* search */
	$(document).on('click', '.jsTab1 li a', function(){
		$(this).parent().parent().children().removeClass("selected");
		$(this).parent().addClass("selected");
		$(this).parent().parent().parent().next().children(".cont").addClass("hidden");
		$(this).parent().parent().parent().next().children(".cont").eq($(this).parent().index()).removeClass("hidden");
		return false;
	});
	$(document).on('click', '.mSearch2 .delete', function(){
		$(this).prev().val("");
		$(this).prev().focus();
	});
	/* //search */


	$(document).on('focus', '.mInput .keyword', function(){
		$(this).parent().addClass("focus");
	});
	$(document).on('blur', '.mInput .keyword', function(){
		$(this).parent().removeClass("focus");
	});

	$(document).on('click', '.jsBtnDelete, .jsBtnUtil', function(){
		if ( $(this).next().css("display") == "block" )
		{
			$(this).removeClass("focus");
			$(this).next().hide();
		}
		else
		{
			$(".lDelete").hide();
			$(".jsBtnDelete, .jsBtnUtil").removeClass("focus");
			$(this).next().show();
			$(this).addClass("focus");
		}
	});
	$(document).on('click', '.jsBtnCancel', function(){
		$(".iDelete, .jsBtnUtil").removeClass("focus");
		$(this).parent().hide();
	});

});


(function($) {
// call jRespond and add breakpoints
var jRes = jRespond([
	{
		label: 'handheld',
		enter: 0,
		exit: 748
	},{
		label: 'desktop',
		enter: 748,
		exit: 10000
	}
]);

// usage
var outputStr = document.getElementById('output');

jRes.addFunc({
	breakpoint: 'desktop',
	enter: function() {
		
		$("body").removeClass().addClass("desktop");
		
	},
	exit: function() {
		console.log('<<< destroy this when exiting the DESKTOP breakpoint >>>');
	}
});

jRes.addFunc({
	breakpoint: 'handheld',
	enter: function() {
		
		$("body").removeClass().addClass("handheld");

	},
	exit: function() {
		console.log('<<< destroy this when exiting the HANDHELD breakpoint >>>');
	}
});

jRes.addFunc({
	breakpoint: '*',
	enter: function() {
		console.log('>>> run this when entering EVERY breakpoint <<<');
	},
	exit: function() {
		console.log('<<< run this when exiting EVERY breakpoint >>>');
	}
});



})(jQuery);

