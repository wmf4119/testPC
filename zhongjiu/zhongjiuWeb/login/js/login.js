$(function(){
	$('.form input').each(function(){
		$(this).focus(function(){
			$(this).addClass('focus');
		});
		$(this).blur(function(){
			$(this).removeClass('focus');
		})
	});
	$('.agent a').each(function(){
		var index = $(this).index();
		$(this).hover(function(){
			if(index==0){
				$(this).removeClass().addClass('qq2');
			}else if(index==1){
				$(this).removeClass().addClass('weibo2');
			}else{
				$(this).removeClass().addClass('weixin2');
			}
		},function(){
			if(index==0){
				$(this).removeClass().addClass('qq');
			}else if(index==1){
				$(this).removeClass().addClass('weibo');
			}else{
				$(this).removeClass().addClass('weixin');
			}
		})
	});
	//cookie操作
	$('#loginsubmit').click(function (){
		var usn = $('#loginUsn').val();
		var pwd = $('#loginPsw').val();
		if(!pwd && !usn){
			$('.form label').hide();
			$('.form label').eq(0).show().text('请输入用户名');
			$('.form label').eq(1).show().text('请输入密码');
			return;
		}
		if(!usn){
			$('.form label').hide();
			$('.form label').eq(0).show().text('请输入用户名');
			return;
		}
		if(!pwd){
			$('.form label').hide();
			$('.form label').eq(1).show().text('请输入密码');
			return;
		}
		var usersStr = $.cookie('registeredUsers') ? $.cookie('registeredUsers') : "{}";
		var usersObj = JSON.parse(usersStr);
		if(usersObj[usn] == pwd){
			$.cookie("loginedUser", usn, {expires:7, path:"/"});
			window.location.href = "../index.html";
		}else {
			$('.form label').hide();
			$('.form label').hide().eq(1).show().text("用户名或密码错误，请重试。");
		}
	});
});
