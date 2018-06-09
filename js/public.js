var isShowLoginBox = false;
$(function(){

	$('.Developmenting').click(function(){
		var t = null;
		clearTimeout(t);
		$('.warn-box').animate({
			opacity: 1,
			zIndex:9999
		},500);
		t = setTimeout(function(){
			$('.warn-box').animate({
				opacity : 0,
				zIndex:-1
			})
		},1500);
	})




//点击关注公众号

$(".follow-Public-number").click(function(){
	$('.erweima-download-modal-wrapper .download-title').html('扫码关注公众号');
	$('.erweima-download-modal-wrapper .download-code').attr('src','css/images/weichat_8bae732.png');
	$('.erweima-J-down-load-app').show();
});

//点击关注小程序

$(".follow-Small-program").click(function(){
	$('.erweima-download-modal-wrapper .download-title').html('扫码关注小程序');
	$('.erweima-download-modal-wrapper .download-code').attr('src','css/images/offical_weichat_1a0871c.png');
	$('.erweima-J-down-load-app').show();
});



//隐藏关注的框
$('.erweima-download-modal-bg').click(function(){
	$('.erweima-J-down-load-app').hide();
})


//点击联系我们
$('#showPCall').click(function(){
	$('.erweima-download-modal-wrapper .download-title').html('关注大班长号');
	$('.erweima-download-modal-wrapper .download-code').attr('src','css/images/pteblacktech5.png');
	$('.erweima-J-down-load-app').show();
})

	$(".login-btn").click(function(){
		//登陆
		isShowLoginBox = true;
		$('#login_box.login-J-down-load-app').show();
		//加载数据
		$.ajax({
			type:'GET',
			url:"https://stg-pteppp.leanapp.cn/weblogin/getqr/",
			data:{},
			async:false,
			success:function(res){
				$('.login-download-modal-wrapper .login-content .erweima').attr('src',res.qr);
				obtainLoginState(res.session);
			},
			error:function(error){
				console.log(error);
			}

		})
	});

	$("#login_box .login-download-modal-bg").click(function(){
		isShowLoginBox = false;
		$('#login_box.login-J-down-load-app').hide();
	});
})



  function userLogin(res){
    try {
      let auth = res.auth
      AV.User.loginWithAuthData(res.auth, 'lc_weapp', {
        failOnNotExist: true
      }).then(user => {
        // window.location.href = window.location.origin + '/home'
        window.location.href = 'https://stg-pteppp.leanapp.cn/home'
      })
      .catch(err => {
        console.error(err)
      })
    } catch (error) {
      console.error(error);
      alert('登陆出错')
    }
   
  }

  function obtainLoginState(id){
  	$.ajax({
  		type:"Get",
  		url:"https://stg-pteppp.leanapp.cn/weblogin/update/"+id+"",
  		data:{},
  		async:false,
  		success:function(res){
  			let state = res.state;
  			console.log(state);
		      if(state ==='normal' || state ==='scan'){
		      	if(isShowLoginBox){
			        setTimeout(() => {
			          obtainLoginState(id);
			        },1000);
		      	}
		      }else if(state == 'auth'){
		        userLogin(res)
		      }else if(state == 'invalid'){
		        alert('二维码已失效');
		      }
  		},
  		error:function(){
  			alert('登录失败');
  		}
  	})
  }