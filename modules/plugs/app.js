// 'use strict';
// /*
//  * author : towne
//  * version : 0.0.3
//  * date : 2015.1.20
//  *
//  */


define(function (require, exports, module){

	var $ = jQuery = require("jquery");

	var Dialog = require("plugs/dialog");

	module.exports = function(){

		$(".js_dialog_1").on('click', function(){

			var dialog = new Dialog();

			dialog.init();

		})

	}

})