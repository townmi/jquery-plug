// 'use strict';
// /*
//  * author : towne
//  * version : 0.0.3
//  * date : 2015.1.20
//  *
//  */


define(function (require, exports, module){

	var $ = jQuery = require("jquery");

	var fn = require("plugs/jquery-dialog");

	fn({
		box : $(".JS_dialog_1")
	});

	console.log( fn );

	module.exports = function(){

		$(".js_dialog_1").on('click', function(){
			console.log($(this));

			// $(this).dislogOpen({
			// 	box : 
			// });
		})

	}

})