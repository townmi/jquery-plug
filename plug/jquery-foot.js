'use strict';
/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.22
 *
 */

jQuery.fn.foot = function (){
	
	$(document).on('change',function(){
		alert(2);
	});
	document.body.onresize = function(){
		alert(1);
	}
	console.log($("body"))
	setTimeout(function(){
		$('.test').html('<span>alert(1)</span>')
	},2000)
	
}
$(window).foot();