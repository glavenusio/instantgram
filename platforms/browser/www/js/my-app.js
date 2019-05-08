var app = new Framework7({
	root: '#app',
	name: 'Instantgram',
	id: 'com.instantgram.revablemedia',
	// initOnDeviceReady: true,
	panel: { 
		swipe: 'left',
		breakpoint: 10,
	},
	dialog: {
		buttonOk: 'Sure',
	  },
	statusbar:{
		overlay: false
	},
	navbar: {
		mdCenterTitle: true,
	},
	theme: 'md',
	view: {
		reloadDetail: true
	  },
	routes: [
		{
			path: '/',
			url: 'index.html',
		},
		{
			path: '/about/',
			url: 'about.html',
		},
		{
			path: '/profile/',
			url: 'profile.html',
		},
		{
			path: '/friend/:username',
			url: 'friend.html?username={{ username }}',
		},
		{
			path: '/cart/',
			url: 'cart.html',
		},
		{
			path: '/login/',
			url: 'login.html',
		},
		{
			path: '/upload/',
			url: 'upload.html'
		},
		{
			path: '/search/',
			url: 'search.html'
		},
		{
			path: '/detail/:id/',
			url: 'detail.html?id={{ id }}',
		},
	]
});
var $$ = Dom7;
var mainView = app.views.create('.view-main',
{
	url: '/index.html/'
});


let username = localStorage.getItem("user") || null
let API_URI = 'http://172.17.0.1:8080/api'

if(!localStorage.getItem("user")){
	mainView.router.navigate("/login/");
}else{
	mainView.router.navigate("/profile/");
}

function chooseImageFrom(type){
	let opt = {
		quality: 20,
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
		encodingType: 0
	}

	if(type == 'camera') delete opt.sourceType
	navigator.camera.getPicture(onSuccess, onFail, opt);
	
	function onSuccess(imageURI) {
		$$("#gallery").append(`
			<img width="120" class="col-33 img-to-upload" src="data:image/png;base64,${imageURI}"> </img>
		`)
	}

	function onFail(fail) {
		console.log(fail);
		
	}
}


$$('#logout').on('click', () => {
	localStorage.removeItem('user')
	mainView.router.navigate("/login/");
	app.panel.close();
})


$$('#findUser').on('click', () => {
	mainView.router.navigate("/search/");
	app.panel.close();
})

function toFriendPage (u) {
	mainView.router.navigate(`/friend/${u}/`);
}

$$(document).on('deviceready', () => {
	console.log("device ready");
})

