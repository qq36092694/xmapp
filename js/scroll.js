/***********************************************监听窗口滚动*******************************************************/
var jq=$.noConflict()
jq(document).ready(function  () {
	jq(window).scroll(function() {
		var scrollT=jq(window).scrollTop();
		var searchH=jq(".search-box").height();
		var sliderH=jq("#slider").height();
		if(scrollT < searchH) {
			jq(".search-box").css({
				background: "rgba(230,0,69,.8)"
			})
		} 
		if (scrollT>=searchH) {
			jq(".search-box").css({
				background: "rgba(253,100,4,.9)"
			})
		}
	})
})
