$(function(){
	$('.gouwuche,#shopCart').click(function(){
		window.location.href = "../cart/cart.html";
	});
	function loadCart(){
		var user = $.cookie('loginedUser');
		if(!user){
			$('.cart_num').text(0);
		}else{
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "{}";
			var cartObj = JSON.parse(cartStr);
			var total = 0;
			for(var goodId in cartObj){
				total += cartObj[goodId].num;
			}
			$('.cart_num').text(total);
		}
	}
	loadCart();
//	下拉菜单的显示和隐藏  
 	$(".haveSubM").hover(function(){
 		$(this).children("div").show();
 	
 	},function(){
 		$(this).children("div").hide();
 	});
 	$('#dropdown-menu').hover(function(){
 		$(this).parent("li").css({'background-color':'#fff'});
 	
 	},function(){
 		$(this).parent("li").css({'background-color':'rgb(245, 244, 244)'});
 	});
 	$('.dmenu').hover(function(){
 		$(this).parent("li").css({'background-color':'#fff',});
 	},function(){
 		$(this).parent("li").css({'background-color':'rgb(245, 244, 244)'});
 	});
// 	商品店铺
 	$(".search-form label").click(function(){
 		var _this = this;
 		$(this).siblings("ul").css("display","block");
 		$(this).siblings("ul").children().click(function(){
 			_this.innerText = this.innerText;
 			$(_this).siblings("ul").css("display","none");
 		})
 	});

//	二级菜单
	$(".secondNav li").hover(function(){
		$(this).children(".pop").addClass("active");
	},function(){
		$(this).children(".pop").removeClass("active");
	});
	
	//登录 退出 cookie操作
	var userName = $.cookie('loginedUser');
	if(userName){
		$('#goLogin').css({display:"none"});
		$('#loginInfo').css({display:"block"});
		$('#username').html(userName);
	} else{
		$('#loginInfo').css({display:"none"});
		$('#goLogin').css({display:"block"});
	}
	$('#logout').click(function (){
		$.removeCookie('loginedUser', {path:"/"});
		$('#loginInfo').css({display:"none"});
		$('#goLogin').css({display:"block"});
		window.location.href = "../login/login.html";
	});
});