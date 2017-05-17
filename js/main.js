var jq = $.noConflict();
mui.ready(function() {
	/***********************************************************banner***********************************************************/
	var gallery = mui("#slider");
	gallery.slider({
		interval: 5000
	});
	/************************************************************跑马灯*************************************************************/
	var container = document.getElementById("container");
	var inContainer = document.getElementById("inContainer");
	var st;
	// 移动,停下。
	function move() {
		if(container.scrollLeft < container.scrollWidth / 2) {
			container.scrollLeft++;
			st = setTimeout(move, 15);
		}
		if(container.scrollLeft == container.scrollWidth / 2) {
			clearTimeout(st);
			container.scrollLeft = 0;
			setTimeout(move, 1000);
		}
	}
	move();

})
jq(document).ready(function() {
	/******************************************************点击显示隐藏******************************************************************/
	jq(".quick-buy").click(function() {
		jq(".select-hide").slideDown()
	})
	jq(".select-hide-main .goods-option").click(function() {
		jq(this).removeClass("option-notactive").addClass("option-active").siblings().removeClass("option-active").addClass("option-notactive")
	})
	jq(".select-hide-bottom").click(function() {
		jq(".select-hide").slideUp()
	})
	/**********************************删除收藏*****************************************/
	jq("#collect .iconfont").click(function() {
		var index = jq("#collect .iconfont").index(jq(this))
		jq("#collect>li").eq(index).remove()
	})
	/****************************************取消订单***************************************/
	jq(".mui-slider-group .indent-cancel").click(function() {
		var index = jq(".mui-slider-group .indent-cancel").index(jq(this))
		jq(".mui-slider-group ul").eq(index).remove()
	})
	/****************************************购物车删除商品****************************************/
	jq("#shopping-cart-goods .goods-delete").click(function() {
		var index = jq("#shoppingcart-goods-cell .good-delete").index(jq(this))
		jq("#shopping-cart-goods .shoppingcart-goods-cell").eq(index).remove()
		console.log(index)
	})
	//删除所有商品
	jq(".empty-cart").click(function() {
		jq("#shopping-cart-goods .shoppingcart-goods-cell").each(function() {
			jq(this).remove()
		})
	})
	/*********************删除地址****************************/
	jq(".address-cell .address-delete").click(function() {
		var index = jq(".address-cell .address-delete").index(jq(this))
		jq(".mui-content .address-cell").eq(index).remove()
	})
	/***********************清空浏览历史************************************/
	jq(".empty-history").click(function() {
		jq(".mui-content>a").remove()
	})
	/**********************************购物车飞入动画*******************************/
	var offset = jq(".cart-details").offset();
	jq(".cart-details").click(function(event) {
		var addcar = jq(this);
		var img = jq(".fisrtimg").attr('src');
		var flyer = jq('<img class="u-flyer" src="' + img + '">');
		goodsum = jq(".circle1").text();
		goodsum++;
		flyer.fly({
			start: {
				left: (screen.width) / 2, //开始位置（必填）#fly元素会被设置成position: fixed 
				top: (screen.height) / 3 //开始位置（必填） 
			},
			end: {
				left: offset.left + (screen.width) / 20, //结束位置（必填） 
				top: offset.top + 10, //结束位置（必填） 
				width: 0, //结束时宽度 
				height: 0 //结束时高度 
			},
			onEnd: function() { //结束回调 
				this.destory(); //移除dom 
			}
		});
		jq(".circle1").text(goodsum)
	});
	//			});
	/**************************判断购物车是否为空*******************************/
	var goodsum=10
	if(goodsum == 0) {
		jq(".mui-content1").show()
		jq(".mui-content2").hide()
	} else {
		jq(".mui-content1").hide()
		jq(".mui-content2").show()
	}
})