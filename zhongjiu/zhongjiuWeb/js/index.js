$(function(){
	$('.gouwuche,#shopCart').click(function(){
		window.location.href = "cart/cart.html";
	});
//轮播图
	var $pics = $(".lunBo ul li");
	var index = 0; 
	//图片的自动播放
	function carousel(){
		index++;
		if(index == $pics.size()){
			index = 0; 
		}
		letsShow();
	}
	var timer = setInterval(carousel, 5000);
	//图片显示的效果控制
	function letsShow(){
		$('.tab_nav a').eq(index).addClass('cur').siblings().removeClass('cur');
		$pics.eq(index).fadeIn(300).siblings().fadeOut(300);
	}
	letsShow();

	$('.tab_nav a').mouseover(function (){
		clearInterval(timer);
		index = $(this).index(); 
		letsShow(); 
		timer = setInterval(carousel, 3000); 
	});
	
//small——banner
	$('.banner .small_banner a').hover(function(){
		LeftMove(this);
	},function(){
		RightMove(this);
	});
	//左右移动的函数，可以多次调用，注意，position
	function LeftMove(dom){
		$(dom).animate({'right':'47px'},300);
	}
	function RightMove(dom){
		$(dom).animate({'right':'40px'},300);
	}
//倒计时函数
function lxfEndtime() {
	var domLXF = $(".lxftime");
//	for()
	$(".lxftime").each(function() {
		var lxfday = $(this).attr("lxfday"); //用来判断是否显示天数的变量         
		var endtime = (new Date($(this).attr("endtime"))).getTime(); //取结束日期(毫秒值)
		var nowtime = new Date().getTime(); //今天的日期(毫秒值)              
		var youtime = endtime - nowtime;               
		var seconds = youtime / 1000;
		var minutes = Math.floor(seconds / 60);
		var hours = Math.floor(minutes / 60);
		var days = Math.floor(hours / 24);
		var CDay = days;
		var CHour = hours % 24;
		var CMinute = minutes % 60;
		var CSecond = Math.floor(seconds % 60);        
		if(endtime <= nowtime) {
			$(this).html("活动结束") //如果结束日期小于当前日期就提示过期啦
		} else {
			if($(this).attr("lxfday") == "no") {
				$(this).html("还剩<span>" + CHour + "</span>时<span>" + CMinute + "</span>分<span>" + CSecond + "</span>秒结束"); //输出没有天数的数据
			} else {
				$(this).html("还剩<span class='day'>" + days + "</span><em>天</em><span class='hour'>" + CHour + "</span><em>时</em><span class='mini'>" + CMinute + "</span><em>分</em><span class='sec'>" + CSecond + "</span><em>秒</em>");//输出有天数的数据
			}
		}
	});
};
function timerDJS(){
	setInterval(lxfEndtime, 1000);
} 
timerDJS();

	
	//小tab切换
	$(".left_btn").click(function(){
		var $tab_ul = $(this).siblings('.tab').children('ul');
		if($tab_ul.css('left')=='-190px'){
			$tab_ul.animate({"left":0},300);
		}else{
			$tab_ul.animate({"left":-190+'px'},300);
		}
	});
	$(".right_btn").click(function(){
		var $tab_ul = $(this).siblings('.tab').children('ul');
		if($tab_ul.css('left')=='0px'){
			$tab_ul.animate({"left":-190+'px'},300);
		}else{
			$tab_ul.animate({"left":0},300);
		}
	});

//tab切换
	$(".title ul li").mouseover(function(){
		var index = $(this).index();
		$(this).addClass('li_active').siblings().removeClass('li_active');
//		console.log($('.content_main>ul').eq(index));
		var $nowElement = $(this).parents('.title').siblings('.content_main').children('ul');
		$nowElement.eq(index).addClass('showUl').siblings().removeClass('showUl');
	});

//	左右tab切换 大
	$(".tab_left_btn").click(function(){
		var $tab_div = $(this).siblings('div').children('div');
		var $left = $tab_div.css('left');
		if(parseInt($left) <=-5040){
			$tab_div.animate({"left":0},100);
		}else{
			$left = (parseInt($left)-504)+'px'
			$tab_div.animate({"left":$left},100);
		}
	});
	$(".tab_right_btn").click(function(){
		var $tab_div = $(this).siblings('div').children('div');
		var $left = $tab_div.css('left');
		if(parseInt($left) >=0){
			$tab_div.animate({"left":-5040+'px'},100);
		}else{
			$left=(parseInt($left)+504)+'px';
			$tab_div.animate({"left":$left},100);
		}
	});

//楼层导航
	$(window).scroll(function (){
		var st = $(this).scrollTop(); 
		if(st > 1650){
			$("#LoutiNav").show();
		} else {
			$("#LoutiNav").hide();
		}
		if(!isClick){
			$('#main .Louti').each(function (){
				var toTop = $(this).offset().top;
				if(toTop + 600> st){
					var index = $(this).index()-3;
					$('#LoutiNav ul li').find('span').removeClass('active').eq(index).addClass('active');
					return false;
				}  
			});
		}
	});
		var isClick = false;
		$('#LoutiNav ul li').click(function (){
			isClick = true;
			var index = $(this).index();
			$('#LoutiNav ul li').find('span').removeClass('active').eq(index).addClass('active');
			var target = $('#main .Louti').eq(index).offset().top;
			$('html,body').animate({scrollTop:target}, 300, function (){
				isClick = false; 
			});
		});
		// 给那些li加一个鼠标移入移出事件
		$('#LoutiNav ul li').hover(function (){
			$(this).addClass('hover').siblings().removeClass('hover');
		}, function (){
			$(this).removeClass('hover').siblings().removeClass('hover');
		});



});