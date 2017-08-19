$(document).ready(function() {
	$('.side-bar__side-menu li').on('click', function(){
   	$('.side-bar__side-menu li').removeClass('active');
	   $(this).toggleClass('active');
});
	   
	$('.navigation-list li').on('click', function() {
	$('.navigation-list li').removeClass('active');
	   $(this).toggleClass('active');
});
});