$$(document).on('page:init', function (e, page) 
{	
	if(page.name == "about") 
		{
			$$(".about-content").html("<div class='block'><h1>DIUBAH VIA DOM7 </h1></div>");
		}
	if(page.name == "login") 
		{
			app.panel.disableSwipe();
		}

	if(page.name == "search"){
		app.panel.disableSwipe();
		$$('#search_result').hide()

		$$("#inputSearch").change(() => {
			let searchUser = $$("#inputSearch").val()

			if(searchUser.length > 0)
				app.request.get(`${API_URI}/user/search.php?username=${searchUser}`,
				function (data) 
				{
					$('.item-content').remove();
					const {result} = JSON.parse(data);
					
					if(result.length < 1){
						$$("#search_status").text('No user found')
					}else{
						$$("#search_status").text(`Found ${result.length} ${result.length > 1 ? 'users' : 'user'}`)
						$$('#search_result').show()
					}
					
					for(let i = 0; i<result.length; i++){
						$$("#search_result")
						.prepend(`
							<li class="item-content head">
								<div class="item-inner" onclick="toFriendPage('${result[i].username}')" style="font-size:13px">
									<a>
									<i style="font-size:13px" class="f7-icons">chevron_right_round </i> ${result[i].username}
									</a>	
								</div>
							</li>
							`
						)
					}
				});
			else $$("#search_status").text("Type user by it's username");
				
		})
	}

	function getBase64Image(img) {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;

		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);

		var dataURL = canvas.toDataURL("image/png");
		
		return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	}
	  
	if (page.name == "upload") 
	{
		$$("#openGallery").on('click', () => {
			chooseImageFrom('gallery')
		})	
	
		$$("#openCamera").on('click', () => {
			chooseImageFrom('camera')
		})

		app.panel.disableSwipe();
		
		$$('#imageForm').on('submit', function(){
			var FData = new FormData();
			let caption = $$("#caption").val();

			$$("#gallery .img-to-upload").each(function() {  
				FData.append('images[]', this.src)	
			});

			FData.append('username', username);
			FData.append('caption', JSON.stringify(caption));
			
			$$("#status").text('Loading...')
			app.request({
				url: `${API_URI}/post/store.php`, 
				method: 'POST', 
				data: FData,
				cache: false, 
				statusCode: {
					413: function (xhr) {
						$$("#status").text('Ukuran file terlalu besar')
					}
				},
				dataType: 'application/json',
				crossDomain: true, 
				contentType: 'multipart/form-data',
				processData: true, 
				success: function (data){
					// alert(data);
					$$("#status").text('Upload success')
					setTimeout(() => {
						mainView.router.navigate("/profile/");
					}, 1.500);
				}
				});
		  });
		  

	}

	if(page.name == "friend"){
		friend = page.route.params.username
		username = friend;
		
		app.panel.disableSwipe();
		app.statusbar.show()

		$("#finfo_null_exp").hide()
		$("#loadingAtfProfile").show();

		app.request.get(`${API_URI}/user/profile.php?username=${friend}`,
		function (data) 
			{
				$("#loadingAtfProfile").remove();
				const response = JSON.parse(data);
				const { profile, gallery, encode } = response;
				
				$$("#fprofileName").html(`${profile.username}`);
				if(encode.length > 0) 
					$$("#finfo_null_exp").remove()
				else{
					$("#finfo_null_exp").show()
					$$("#fstatusPostCollection").text("No post available")
					$$("#fimg_collection").remove()
				}
					
				for(let i = 0; i<encode.length; i++){
					$$("#fimg_collection")
					.prepend(`
						<a href="/detail/${gallery[i].idposting}/">
						<div class="col-33" style="position: relative;
						height: 100px;
						overflow: hidden;
						padding: 0;
						margin: 0;
						border: .5px solid white"> 
							<img style="position: absolute;
							left: 50%;
							top: 50%;
							height: 100%;
							width: 100%;
							-webkit-transform: translate(-50%,-50%);
								-ms-transform: translate(-50%,-50%);
									transform: translate(-50%,-50%);" 
								src="data:image/png;base64,${encode[i]}" 
						</div>
						</a>`
					)
				}
			});
		}

	if(page.name == "profile"){
		username = localStorage.getItem("user")

		app.panel.enableSwipe()
		app.statusbar.show()

		if(username != localStorage.getItem("user")){
			$$("#statusPostCollection").text("No post available")
		}

		$("#info_null_exp").hide();
		$("#loadingAtProfile").show();
		
		app.request.get(`${API_URI}/user/profile.php?username=${username}`,
		function (data) 
			{
				$("#loadingAtProfile").remove();
				const response = JSON.parse(data);
				const { profile, gallery, encode } = response;
					
				// return 
				$$("#profileName").html(`${profile.username}`);
				if(encode.length > 0) 
					$("#info_null_exp").remove()
				else{
					$("#img_collection").remove()
					$("#info_null_exp").show();
				}
					
				for(let i = 0; i<encode.length; i++){
					$$("#img_collection")
					.prepend(`
						<a href="/detail/${gallery[i].idposting}/">
						<div class="col-33" style="position: relative;
						height: 105px;
						overflow: hidden;
						padding: 0;
						margin: 0;
						border: .5px solid white"> 
							<img style="position: absolute;
							left: 50%;
							top: 50%;
							height: 100%;
							width: 100%;
							-webkit-transform: translate(-50%,-50%);
								-ms-transform: translate(-50%,-50%);
									transform: translate(-50%,-50%);" 
								src="data:image/png;base64,${encode[i]}" 
						</div>
						</a>`
					)
				}
			});
	}

	
	if(page.name == "detail"){
		const id = page.route.params.id

		if(username != localStorage.getItem("user")){
			$$("#removeController").remove()
		}
		
		app.panel.disableSwipe();
		app.request.get(`${API_URI}/post/show.php?username=${username}&idposting=${id}`,
		function (data) 
		{	
			const response = JSON.parse(data);
			
			const {img_previews, post_info} = response
			
			$$("#postBy").text(`${username}`)
			$$("#postByAfter").text(`${username}`)
			$$("#captionOfPost").text(`${post_info.komen}`)
			$$("#postDate").text(moment(post_info.tanggal).tz(`Asia/Jakarta`).calendar() )
			
			if(img_previews.length == 1){
				$('#main_slider').addClass('swiper-container swiper-init demo-swiper demo-swiper-auto');
			}

			for(let i = 0; i<img_previews.length; i++){
				$('.swiper-wrapper')
				.append(`
					<div class="swiper-slide"> 
						<div style="display:flex; justify-content:space-between; align-items: center; flex-direction: column"> 
							<img 
							style="height: 200px; background: #ddd; "
							src="data:image/png;base64,${img_previews[i]}" />

							<p class="badge color-blue">${i+1} / ${img_previews.length}</p>
						</div>
					</div>`);
			}

			app.swiper.create('.swiper-container', {
				speed: 400,
				spaceBetween: 100, 
				pagination:'.swiper-pagination'
			});
			
		});
		
		$$('.open-confirm').on('click', function () {
			app.dialog.confirm('Removing photo, are you sure?', 'Confirmation', function () {
				app.request.get(`${API_URI}/post/delete.php?username=${username}&idposting=${id}`,  
				function (data) {
					const response = JSON.parse(data)							
						if(response.status == 200){
							mainView.router.navigate("/profile/");
						}
					});
		});
	});
		
	}

	if(page.name == 'login'){
		app.loginScreen.create()
		$$("#signIn").on('click', () => {
			if($$('#loginUsername').val().length > 0 && $$('#loginUsername').val().length > 0)
			
				app.request.post(`${API_URI}/user/login.php`, 
				{ 	
					username: $$('#loginUsername').val(), 
					password: $$('#loginPassword').val(), 
				},
				function (data) 
					{
						const response = JSON.parse(data)
						if(response.status != 200){
							$$( "#authentication_failed" ).html( "Authentikasi gagal" );
						}else{
							const { username } = response.data

							mainView.router.navigate('/profile/', {
								ignoreCache: true,
								reloadAll: true
							  });

							localStorage.setItem("user", username)
						}
					});
		})
	}

});