$(function(){
//	商品推荐的遮罩
	
	//根据登录状态和购物车内容变更内容
	function cartChange(){
		var user = $.cookie('loginedUser');
		if(!user){
			$('.noneCar').hide();
			$('.haveCar').hide();
			$('.shangpintuijian').show();
			$('.noLogined').show();
		}else{
			var cart = $.cookie('cart');
			if(!cart){
				$('.noLogined').hide();
				$('.haveCar').hide();
				$('.shangpintuijian').show();
				$('.noneCar').show()
			}else{
				$('.noLogined').hide();
				$('.noneCar').hide();
				$('.shangpintuijian').hide();
				$('.haveCar').show();
			}
		}
	}
	cartChange();
	/*获取本地数据,返回 数组对象*/
	function getAllData(){
		var cart = $.cookie('cart');
		var cartObj = JSON.parse(cart);
		return cartObj;
	}
	cartObj = getAllData();
	/*循环遍历数组，获取每一个对象中的num值相加总和*/
	var total=0;
	for(var goodId in cartObj){
		add(cartObj[goodId],goodId);
		total+=cartObj[goodId].num;
	}
	$('.totalPrice').html(getTotalPrice());
	$(".totalNum").html(getSelectedNum());
//	总价的计算
	function getTotalPrice(){
		var sum = 0;
		$("input[type='checkbox']").not('#allGoods,#allShop').each(function(){
			if($(this).prop("checked")){
				var tr = $(this).parent().parent();
				var m = parseFloat(tr.children().eq(1).find('i').html());
				var n = parseInt(tr.children().eq(2).children().eq(2).val());
				var temp = Number(m*n).toFixed(1);
				sum = temp+sum;
			}
		});
		return sum;
	}
//	得到总数
	function getTotalNum(){
		cartObj = getAllData();
		var total=0;
		for(var goodId in cartObj){
			total+=cartObj[goodId].num;
		}
		return total;
	}
//	得到选中的商品总数
	function getSelectedNum(){
		var sum = 0;
		cartObj = getAllData();
		$("input[type='checkbox']").not('#allGoods,#allShop').each(function(){
			if($(this).prop('checked')){
				var tr = $(this).parent().parent();
				var id = tr.find('input[type="hidden"]').val();
				for(var goodId in cartObj){
					if(goodId == id){
						sum += cartObj[id].num;
					}
				}
			}
		});
		return sum;
	}
/*全选实现*/
	$('#allGoods,#allShop').change(function(){
		if($(this).prop('checked')) {
			$('input[type="checkbox"]').prop('checked',true);
		}else{
			$('input[type="checkbox"]').prop('checked',false);
		}
		$('.totalPrice').html(getTotalPrice()) ;
		$(".totalNum").html(getSelectedNum());
	});
/*循环遍历为每一个checkbox添加一个onchange事件*/
	$("input[type='checkbox']").each(function(){
		$(this).change(function() {
			checkAllChecked();
			$(".totalNum").html(getSelectedNum());
			$('.totalPrice').html(getTotalPrice());
		});
	});	

	/*检测是否要全选*/
	function checkAllChecked(){
		var isSelected = true;
		$('input[type="checkbox"]').not('#allGoods,#allShop').each(function(){
			if(!$(this).prop('checked')) {
				isSelected=false;
				return false;
			}
		});
		$('#allGoods,#allShop').prop('checked',isSelected);
	}
	//加减操作
	$('.des').click(function(){
		$(this).parent().siblings().first().find('input').prop('checked',true);
		checkAllChecked();
		var num = $(this).siblings('input[type="text"]').val();
		$(this).siblings('input[type="text"]').val(function(){
			if(num==1){
				return 1;
			}else{
				num--;
				return num;
			}
		});
		var id = $(this).siblings('input[type="hidden"]').val();
		cartObj = getAllData();
		cartObj[id].num = parseInt($(this).siblings('input[type="text"]').val());
		cartObj[id] = {
				no : cartObj[id].no,
				name : cartObj[id].name,
				price : cartObj[id].price,
				src : cartObj[id].src,
				shop: cartObj[id].shop,
				num : cartObj[id].num
		};
		cartStr = JSON.stringify(cartObj);
		$.cookie('cart', cartStr, {expires:7,path:"/"});
		$('.totalPrice').html(getTotalPrice());
		$(".totalNum").html(getSelectedNum());
		$(".cart_num").text(getTotalNum());
	});
	$('.inc').click(function(){
		$(this).parent().siblings().first().find('input').prop('checked',true);
		checkAllChecked();
		var num = $(this).siblings('input[type="text"]').val();
		$(this).siblings('input[type="text"]').val(function(){
				num++;
				return num;
		});
		var id = $(this).siblings('input[type="hidden"]').val();
		cartObj = getAllData();
		cartObj[id].num = parseInt($(this).siblings('input[type="text"]').val());
		cartObj[id] = {
				no : cartObj[id].no,
				name : cartObj[id].name,
				price : cartObj[id].price,
				src : cartObj[id].src,
				shop: cartObj[id].shop,
				num : cartObj[id].num
		};
		cartStr = JSON.stringify(cartObj);
		$.cookie('cart', cartStr, {expires:7,path:"/"});
		$('.totalPrice').html(getTotalPrice());
		$(".totalNum").html(getSelectedNum());
		$(".cart_num").text(getTotalNum());
	});
//	删除操作
	function deleteObjByPid(id){
		cartObj = getAllData();
		for(goodId in cartObj){
			if(goodId == id){
				delete(cartObj[id]);
				break;
			}
		}
		cartStr = JSON.stringify(cartObj);
		console.log(cartStr);
		$.cookie('cart', cartStr, {expires:7,path:"/"});
		if(cartStr =="{}"){
			$.removeCookie("cart", {path:"/"});
		}
	}
	$('.removeGood').click(function(){
		var id = $(this).parent().prev().children('input[type="hidden"]').val();
		var tr = $(this).parent().parent(); 
		if(confirm("确定要从购物车移除该商品吗?")) {
				deleteObjByPid(id);
				tr.remove();
			}
			cartChange();
			$('.totalPrice').html(getTotalPrice());
			$(".cart_num").text(getTotalNum());
			$(".totalNum").html(getSelectedNum());
	});

	$('.removeSele').click(function(){
		if(confirm("确定要从购物车移除选中的商品吗?")) {
			$('input[type="checkbox"]').not("#allGoods,#allShop").each(function(){
				if($(this).prop('checked')){
					var tr = $(this).parent().parent();
					var id = tr.find('input[type="hidden"]').val();
					deleteObjByPid(id);
					tr.remove();
				}
			});
			cartChange();
			$('.totalPrice').html(getTotalPrice());
			$(".cart_num").text(getTotalNum());
			$(".totalNum").html(getSelectedNum());
		}
	});
	//内容自动生成
	function add(obj,id){
		$('tbody').append(
			'<tr class="good">'+
				'<td colspan="2">'+
					'<input type="checkbox" id="seleGood" class="ck"/>'+
					'<dl>'+
						'<dt><img src="../detail/'+obj.src+'" width="50" height="50"/></dt>'+
						'<dd>'+
							'<p>'+obj.name+'</p>'+
							'<i>'+obj.no+'</i>'+
						'</dd>'+
					'</dl>'+
				'</td>'+
				'<td>￥<i>'+Number(obj.price).toFixed(2)+'</i></td>'+
				'<td class="goodNum_pos">'+
					'<input type="hidden" value="'+id+'"/>'+
					'<button class="des">-</button>'+
					'<input type="text" id="goodNum" value="'+obj.num+'"/>'+
					'<button class="inc">+</button>'+
				'</td>'+
				'<td>'+
					'<button class="removeGood">删除</button>'+
				'</td>'+
			'</tr>'
		);
	};
});
