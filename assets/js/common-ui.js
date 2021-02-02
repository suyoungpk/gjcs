var screenMode = "";
function setScreenMode(){ 
	var screen = $(window).width();
	if(screen > 768) screenMode = "pc";
	else if(screen > 640) screenMode = "tablet";
	else screenMode = "mobile";
}
function gnbEvent(){
	var isHoverEvent = screenMode == 'pc' ?  true : false;
	if(isHoverEvent) 
		$("body").off('click',".gnb > li")
		.on('mouseleave',".gnb > li",function(){ 
			$("body").removeClass('openmenu');
			$(this).find('.depth2').removeClass('show');
		}).on('mouseenter',".gnb > li",function(){ 
			$("body").addClass('openmenu');
			$(this).find('.depth2').addClass('show');
		});
		// .on('focus',".gnb > li > a",function(){ 
		// 	$("body").addClass('openmenu');
		// 	$(this).next('.depth2').addClass('show');
		// }).on('blur',".gnb > li > a",function(){ 
		// 	$("body").removeClass('openmenu');
		// 	$(this).next('.depth2').removeClass('show');
		// }).on('focus',".gnb .depth2 a",function(){ 
		// 	$("body").addClass('openmenu');
		// 	$(this).parent().parent().parent().addClass('show');
		// }).on('blur',".gnb .depth2 a",function(){ 
		// 	$("body").removeClass('openmenu');
		// 	$(this).parent().parent().parent().removeClass('show');
		// });
	else {
		$("body").off('mouseleave mouseenter',".gnb > li")
		.on('click',".gnb > li",function(){
			//console.log('click');
			//alert('resize');
			if($(this).hasClass('on')){
				$(".gnb > li").removeClass('on');
			}else{
				$(".gnb > li").removeClass('on');
				$(this).addClass('on')
			}
		});
	}
}
function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
window.addEventListener('load resize',gnbEvent);
$(function(){
	setScreenMode();
	var savedWidth = $(window).width();
	gnbEvent();
	$(window).resize(function(){ 
		var newWidth = $(window).width();
		if(savedWidth == newWidth) return ; 
		savedWidth = newWidth;
		$("body").removeClass('openmenu');
		setScreenMode();
		$("body").off('mouseleave mouseenter click',".gnb > li");
		gnbEvent();
	});
	
	var pageParm;
	if(getParameter('conId').length > 0 )
		pageParm = parseInt(getParameter('conId')) -1;
	else pageParm = null;
	if(pageParm != null){ // 페이지 로딩시 앵커이동 
		var destination = $('.anchor-content').eq(pageParm).offset().top;
		if(screenMode != 'pc') destination = destination - 88;// header 78 + 10
		$('html,body').animate({
			scrollTop:destination
		},1000);
		if(screenMode == 'pc'){
			if($('.lnb > .on').find('.anchor').length > 0){
				$('.lnb > li > ul li').removeClass('on');
				$('.lnb > .on').find('.anchor').eq(pageParm).parent().addClass('on');
			}
		}
		$('.tab-st > li').removeClass('on');
		$('.tab-st').find('.anchor').eq(pageParm).parent().addClass('on');
	}

	$('.btn-open-menu').on('click',function(){
		$("body").addClass('openmenu');
	});
	$('.btn-close-menu').on('click',function(){
		$("body").removeClass('openmenu');
	})
	$('.lnb > .on ul').slideDown('fast');
	$('.lnb > li').has('ul').find('a').on('click',function(){
		var $parent = $(this).parent();
		if($parent.hasClass('on')){
			$('.lnb > li').removeClass('on');
			$parent.find('ul').slideUp('fast');
		}else{
			$('.lnb > li').removeClass('on');
			$('.lnb > li ul').slideUp();
			$parent.addClass('on');
			$parent.find('ul').slideDown('fast');
		}
	});
	$('.nav ul > li > a').on('click',function(){
		$(this).parent().toggleClass('on');
	});
	$('.btn-top').on('click',function(){
		$(window).scrollTop(0,500)
	});
	//file첨부
	$('.attach-file input[type=file]').on('change',function(){
		 $(this).siblings('input').val($(this).val());
	});
	//tab
	$('.tab-func').each(function(){
		var $tabContainer = $(this),
			$tab = $tabContainer.find('> .tab'),
			$tabcon = $tabContainer.find('> .tabcon');
			$tab.find('> li  a').click(function(){
			$tab.find('> li').removeClass('on');
			$(this).parent().addClass('on');
			var idx = $(this).parent().index();
			$tabcon.hide().eq(idx).show();
		});
	});
	//faq
	$('.faq-toggle > li > a').on('click',function(){
		if($(this).next().is(':visible'))
			$('.faq-toggle .answer').slideUp();
		else{
			$('.faq-toggle .answer').slideUp();
			$(this).next().slideDown();
		}
	});
	function finishTop(){
		var height = $(window).height();
		var sc = $(window).scrollTop();
		if(sc > 1 ) $('.btn-top-area .btn-top').fadeIn();
		else $('.btn-top-area .btn-top').fadeOut();
	}
	
	$(window).on('scroll', function(){
		if(screenMode != 'pc') finishTop();
	});

	$(window).on('click', function(e){
		if(!$('.nav').find(e.target).length > 0) {
			$('.nav > ul > li').removeClass('on');
		}
	});
})
function openPop(pop){
	var dim = document.querySelector('.dim');
	if($('.dim').length==0) {
		var dim= document.createElement("div");
		dim.className="dim";
		dim.onclick=function(){
			$('.dim').fadeOut();
			popup.removeClass('show');
			document.body.removeChild(dim);
			if($("body").hasClass("openpop"))
				$("body").removeClass("openpop");	
		};
		document.body.appendChild(dim);
   }
   var	popup = $("#"+pop);
	popup.addClass('show');
    $("body").addClass("openpop");
}
function closePop(pop){
	var	popup = $("#"+pop);
	if(popup.hasClass('auto')) popup.remove();
	else popup.removeClass('show');
	var isPopup = false;
	$(".popup:not(#"+pop+")").each(function(){
		if($(this).is(':visible')){
			isPopup = true;
			return false;
		}
	});
	if(!isPopup) {
		document.body.removeChild(document.querySelector('.dim'));
		if($("body").hasClass("openpop"))
				$("body").removeClass("openpop");
	}
}