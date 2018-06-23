$(function(){
	$.ajax({
		type: "GET",
		url: "http://workbywmf.duapp.com/projects/zhongjiu/zhongjiuSer/src/com/servlet/GoodInfoServlet.java",
		data:{
//			goodname:goodname, 
//			goodbrand:goodbrand, 
//			goodaddress:goodaddress,
//			gooddegree:gooddegree, 
//			goodtype:goodtype,
//			goodcontent:goodcontent,
//			shop:shop, 
//			goodid:goodid
		},
		cache:false, 
		dataType:'STRING',    
    	success:function(data) {
        	if(data.msg =="true" ){    
            	console.log(data);  
           	window.location.reload();    
       		}else{    
           	 	view(data.msg);    
       		}    
     	},    
     	error : function() {     
          alert("异常！");    
    	}
	});
	for(var goodid in data){
	$(".goodTab").append(
			"<tr>
				<td>data.goodid</td>
				<td>data.goodid</td>
				<td>data.goodid</td>
				<td>data.goodid</td>
				<td>data.goodid</td>
			</tr>"
		);
	}
});
