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

	var Page = require("plugs/pages");


	var data = ['{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css1"}<<====>>## 1元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css2"}<<====>>## 2元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css3"}<<====>>## 3元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css4"}<<====>>## 4元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css5"}<<====>>## 5元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css6"}<<====>>## 6元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css7"}<<====>>## 7元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css8"}<<====>>## 8元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css9"}<<====>>## 9元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css10"}<<====>>## 1元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css11"}<<====>>## 2元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css12"}<<====>>## 3元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css13"}<<====>>## 4元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css14"}<<====>>## 5元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css15"}<<====>>## 6元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css16"}<<====>>## 7元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css17"}<<====>>## 8元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css18"}<<====>>## 9元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css19"}<<====>>## 1元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css20"}<<====>>## 2元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css21"}<<====>>## 3元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css22"}<<====>>## 4元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css23"}<<====>>## 5元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css24"}<<====>>## 6元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css25"}<<====>>## 7元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css26"}<<====>>## 8元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css27"}<<====>>## 9元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css28"}<<====>>## 1元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css29"}<<====>>## 2元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css30"}<<====>>## 3元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css31"}<<====>>## 4元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css32"}<<====>>## 5元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css33"}<<====>>## 6元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css34"}<<====>>## 7元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css35"}<<====>>## 8元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css36"}<<====>>## 9元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css37"}<<====>>## 1元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css38"}<<====>>## 2元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css39"}<<====>>## 3元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css40"}<<====>>## 4元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css41"}<<====>>## 5元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css42"}<<====>>## 6元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css43"}<<====>>## 7元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css44"}<<====>>## 8元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css29"}<<====>>## 2元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css30"}<<====>>## 3元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css31"}<<====>>## 4元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css32"}<<====>>## 5元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css33"}<<====>>## 6元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css34"}<<====>>## 7元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css35"}<<====>>## 8元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css36"}<<====>>## 9元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css37"}<<====>>## 1元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css38"}<<====>>## 2元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css39"}<<====>>## 3元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css40"}<<====>>## 4元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css41"}<<====>>## 5元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css42"}<<====>>## 6元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css43"}<<====>>## 7元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css44"}<<====>>## 8元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css29"}<<====>>## 2元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css30"}<<====>>## 3元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css31"}<<====>>## 4元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css32"}<<====>>## 5元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css33"}<<====>>## 6元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css34"}<<====>>## 7元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css35"}<<====>>## 8元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css36"}<<====>>## 9元素分类(常规) ',
				'{"title": "CSS样式规范一","date": "2014-05-16 11:11:15","categories" : "css37"}<<====>>## 1元素分类(常规) '

				]


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

		var page = new Page($(".js_pages"), data, $(".js_cont"), "/css");

		page.draw();

		console.log(data.length);

		$(".js_dialog_1").on('click', function(){

			var dialog = new Dialog(),
				get    = dialog.init();

			var drag = new Drag({

				source : get.head,
				box	   : get.module

			})

			dialog.ele();
			
			drag.init();

		});



	}

})