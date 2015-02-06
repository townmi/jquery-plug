'use strict';
/*
 * author : towne
 * version : 0.0.3
 * date : 2015.1.20
 *
 */

define(function (require, exports, module){

	var $ = jQuery = require("jquery");

	var Dialog = require("plugs/dialog");

	var Drag = require("plugs/drag");

	var Calendar = require("plugs/calendar");

	module.exports = function(){

		$('body').css({
			height: $(window).height()
		});

		$(window).on('resize', function(){
			$('body').css({
				height: $(window).height()
			});
		})


		var c = new Calendar($(".js_calendar_box"));

		c.draw();
		
		c.events();

		console.log(c)

		$(".js_dialog_1").on('click', function(){

			var dialog = new Dialog(),
				get    = dialog.init();

			var drag = new Drag({

				source : get.head,
				box	   : get.module

			})

			dialog.ele();
			
			drag.init();

		})

	}

})