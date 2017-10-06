/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
//全局常量
var APP_SERVER_WWW_URL = 'http://www.15scsc.com';
var APP_SERVER_URL = 'http://m.15scsc.com';
var APP_LOGIN_URL = '/APP/login.ashx';
var APP_REG_URL = '/APP/reg.ashx';
var APP_Carousel_URL = '/APP/JSONdata/Carousel.json';
var APP_NewList_URL = '/APP/GetNewList.ashx';
var APP_NewContent_URL = '/APP/Getnewcotent.ashx';
var APP_Productlist_URL = '/APP/GetProduct_List.ashx';
var APP_GetPro_List_app= '/APP/Product/GetPro_List_app.ashx';//首页产品展示
var APP_Get_menu_dh= '/app/Product/Get_menu_dh.ashx'; //导航数据
var APP_allgoods_query="/app/Product/GetPro_ByClassId.ashx";//获取所有商品
var APP_allgoods_classfy ="/app/Product/ProClass.ashx";//获取所有分类
var APP_getUser_info="/app/UserName/GetUser.ashx";//获取用户信息
var APP_allgoods_order="/app/orders/Get_orders.ashx";//获取用户订单
var APP_user_address="/app/UserName/Get_address.ashx";//获取用户地址
var APP_user_addressSet="/app/UserName/Set_address.ashx"//设置默认地址
var APP_user_delAddress="/app/UserName/del_address.ashx"//删除地址
var APP_user_infoChange="/app/UserName/UpdateUser.ashx"//修改个人信息
var APP_user_passChange="/app/UserName/UpdatePass.ashx"//修改密码
var APP_goodDetail_getImg="/app/Product/Getdetails_pic.ashx"//获取详情图片
var User_Username = ""; ////账号
var User_name = ""; //姓名
var UserId = ""; //ID
var UserLevel = "E"; //等级
var Islogin = 0; //是否登录
function U_getState() {
	var stateText = localStorage.getItem('$state') || "{}";
	return JSON.parse(stateText);
};
//验证是否登录
function U_islogin() {
	var stateText = localStorage.getItem('$state') || "{}";
	if(stateText != "{}") {
		var UserState = JSON.parse(stateText);
		if(UserState.account != undefined) {
			User_Username = UserState.User_Username; //账号
			User_name = UserState.User_name; //姓名
			UserId = UserState.UserId; //ID
			UserLevel = UserState.UserLevel; //等级
			Islogin = 1; //是否登录
		}
	} else {
		Islogin = 0;
	}
}
//会员中心验证是否登录有登跳转至登录
function U_islogin_url(val) {
	
	
	var stateText = localStorage.getItem('$state') || "{}";
	if(stateText != "{}") {
		var UserState = JSON.parse(stateText);
		if(UserState.account != undefined) {
			User_Username = UserState.User_Username; //账号
			User_name = UserState.User_name; //姓名
			UserId = UserState.UserId; //ID
			UserLevel = UserState.UserLevel; //等级
		
		}
	} else {
		if (val==2)
		{
			window.location="../../login.html";
		}
		else if (val==1)
		{
				window.location="../login.html";
		}
		else
		{
				window.location="login.html";
		}
			
	}
}



function OPENrulid(url, val) {
	mui.openWindow({
		url: url,
		id: url,
		title: "正在加载",
		show: {
			autoShow: "true",
			aniShow: "slide-in-right",
		},
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '正在加载...', //等待对话框上显示的提示内容
		},
		extras: {
			val: val

		}
	});
}

(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if(loginInfo.account.length < 5) {

			return callback('账号最短为 5 个字符');
		}
		if(loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		var mask = mui.createMask(); //遮罩层

		mui.ajax(APP_SERVER_URL + APP_LOGIN_URL, {
			data: {
				username: loginInfo.account,
				password: loginInfo.password
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			beforeSend: function() {
				mask.show(); //显示遮罩层
			},
			complete: function() {
				mask.close(); //关闭遮罩层
			},
			success: function(data) {
				if(data.state == '1') {
					console.log(9999)
					return owner.createState(data.username, data.name, data.UserLevel, data.UserId, callback);
				} else {
					return callback(data.error);
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(errorThrown);
				callback('服务器连接超时');
			}
		});

	}

	owner.createState = function(username, name, UserLevel, userid, callback) {
		var state = owner.getState();
		state.Username = username;
		state.name = name;
		state.UserLevel = UserLevel;
		state.UserId = userid;
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.phoneNum = regInfo.phoneNum || '';
		regInfo.password = regInfo.password || '';
		if(regInfo.phoneNum.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if(regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}

		//注册保存

		var mask = mui.createMask(); //遮罩层
		console.log(APP_SERVER_URL + APP_REG_URL);
		mui.ajax(APP_SERVER_URL + APP_REG_URL, {
			data: {
				username: regInfo.phoneNum,
				password: regInfo.password,
				name: regInfo.name
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			beforeSend: function() {

				mask.show(); //显示遮罩层
			},
			complete: function() {

				mask.close(); //关闭遮罩层
			},
			success: function(data) {

				//mui.alert(data.state);
				if(data.state == '1') {
					return owner.createState(data.username, data.name, data.UserLevel, callback);
				} else {
					return callback(data.error);
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				callback('服务器连接超时');
			}
		});

	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
		if(id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if(mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch(e) {}
		} else {
			switch(id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));