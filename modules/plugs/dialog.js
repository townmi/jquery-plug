// 'use strict';
/*
* author : towne
* version : 0.0.1
* date : 2015.1.22
*
*/

define(function (require, exports, module){

	var $ = jQuery = require("jquery");

	function Dialog (config){

		var _this = this;

		var config = $.extend(true, {
			module : {
				className : "ui_dialog js_drag_box",
				targetName: "div",
				events    : {
				},
				style     : {
					"width" : 520
				},
				elements  : {
					head : {
						className : "ui_dialog_head js_drag_control",
						targetName: "div",
						events    : {
						},
						elements  : {
							close : {
								className : "ui_dialog_close",
								targetName: "a",
								events    : {
									click : function(){
										_this.destroy();
									}
								}
							},
							min : {
								className : "ui_dialog_min",
								targetName: "a"
							},
							max : {
								className : "ui_dialog_max",
								targetName: "a"
							}
						}
					},
					body : {
						className : "ui_dialog_body",
						targetName: "div"
					},
					foot : {
						className : "ui_dialog_foot",
						targetName: "div"
					}
				}	
			},
			mask : {
				className : "ui_mask",
				targetName: "div",
				events    : {
					click : function(){
						_this.destroy();
					}
				},
				style     : {
					"position" : "absolute",
					"left"	   : 0,
					"top"	   : 0
				}
			}
		}, config); 

		this.config = config;

		this.collections = {};

	}

	Dialog.prototype.init = function() {

		var _this = this;

		function __createElement(arr){

			var fn = arguments;

			$.each(arr[0], function (name, value){

				if(value["className"]){

					var ele = $("<"+value["targetName"]+">").addClass(value["className"]);

					_this.collections[name] = ele;

					if(value["events"]){
						$.each(value["events"], function (eventName, fn){
							ele.on(eventName, fn);
						})
					}
					if(value["style"]){
						ele.css(value["style"]);
					}
					if(value["content"]){

						if(typeof value["content"] === "string"){

							ele.html( value["content"] );

						}else if(value["content"] instanceof jQuery){

							ele.append( value["content"] );

						}

					}

					if(!arr[1]){

						$("body").append(ele);

					}else{

						arr[1].append(ele);

					}

					if(value["elements"]){

						return fn.callee([value["elements"], ele]);

					}

				}

			})

		}

		function __draw(mask, dialog){
			var W = $(window).width();
			var H = $(document).outerHeight() < $(window).height() ? $(window).height() : $(document).outerHeight();
			mask.css({"width" : W, "height" : H, "z-index" : "999"});
			dialog.css({ "margin-left" : -dialog.outerWidth() / 2, "margin-top" : -dialog.outerHeight() / 2, "z-index" : "1000"});
		}

		__createElement([this.config, null]);

		__draw(this.collections.mask.hide(), this.collections.module.hide());

		$(window).on("resize scroll", function(){
			__draw(_this.collections.mask, _this.collections.module);
		});

		return this.collections;

	};

	Dialog.prototype.ele = function(){

		this.collections.module.show();
		this.collections.mask.fadeIn();

	};

	Dialog.prototype.destroy = function(){

		var _this = this;

		this.collections.mask.fadeOut(function(){
			$.each(_this.collections, function (element, value){
				value.remove();
			})
		})

	}

	module.exports = Dialog;

})