'use strict';
/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.22
 *
*/

define(function (require, exports, module){

	var $ = jQuery = require("jquery");

	var Render = require("plugs/render");

	function Page(parent, data, parentArt, url){

		this.pageBox = parent;
		this.artBox = parentArt;
		this.data = data;
		this.url = url;
		this.len = Math.ceil( data.length/5 );
		this.showData = [];
		this.currentNum = 0;
		this.init();

	}

	Page.prototype.init = function(){

		var _this = this;

		function __tab(num){

			_this.draw();

			var btnsNum = _this.pageBox.find(".js_pages_btn");

			btnsNum.removeClass("active").eq(num%5).addClass("active");

		}
		
		this.prev = $("<a>").addClass("ui_pages_prev js_pages_prev").attr("href","javascript:;").html("<i class='fa fa-angle-left'></i>").on("click", function(){

			_this.currentNum -= 5;

			if(_this.currentNum<0){
				_this.currentNum = 0;
			}

			__tab(Math.ceil( _this.currentNum/5 ) );

			console.log(Math.ceil( _this.currentNum/5 ));

		});

		this.next = $("<a>").addClass("ui_pages_next js_pages_next").attr("href","javascript:;").html("<i class='fa fa-angle-right'></i>").on("click", function(){

			_this.currentNum += 5;

			if(_this.currentNum>_this.data.length){
				_this.currentNum = _this.data.length-_this.data.length%5;
			}

			__tab(Math.ceil( _this.currentNum/5 ));

			console.log(Math.ceil( _this.currentNum/5 ));

		});

		this.more =  this.len > 5 ? $("<a>").addClass("ui_pages_more js_pages_more").attr("href","javascript:;").html("...").on("click", function(){

			if($(this).next().hasClass("js_pages_next")){
				
				var pageFirst = $(this).prev().html()-0;

				console.log( _this.len );

				if(_this.len>(pageFirst+5)){

					_this.pageBox.find(".js_pages_btn").each(function(){
						
						$(this).html($(this).html()-0+5);

					});

				}else{

					$(this).insertAfter(_this.prev);

					_this.pageBox.find(".js_pages_btn").each(function(){

						if($(this).html()-1+5>_this.len-1){

							$(this).hide();

						}
						
						$(this).html($(this).html()-0+5);

					});

				}

			}else{

				var pageFirst = $(this).next().html()-5;

				if(pageFirst<0){
					pageFirst = 0;
				}

				$(this).insertBefore(_this.next);

				_this.pageBox.find(".js_pages_btn").each(function(){


					$(this).html($(this).html()-5);

					$(this).show();

				});

			}

			_this.currentNum = _this.pageBox.find(".active").html()-1;

		}) : null;

		if(this.len>1){

			this.pageBox.append(this.prev);

			for(var i=0; i<5; i++){

				if(i>this.len-1){
					break;
				}


				var a = $("<a>").addClass("ui_pages_btn js_pages_btn").attr("href","javascript:;").html(i+1).appendTo(this.pageBox).on('click', function(){

					_this.pageBox.find(".js_pages_btn").removeClass('active');

					$(this).addClass("active");

					_this.currentNum = ($(this).html()-1)*5 ;

					_this.draw();

					console.log(_this.currentNum);
					
				});

				if(i === 0){
					a.addClass("active")
				}

			}

			this.pageBox.append(this.next);

			if(this.len>5){

				this.more.insertBefore(this.next);

			}

		}else{

			this.pageBox.hide();

		}

	}


	Page.prototype.draw = function(){

		this.artBox.html("");

		var _this = this;

		if (this.len>1){

			for(var i = this.currentNum; i<this.currentNum+5; i++){

				if(i>this.data.length-1){
					break;
				}

				var render = new Render(this.artBox, this.data[i], this.url);

				render.draw();

			}

		}else{

			$.each(this.data, function (k, s){

				var render = new Render(_this.artBox, s, _this.url);

				render.draw();

			});

		}

	}

	module.exports = Page;

})