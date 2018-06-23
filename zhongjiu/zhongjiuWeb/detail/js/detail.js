$(function(){
//	加入购物车
var user = $.cookie('loginedUser');
if(!user){
	$('#now_buy,#addToCart').click(function (){
		window.location.href = "../login/login.html";
	});
}else{
	$('#now_buy').click(function (){
		window.location.href = "../cart/cart.html";
	});
	$('#addToCart').click(function(e){
		var goodId = $(this).parent().siblings('p').attr('data-good-id');
		var goodNo =  $('.goodId').html();
		var goodName = $('.goodName').html();
		var goodSrc = $('.goodImg').attr('src');
		var goodPrice = $('.goodPrice').html();
		goodPrice = parseFloat(goodPrice);
		var shop = $('.shop').html();
		var num = $('#goodNum').val();
		num = parseInt(num);
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "{}";
		var cartObj = JSON.parse(cartStr);
		if(goodId in cartObj){
			cartObj[goodId].num += 1;
		} else {
			cartObj[goodId] = {
				no : goodNo,
				name : goodName,
				price : goodPrice,
				src : goodSrc,
				shop: shop,
				num : num
			};
		}
		var cloneImg = $('.goodImg').clone();
		cloneImg.css({width:50,height:50});
		cloneImg.fly({
		    start:{
		      left: e.clientX, 
		      top: e.clientY, 
		    },
		    end:{
		      left: $('#shopCart').offset().left - $(window).scrollTop(), 
		      top: $('#shopCart').offset().top - $(window).scrollTop(), 
		      width: 0, 
		      height: 0,
		    },
		    autoPlay: true,
		    onEnd: function(){
		    	cloneImg.remove();
				var total = parseInt($('#shopCart').html().match(/\D*(\d+)\D*/)[1]);
				$('.cart_num').text(total+num);
		    } 
		});	
		cartStr = JSON.stringify(cartObj);
		$.cookie('cart', cartStr, {expires:7,path:"/"});
	});
}
//数量的加减操作
	$('.des').click(function(){
		var num = $('#goodNum').val();
		$('#goodNum').val(function(){
			if(num==1){
				return 1;
			}else{
				num--;
				return num;
			}
		});
	});
	$('.inc').click(function(){
		var num = $('#goodNum').val();
		$('#goodNum').val(function(){
				num++;
				return num;
		});
	});

//下拉菜单
	$('.all').hover(function(){
		$('.secondNav').addClass('active');
	},function(){
		$('.secondNav').hover(function(){
			$('.secondNav').addClass('active');
		},function(){
			$('.secondNav').removeClass('active');
			return;
		});
		$('.secondNav').removeClass('active');
	});
//放大镜
	var tabIndex = 0;
//	点击切换图片
	$(".tab_magnify li").each(function(){
		$(this).click(function(){
			$(".tab_magnify li").removeClass();
			tabIndex = $(this).index();
			$(this).addClass("bR");
			var srcIndex = tabIndex + 1; 
			$(".smallBox").html('<img src="img/'+srcIndex+'.png"/>') ;
			$(".bigBox").html('<img src="img/'+srcIndex+'.png"/>');
			$(this).hover(function(){
				$(this).addClass("bR");
			},function(){
				$(".tab_magnify li").removeClass();
				$(this).addClass("bGray");
			});
		});
	});
//	放大镜效果
	$(".magnify").hover(function(){
		$(".tool").css('display','block');
		$(".bigBox").css('display','block');
	},function(){
		$(".tool").css('display','none');
		$(".bigBox").css('display','none');
	});
	$(document).mousemove(function(e){
		var cx = e.pageX;
		var cy = e.pageY;
		var toLeft = cx - $(".smallBox").offset().left-$(".tool").outerWidth()/ 2;
		var toTop = cy -$(".smallBox").offset().top-$(".tool").outerHeight()/ 2;
		var maxTop =$(".smallBox").outerHeight()- $(".tool").outerHeight();
		if(toTop >= maxTop){
			toTop = maxTop;
		} else if(toTop <= 0){
			toTop = 0;
		}
		var maxLeft =$(".smallBox").outerWidth() - $(".tool").outerWidth();
		if(toLeft >= maxLeft){
			toLeft = maxLeft;
		} else if(toLeft <= 0){
			toLeft = 0;
		}		
		$(".tool").css({'left':toLeft +'px','top':toTop+'px'});
		$(".bigBox img").css({'left': -toLeft *2 + "px",'top':-toTop * 2 + "px"});
	});
	
//热销Top tab切换
	$('.topList ul li').each(function(){
		$(this).hover(function(){
			var $this_index = $(this).index();
			var $do_element = $('.topList dl').eq($this_index);
			$(this).css("color","#E3393C");
			$('.topList dl').removeClass('active');
			$do_element.addClass('active');
		},function(){
			$('.topList ul li').css("color","#666");
			$(this).removeClass('active');
		});
	});
//评价
	$('#id_comment_btn li').each(function(){
		if($(this).index()==0){
			$(this).click(function(){
				$('.comments-list dl').show();
			});
		}else{
			$(this).click(function(){
				$('.comments-list dl').hide();
			});
		}
	});
	$('.btn_com input').each(function(){
		var nIndex = $(this).index();
		if(nIndex==2){
			$(this).click(function(){
				var mIndex = $('.comments-list>div.showDiv').index();
				$('.btn_com input').removeClass();
				$('.comments-list>div').not('.btn_com').removeClass('showDiv');
				if(mIndex==1){
					$('.comments-list>div').eq(1).addClass('showDiv');
					$('.btn_com input').eq(1).addClass('sele');
				}else if(mIndex==2){
					$('.comments-list>div').eq(0).addClass('showDiv');
					$('.btn_com input').eq(0).addClass('sele');
				}
			});
			
		}else{
			$(this).click(function(){
				$('.btn_com input').removeClass();
				$('.comments-list>div').not('.btn_com').removeClass('showDiv');
				$('.comments-list>div').eq($(this).index()).addClass('showDiv');
				$(this).addClass('sele');
			});
		}
	})

	var num = $('.comments-list dl').size();
	$('#totalComment').text('('+num+')');

});
