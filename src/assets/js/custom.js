(function($) {

	'use strict';
	// Mean Menu
	$('.mean-menu').meanmenu({
		meanScreenWidth: "1024"
	});
	
	// Sticky, Go To Top JS
	$(window).on('scroll', function() {
		// Header Sticky JS
		if ($(this).scrollTop() >150){  
			$('.top-menu').addClass("is-sticky");
		}
		else{
			$('.top-menu').removeClass("is-sticky");
		};

		// Go To Top JS
		var scrolled = $(window).scrollTop();
		if (scrolled > 300) $('.go-top').addClass('active');
		if (scrolled < 300) $('.go-top').removeClass('active');
	});
	$(window).on('scroll', function() {
		// Header Sticky JS
		if ($(this).scrollTop() >150){  
			$('.navbar-area').addClass("is-sticky");
		}
		else{
			$('.navbar-area').removeClass("is-sticky");
		};

		// Go To Top JS
		var scrolled = $(window).scrollTop();
		if (scrolled > 300) $('.go-top').addClass('active');
		if (scrolled < 300) $('.go-top').removeClass('active');
	});
	
	// Click Event JS
	$('.go-top').on('click', function() {
		$("html, body").animate({ scrollTop: "0" }, 50);
	});

	// Count Time JS
	function makeTimer() {
		var endTime = new Date("november  30, 2022 17:00:00 PDT");			
		var endTime = (Date.parse(endTime)) / 1000;
		var now = new Date();
		var now = (Date.parse(now) / 1000);
		var timeLeft = endTime - now;
		var days = Math.floor(timeLeft / 86400); 
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
		if (hours < "10") { hours = "0" + hours; }
		if (minutes < "10") { minutes = "0" + minutes; }
		if (seconds < "10") { seconds = "0" + seconds; }
		$("#days").html(days + "<span>Day</span>");
		$("#hours").html(hours + "<span>Hours</span>");
		$("#minutes").html(minutes + "<span>Minutes</span>");
		$("#seconds").html(seconds + "<span>Seconds</span>");
		
		$("#dayss").html(days + "<span>d</span>");
		$("#hourss").html(hours + "<span>h</span>");
		$("#minutess").html(minutes + "<span>m</span>");
		$("#secondss").html(seconds + "<span>s</span>");
	}
	setInterval(function() { makeTimer(); }, 300);

	// Preloader
	$(window).on('load', function() {
		$('.preloader').addClass('preloader-deactivate');
	}) 

	// Others Option For Responsive JS
	$(".others-option-for-responsive .dot-menu").on("click", function(){
		$(".others-option-for-responsive .container .container").toggleClass("active");
	});

	// Case Studies Slide JS
	$('.case-studies-slide').owlCarousel({
		loop: true,
		margin: 30,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-line'></i>",
			"<i class='ri-arrow-right-line'></i>",
		],
		responsive: {
			0: {
				items: 1,
			},
			414: {
				items: 1,
			},
			576: {
				items: 1,
			},
			768: {
				items: 3,
			},
			992: {
				items: 3,
			},
			1200: {
				items: 3,
			},
		},
	});
	// Case Studies Slide JS
	$('.case-studies-slide1').owlCarousel({
		loop: true,
		margin: 30,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-line'></i>",
			"<i class='ri-arrow-right-line'></i>",
		],
		responsive: {
			0: {
				items: 1,
			},
			414: {
				items: 1,
			},
			576: {
				items: 1,
			},
			768: {
				items: 1,
			},
			992: {
				items: 1,
			},
			1200: {
				items: 1,
			},
		},
	});




	// Customer Slide JS
	$('.banner-slide').owlCarousel({
		loop: true,
		margin: 50,
		nav: false,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		// navText: [
		// 	"<i class='ri-arrow-left-line'></i>",
		// 	"<i class='ri-arrow-right-line'></i>",
		// ],
		responsive: {
			0: {
				items: 1,
			},
			414: {
				items: 1,
			},
			576: {
				items: 1,
			},
			768: {
				items: 1,
			},
			992: {
				items: 1,
			},
			1200: {
				items: 1,
			},
		},
	});


	// Customer Slide JS
	$('.banner-slide').owlCarousel({
		loop: true,
		margin: 24,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navContainer: '.custom-arrows',  
		navText: [                     
		  '.',  
		  ''
		],
		responsive: {
		  0: {
			items: 1,
		  },
		  414: {
			items: 1,
		  },
		  576: {
			items: 1,
		  },
		  768: {
			items: 1,
		  },
		  992: {
			items: 1,
		  },
		  1200: {
			items: 1,
		  },
		},
	  });
	  
	// Partner Slide JS
