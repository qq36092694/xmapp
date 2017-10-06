mui.ready(function() {
	/***********************************************************banner***********************************************************/
	var gallery = mui("#slider");
	gallery.slider({
		interval: 5000
	});
});
$(document).ready(function() {
	/************************************************商品排序点击切换*******************************************************/
	$("#allgoods-logo>a").click(function  () {
		$(this).find("div").addClass(".sort-active")
		$(this).siblings().find("div").removeClass(".sort-active")
	})
	/**********************************删除收藏*****************************************/
	$("#collect .iconfont").click(function() {
		var index = $("#collect .iconfont").index($(this));
		$("#collect>li").eq(index).remove();
	})
	/****************************************取消订单***************************************/
	$(".mui-slider-group .indent-cancel").click(function() {
		var index = $(".mui-slider-group .indent-cancel").index($(this))
		$(".mui-slider-group ul").eq(index).remove()
		var sum1 = $("#item1mobile>.mui-table-view").size()
		$("#sliderSegmentedControl>a").eq(0).children(".mui-badge ").text(sum1)
		var sum2 = $("#item2mobile>.mui-table-view").size()
		$("#sliderSegmentedControl>a").eq(1).children(".mui-badge ").text(sum2)
		var sum3 = $("#item3mobile>.mui-table-view").size()
		$("#sliderSegmentedControl>a").eq(2).children(".mui-badge ").text(sum3)
		var sum4 = $("#item4mobile>.mui-table-view").size()
		$("#sliderSegmentedControl>a").eq(3).children(".mui-badge ").text(sum4)
	})
	
	/********************************选择支付方式***********************************/
	$("#afford-select .mui-collapse-content").click(function() {
		var index = $("#afford-select .mui-collapse-content").index($(this))
		$("#afford-select .iconfont").eq(index).removeClass("hide").addClass("show")
		$(this).siblings().children(".iconfont").removeClass("show").addClass("hide")
		var sel = $(this).children(".mui-pull-left").text()
		$(".payment-pattern span").eq(1).text(sel)

	})
	/********************************选择优惠券***********************************/
	$("#coupon-select .mui-collapse-content").click(function() {
		var index = $("#coupon-select .mui-collapse-content").index($(this))
		var sel = $(this).children(".mui-pull-left").text()
		$(".mui-navigate-right").eq(0).text(sel)
		$("#coupon-select").removeClass("mui-active")
	})
})