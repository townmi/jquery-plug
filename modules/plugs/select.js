'use strict';
/*
* author  : towne
* version : 0.0.1
* date	  : 2015.2.10
*
*/

define(function (require, exports, module){

	var $ = jQuery = require("jquery");

	function Select(parent){

		this.box = parent;

		this.top = $("<div>").addClass("ui_select_top clear");
		this.input = $("<input>").addClass("ui_select_input fl");
		this.btn = $("<a>").addClass("ui_select_btn fr").attr("href","javascript:;").html('<i class="fa fa-angle-down"></i>');

		this.body = $("<ul>").addClass("ui_select_body").hide();
		this.bottom = $("<div>").addClass("ui_select_bottom");

		this.dataElement = this.box.find("select").hide();

		this.data = [];

		this.init();

	}

	Select.prototype.init = function(){

		var _this = this;
		
		var W = this.box.innerWidth();

		this.top.css({"width": W-2});
		this.body.css({"width": W-2});

		this.dataElement.find("option").each(function(){

			var str = "";

			var arr = $(this).val().split("");

			$.each(arr, function (i,e){

				str += "<span>"+e+"</span>";

			})

			var Li = $("<li>").html( str ).attr("value",$(this).val()).appendTo(_this.body);

			_this.data.push(Li);

		});


		this.input.val(this.dataElement.val());

		this.top.append(this.input).append(this.btn).appendTo(this.box);
		this.box.append(this.body);
		this.box.append(this.bottom);

		console.log(this.data);

		this.events();

	}

	Select.prototype.events = function(){

		var _this = this;

		this.btn.on("click", function(){

			_this.body.slideDown();

			return false;

		});

		$.each(this.data, function (i, element){

			element.on("click", function(){

				_this.input.val($(this).attr("value"));

				_this.dataElement.val($(this).attr("value")).change();


			})

		});

		$(document).on("click", function(){

			_this.body.slideUp();

		});

		this.dataElement.on("change", function(){
			console.log($(this).val());
		})

	}

	module.exports = Select;

})