'use strict';
/*
 * author : towne
 * version : 0.0.1
 * date : 2015.2.10
 *
*/

define(function (require, exports, module){

	var $ = jQuery = require("jquery");

	var Render = require("plugs/render");

	function Page(parent, data, parentArt, url){

		this.pageBox = parent;
		this.data = data;
		this.artBox = parentArt;
		this.url = url;

		this.len = Math.ceil( data.length/5 );

		this.currentNum = 0;
		this.init();

	}

	Page.prototype.init = function(){

		var _this = this;
		
		this.prev = $("<a>").addClass("ui_pages_prev js_pages_prev").attr("href","javascript:;").html("<i class='fa fa-angle-left'></i>");

		this.next = $("<a>").addClass("ui_pages_next js_pages_next").attr("href","javascript:;").html("<i class='fa fa-angle-right'></i>");

		this.more = this.len>5 ? $("<a>").addClass("ui_pages_more js_pages_more").attr("href","javascript:;").html("...") : null;

		if(this.len>1){

			this.pageBox.append(this.prev);

			for(var i=0; i<this.len; i++){

				var btn = $("<a>").addClass("ui_pages_btn js_pages_btn").attr("href","javascript:;").html(i+1).appendTo(this.pageBox);

				if(i === 0){
					btn.addClass("active")
				}

			}

			this.pageBox.append(this.next);

			if(this.len>5){
				this.more.insertBefore(this.next)
			}

		}else{

			this.pageBox.hide();

		}

		this.events();

	}

	Page.prototype.events = function(){

		var _this = this;

		// prev btn event
		this.prev.on("click", function (){

			_this.currentNum -= 5;

			if(_this.currentNum<0){
				_this.currentNum = 0;
			}

			_this.tab(Math.ceil( _this.currentNum/5 ));

		});

		// next btn event
		this.next.on("click", function (){

			_this.currentNum += 5;

			if(_this.currentNum>_this.data.length){
				_this.currentNum = _this.data.length-_this.data.length%5;
			}

			_this.tab(Math.ceil( _this.currentNum/5 ));

		})

		// common btn event
		this.pageBox.find(".js_pages_btn").each(function(i){

			$(this).on("click", function (){

				_this.pageBox.find(".js_pages_btn").removeClass('active');

				$(this).addClass("active");

				_this.currentNum = i*5;

				_this.draw();

			});

		});

		// more btn event
		this.more.on("click", function(){



		})

	}

	Page.prototype.tab = function(num){

		this.draw();

		var btnsNum = this.pageBox.find(".js_pages_btn");

		btnsNum.removeClass("active").eq(num).addClass("active");

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