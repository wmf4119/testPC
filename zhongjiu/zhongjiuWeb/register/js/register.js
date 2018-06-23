$(function(){
		//失焦时判断是否为空，或不匹配正则，通过则消失，没通过则显示
//					聚焦时关闭error的class 开启提示
//					点击注册时判断是否符合每个函数，没通过则报错，通过就把其存到cookie中
	createCore();
	var isOk = false;
//	正则表达式
var regExpManger = {    
	regPsw : /\w{6,20}/,      
	regTel:/^1[3|4|5|7|8]\d{9}$/
}
	function checkUsn(){
		isOk = false;
		$('#usertel').focus(function(){
			$(this).addClass('focus');
			$('.user_tel label').removeClass().text('请输入手机号码').addClass('tip_tips');
		});
		$('#usertel').blur(function(e){
			$(this).removeClass();
			isOk = false;
			$('.user_tel label').removeClass();
			var usn = $('#usertel').val();
			if(!usn){
				$('.user_tel label').text('请输入手机号码').addClass('tip_error');
			}else{
				if(regExpManger.regTel.test(usn)){
					$('.user_tel label').removeClass();
					isOk = true;
				}else{
					$('.user_tel label').text('请输入正确的手机号码').addClass('tip_error');
				}
			}
		});
	}
	
	function checkPsw(){
		isOk = false;
		$('#psw').focus(function(){
			$(this).addClass('focus');
			$('.password label').removeClass().text('6-20位字符，可使用字母、数字或符号的组合,，不建议使用纯字母、纯数字、纯符号').addClass('tip_tips');
		});
		$('#psw').blur(function(){
			isOk = false;
			$(this).removeClass('focus');
			$('.password label').removeClass();
			var pwd = $('#psw').val();
			if(!pwd){
				$('.password label').text('密码长度只能在6-20位字符之间，不包含空格').addClass('tip_error');
			}else{
				if(regExpManger.regPsw.test(pwd)){
					$('.password label').removeClass();
					isOk = true;
				}else{
					$('.password label').text('密码长度只能在6-20位字符之间，不包含空格').addClass('tip_error');
				}
			}
		});
	}
	
	function checkPsw2(){
		isOk = false;
		$('#psw2').focus(function(){
			$(this).addClass('focus');
			$('.PSW2 label').removeClass().text('请再次输入密码').addClass('tip_tips');
		});
		$('#psw2').blur(function(){
			isOk = false;
			$(this).removeClass('focus');
			$('.PSW2 label').removeClass();
			var pwd = $('#psw').val();
			var pwd2 = $('#psw2').val();
			if(!pwd2 && pwd){
				$('.PSW2 label').text('两次输入密码不一致').addClass('tip_error');
			}else if(!pwd2 && !pwd){
				$('.PSW2 label').removeClass();
			}else{
				if(pwd==pwd2){
					$('.PSW2 label').removeClass();
					isOk=true;
				}else{
					$('.PSW2 label').text('两次输入密码不一致').addClass('tip_error');
				}
			}
		});
	}
	
	function createCore(){
		var img_src =[
			{imgsrc:'img/GetCheckCode.png',value:'yh4n'},
			{imgsrc:'img/GetCheckCode2.png',value:'9n4p'},
			{imgsrc:'img/GetCheckCode3.png',value:'wrad'},
			{imgsrc:'img/GetCheckCode4.png',value:'prje'},
			{imgsrc:'img/GetCheckCode5.png',value:'hecr'},
			{imgsrc:'img/GetCheckCode6.png',value:'wk6t'},
			{imgsrc:'img/GetCheckCode7.png',value:'l85g'},
			{imgsrc:'img/GetCheckCode8.png',value:'ldft'},
			{imgsrc:'img/GetCheckCode9.png',value:'w4a9'}
			];
		var ranNum = parseInt(Math.random()*img_src.length); 
		$('.core a').html('<img src='+img_src[ranNum].imgsrc+'/>');
		$('#hide_code').val(img_src[ranNum].value);
		
	}
	$('.core a').click(function(){
			createCore();
	});
	function checkCoreImg(){
		isOk = false;
		$('#core_img').focus(function(){
			$(this).addClass('focus');
			$('.core label').removeClass();
		});
		$('#core_img').blur(function(){
			isOk = false;
			$(this).removeClass('focus');
			$('.core label').removeClass();
			var core_img = $('#core_img').val();
			var core = $('#hide_code').val();
			if(core==core_img){
				$('.core label').removeClass();
				isOk = true;
			}else{
				$('.core label').text('验证码错误').addClass('tip_error');
			}
		});
	}
	
	function checkTelcore(){
		isOk = false;
		$('#tel_core').focus(function(){
			$(this).addClass('focus');
			$('.tel_core label').removeClass();
		});
		$('#tel_core').blur(function(){
			$(this).removeClass('focus');
			$('.tel_core label').removeClass();
			var tel_core = $('#tel_core').val();
			if(!tel_core){
				$('.tel_core label').text('请输入验证码').addClass('tip_error');
				isOk = false
				return;
			}
//			if(tel_core==core){
//				$('.tel_core label').removeClass();
//			}else{
//				$('.tel_core label').text('验证码不正确或者已经超时').addClass('tip_error');
//			}
		});
	}
	
	function checked(){
		$('#check_service').change(function(){
			if($('#check_service').is(':checked')){
				$('.check label').removeClass();
				isOk = true;
			}else{
				$('.check label').removeClass().text('请仔细阅读并同意以上协议').addClass('tip_error');
				isOk = false;
			}
		});
	}
	checkUsn();
	checkCoreImg();
	checkPsw();
	checkPsw2();
	checkTelcore();
	checked();
	$('.btn_reg').click(function(){
		$('#usertel').blur();
		isOk=true;
		if(isOk){
			$('#core_img').blur();
		}
		if(isOk){
			$('#psw').blur();
		}
		if(isOk){
			$('#psw2').blur();
		}
		if(isOk){
			$('#check_service').change();
		}
		var usn = $('#usertel').val();
		var pwd = $('#psw').val();
		if(isOk){
			var usersStr = $.cookie("registeredUsers") ? $.cookie("registeredUsers") : "{}";
			var usersObj = JSON.parse(usersStr); 
				 if(usn in usersObj){
				 	$('.user_tel label').text("手机号码 "+usn+" 已经被占用").addClass('tip_error');
				 	return;
				 } else {
				 	usersObj[usn] = pwd; 
				 	usersStr = JSON.stringify(usersObj);
				 	$.cookie('registeredUsers', usersStr, {expires:90, path:"/"});
				 		location.href = '../index.html';
				 }
			return;
		}else{
			checkUsn();
			checkPsw();
			checkPsw2();
			checkCoreImg();
			checkTelcore();
			checked();
		}
	});
});