jQuery('.partner-slide').owlCarousel({
		loop: true,
		margin: 40,
		nav: false,
		dots: false,
		arrows:false,
		autoPlay : true,
        stopOnHover : true,
		pagination:false,
		autoHeight : true,
		smartSpeed:2000,
		autoplayTimeout:2000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 2,
			},
			414: {
				items: 2,
			},
			576: {
				items: 3,
			},
			768: {
				items: 4,
			},
			992: {
				items: 3,
			},
			1200: {
				items: 4,
			},
		},
	});
	// Partner Slide JS
jQuery('.insight-section-slider').owlCarousel({
	loop: false,
		margin: 10,
		nav: true,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		center:true,
		navText: [
			"<i class='ri-arrow-left-line'></i>",
			"<i class='ri-arrow-right-line'></i>",
		],
		responsive: {
			0: {
				items: 2,
			},
			414: {
				items: 1,
			},
			576: {
				items: 2,
				center:false,
				loop: true,
			},
			768: {
				items: 3,
				center:false,
			},
			992: {
				items: 3,
			},
			1200: {
				items: 3,
			},
		},
	});



	jQuery('.customer-slide').owlCarousel({
		loop:false,
		margin:10,
		dots:false,
		nav:false,
		autoplay:true,
		responsive:{
			0:{
				items:1
			},
			768:{
				items:1
			},
			1000:{
				items:1
			}
		}
	})


	// Subscribe form JS
	$(".newsletter-form").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
		// handle the invalid form...
			formErrorSub();
			submitMSGSub(false, "Please enter your email correctly.");
		} else {
			// everything looks good!
			event.preventDefault();
		}
	});
	function callbackFunction (resp) {
		if (resp.result === "success") {
			formSuccessSub();
		}
		else {
			formErrorSub();
		}
	}
	function formSuccessSub(){
		$(".newsletter-form")[0].reset();
		submitMSGSub(true, "Thank you for subscribing!");
		setTimeout(function() {
			$("#validator-newsletter, #validator-newsletter-2").addClass('hide');
		}, 4000)
	}
	function formErrorSub(){
		$(".newsletter-form").addClass("animated shake");
		setTimeout(function() {
			$(".newsletter-form").removeClass("animated shake");
		}, 1000)
	}
	function submitMSGSub(valid, msg){
		if(valid){
			var msgClasses = "validation-success";
		} else {
			var msgClasses = "validation-danger";
		}
		$("#validator-newsletter, #validator-newsletter-2").removeClass().addClass(msgClasses).text(msg);
	}
	
	// AJAX MailChimp JS
	$(".newsletter-form").ajaxChimp({
		url: "https://Envy Theme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
		callback: callbackFunction
	});

	// Odometer JS
	$('.odometer').appear(function(e) {
		var odo = $(".odometer");
		odo.each(function() {
			var countNumber = $(this).attr("data-count");
			$(this).html(countNumber);
		});
	});

	// WOW Animation
	if ($('.wow').length) {
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated', 
			offset: 0, 
			mobile: false, 
			live: true, 
		});
		wow.init();
	}

	// Search Popup JS
	$('.close-btn').on('click', function() {
		$('.search-overlay').fadeOut();
		$('.search-btn').show();
		$('.close-btn').removeClass('active');
	});
	$('.search-btn').on('click', function() {
		$(this).hide();
		$('.search-overlay').fadeIn();
		$('.close-btn').addClass('active');
	});





	
})(jQuery);

$(function() {
	$('a[href="#search"]').on("click", function(event) {
	  event.preventDefault();
	  $("#search").addClass("open");
	  $('#search > form > input[type="search"]').focus();
	});
  
	$("#search, #search button.close").on("click keyup", function(event) {
	  if (
		event.target == this ||
		event.target.className == "close" ||
		event.keyCode == 27
	  ) {
		$(this).removeClass("open");
	  }
	});
  
	$("form").submit(function(event) {
	  event.preventDefault();
	  return false;
	});
  });

  	