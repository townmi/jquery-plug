'use strict';
/*
* author : towne
* version : 0.0.1
* date : 2015.1.22
*
*/

define(function (require, exports, module){

	var $ = jQuery = require("jquery");

	function Drag (obj){

		this.source = obj.source;
		this.box 	= obj.box;
		this.see    = true;

	}

	Drag.prototype.init = function() {
		
		var _this = this;

		this.source.on('mousedown', function(e){

			var X = e.clientX - _this.box.offset().left;
			var Y = e.clientY - _this.box.offset().top;
			var W = $(window).width();
			var H = $(window).height();

			$(document).on('mousemove', function (e){

				var L = e.clientX - X + _this.box.outerWidth()/2;
				var T = e.clientY - Y + _this.box.outerHeight()/2;

				if(_this.see){

					if(L < _this.box.outerWidth()/2+10) L = _this.box.outerWidth()/2;
					if(T < _this.box.outerHeight()/2+10) T = _this.box.outerHeight()/2;
					if(L > W-_this.box.outerWidth()/2-10) L = W-_this.box.outerWidth()/2;
					if(T > H-_this.box.outerHeight()/2-10) T = H-_this.box.outerHeight()/2;

				}

				_this.box.css({
					left : L,
					top : T
				})
			});
			$(document).on('mouseup', function (e){
				$(document).off("mousemove mouseup");
			});

			return false;
		})

	};

	module.exports = Drag;

})