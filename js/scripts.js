$(document).ready(function(){

		// VARIABLES
		var header_menu_name 	= 'header-menu',
				header_menu 			= $('.' + header_menu_name),
				button_menu 			= $('.btn-menu'),
				body 							= $(".body"),
				responsiveBr      = 1024,
				visibility        = "in visible",
		 		backdrop = $("<div />", {
					class: "vmodal-backdrop fade"
				});
		//MENU
			//SCRIPTS
			function toggler(){
				body.toggleClass("header-menu-push");
				button_menu.toggleClass('navbar-toggle-open');
				header_menu.toggleClass('header-menu-open');
			}
			button_menu.click(function(e){
				toggler();
				e.stopPropagation();
			});
			$('.anchor-menu').click(function(){
				var href = $(this).attr('href');
				$('body,html').animate({
					scrollTop: $(href).offset().top
				},2000);
				toggler();
				return false;
			});
			function menuSwipe(){
				if ( $(document).width() <= responsiveBr ) {
					body.hammer().on("swiperight", function(){
						toggler();
					}).on("swipeleft", function(){
						toggler();
					});
				}
			}
			menuSwipe();
			$(window).resize(menuSwipe);
			
		
		// $(document).click(function(e){
		// 	if( header_menu.hasClass(header_menu_name + '-open') ) {
		// 		if ( ! $(e.target).is('.'+header_menu_name + ', .'+header_menu_name+"*") ) {
		// 			toggler();
		// 		}
		// 	}
		// });

		// SCROLL TO BLOCK
		$('.anchor').click(function(){
			var href = $(this).attr('href');
			$('body,html').animate({
				scrollTop: $(href).offset().top
			},2000);
			return false;
		});

		function closeVideo(){
			$("#modal_video .vmodal-video").html("");
		}
		//MODAL
			$('[data-modal="modal"]').click(function(){
				var thisTarget = $(this).attr("data-modal-target");
				$(thisTarget).addClass(visibility);
				body.append(backdrop).addClass("vmodal-open");
				backdrop.addClass(visibility);
			});
			$('[data-close="modal"]').click(function(){
				$(this).closest(".vmodal").removeClass(visibility);
				backdrop.removeClass(visibility);
				body.removeClass("vmodal-open");
			});
			$(window).click(function(e){
				if ( backdrop.length > 0 ) {
					if ( $(e.target).is(".vmodal") ) {
						$(".vmodal.in").removeClass(visibility);
						backdrop.removeClass(visibility);
						body.removeClass("vmodal-open");
						closeVideo();
					}
				}
			});
		
		//VIDEO
		$('[data-video="video"]').click(function(){
			var videoSrc = $(this).attr('data-video-src');
			var iframe = $("<iframe />", {
				width: "100%",
				height: "315",
				src: videoSrc + "?autoplay=1",
				frameborder: "",
				allowfullscreen: "allowfullscreen"
			});
			$("#modal_video .vmodal-video").append(iframe);
		});
		$('[close-video="video"]').click(function(){
			closeVideo();
		});

		//FOOTER
		function changeName(btnName, btnHasClass, btnRemovedClass){
			btnName.toggleClass("open");
			if( btnName.hasClass("open") ) {
				btnName.text(btnHasClass);
			}else{
				btnName.text(btnRemovedClass);
			}
		}
		$("#showFooterMenu").click(function(){
			$("#footerMenu").slideToggle("slow");
			changeName($(this),"Скрыть меню", "Показать меню");
		});
		$("#showAbout").click(function(){
			$(".about-wrap").toggleClass("about-visible-blocks");
			changeName($(this),"Скрыть", "Показать еще");
			$("body,html").animate({
				scrollTop: $("#aboutUsWriting").offset().top
			}, 2000);
			return false;
		});
		$('.events-carousel').owlCarousel({
		    loop: true,
		    margin: 10,
		    nav: true,
		    navText: ["", ""],
		    responsive:{
		        0:{
		            items:1
		        }
		    }
		});
});	