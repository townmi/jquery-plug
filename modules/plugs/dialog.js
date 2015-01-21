// 'use strict';
// /*
//  * author : towne
//  * version : 0.0.3
//  * date : 2015.1.20
//  *
//  */
// var config = $.extend(true,{
// 		IsValidate:true,
// 		hmsg:"",
// 		showok:{show:true,showclass:"tip-ok"},
// 		style:{className:'tip-info',alignX:'right',alignY:'center',offsetX:8,showOn:"none",alignTo:'target',keepInViewport:false},
// 		div:false
// 	},config);

define(function (require, exports, module){

	var $ = jQuery = require("jquery");

	function Dialog (config){

		var config = $.extend(true, {
			box : {
				className : "ui_dialog",
				targetName: "div",
				elements  : {
					head : {
						className : "ui_dialog_head",
						targetName: "div",
						elements  : {
							close : {
								className : "ui_dialog_close",
								targetName: "a"
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
			}
		}, config); 

		this.config = config

	}

	Dialog.prototype.init = function() {

		function __createElement(arr){

			var fn = arguments;

			$.each(arr[0], function (name, value){

				if(value["className"]){

					var ele = $("<"+value["targetName"]+">").addClass(value["className"]);

					console.log(1);

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

		__createElement([this.config, null]);



	};

	module.exports = Dialog;
	// module.exports = jQuery.fn.dialogOpen = function (j) {
	// 	// this is open source
	// 	var _this = this,
	// 		fn  = null,
	// 		secret = $(_this).attr('dialogOpen'),
	// 		box = null;

	// 	if(j && j.box){
	// 		box = j.box;
	// 	}else{
	// 		$("*[dialogBox]").each(function() {
	// 			if ($(this).attr('dialogBox') === secret) {
	// 				// box is open Box
	// 				box = $(this);
	// 			}
	// 		});
	// 	}
	// 	if(j && j.fn){
	// 		fn = j.fn;
	// 	}
	// 	var mask = $("*[dialogMask]");
	// 	// 初始化 || 默认隐藏弹出层的元素
	// 	init();
	// 	// 窗口尺寸重载
	// 	$(window).on('resize scroll', function() {
	// 		init();
	// 	});
	// 	// 加标识
	// 	box.attr('onoff',"1");
	// 	mask.stop().fadeIn(100);
	// 	box.stop().show(200, fn);
	// 	// 计算遮罩和主体的位置及尺寸
	// 	function init() {
	// 		var W = $(window).width();
	// 		var H = $(document).outerHeight() < $(window).height() ? $(window).height() : $(document).outerHeight();
	// 		mask.css({"width" : W, "height" : H, "z-index" : "1000000"});
	// 		box.css({"left" : "50%", "top" : "50%", "margin-left" : -$(box).outerWidth() / 2, "margin-top" : -$(box).outerHeight() / 2, "z-index" : "10000011"});
	// 	}

	// }

})
	

// 	module.exports = jQuery.fn.dialogOpen;
// })

// ;define(function (require, exports, module){
// 	var $ = jQuery = require("jquery.min.js");

// 	console.log(jQuery.fn)

// 	jQuery.fn.dialogClose = function(j) {
// 		// close btn
// 		var _this = this,
// 			mask = $("*[dialogMask]"),
// 			number = 0,
// 			box = null,
// 			fn = null;

// 		if(j && j.fn ) fn = j.fn; 
// 		$("*[dialogBox]").each(function(){
// 			if ($(this).attr('onoff') === "1") {
// 				number++;
// 			}
// 			if($(this).has(_this).length){
// 				box = $(this);
// 			}
// 		})
// 		if(j && j.box) box = j.box;
// 		number < 2 && mask.stop().fadeOut(100);
// 		box.attr("onoff", '0');
// 		box.stop().hide(0,fn);
// 	}

// 	module.exports = jQuery.fn.dialogClose;
// })

// // ;define(function (require, exports, module){
// // 	var $ = jQuery = require("jquery");

// // 	module.exports = jQuery.fn.drag = function(){

// // 		var _this = this,
// // 		// _Box做限制本身
// // 			_Box = $(_this).parents("[dialogBox]"),
// // 			W = _Box.outerWidth(),
// // 			H = _Box.outerHeight(),

// // 		// $(this).on('mousedown', function (e){
// // 		// 	var X = e.clientX - _Box.offset().left;
// // 		// 	var Y = e.clientY - _Box.offset().top;
// // 		// 	$(document).on('mousemove', function (e){
// // 		// 		var L = e.clientX - X + W / 2;
// // 		// 		var T = e.clientY - Y + H / 2;
// // 		// 		_Box.css({
// // 		// 			left : L,
// // 		// 			top : T
// // 		// 		})
// // 		// 	});
// // 		// 	$(document).on('mouseup', function (e){
// // 		// 		$(document).off("mousemove mouseup");
// // 		// 	});
// // 		// 	return false;
// // 		// })
// // 	}
// // })

// // $(this).dialogOpen({box:$("#..."),fn:function(){}})




