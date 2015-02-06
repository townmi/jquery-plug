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

			btnsNum.removeClass("active").eq(num).addClass("active");

		}
		
		this.prev = $("<a>").addClass("ui_pages_prev js_pages_prev").attr("href","javascript:;").html("<i class='fa fa-angle-left'></i>").on("click", function(){

			_this.currentNum--;

			if(_this.currentNum<0){
				_this.currentNum = 0;
			}

			__tab(_this.currentNum);

		});

		this.next = $("<a>").addClass("ui_pages_next js_pages_next").attr("href","javascript:;").html("<i class='fa fa-angle-right'></i>").on("click", function(){

			_this.currentNum++;

			if(_this.currentNum>_this.data.length){
				_this.currentNum = _this.data.length;
			}

			__tab(_this.currentNum);


		});

		this.more =  this.len > 5 ? $("<a>").addClass("ui_pages_more js_pages_more").attr("href","javascript:;").html("...") : null;

		if(this.len>1){

			this.pageBox.append(this.prev);

			for(var i=1; i<6; i++){

				if(i>this.len){
					break;
				}

				var a = $("<a>").addClass("ui_pages_btn js_pages_btn").attr("href","javascript:;").html(i).appendTo(this.pageBox).on('click', function(){

					_this.pageBox.find(".js_pages_btn").removeClass('active');

					$(this).addClass("active");

					_this.currentNum = ($(this).html()-1)*5 ;

					_this.draw();
					
				});


			}

			this.pageBox.append(this.next);

			if(this.len>5){

				this.more.insertBefore(this.next);

			}

		}else{

			this.pageBox.hide();

		}

	};


	Page.prototype.draw = function(){

		this.artBox.html("");

		var _this = this;

		if (this.len>1){

			for(var i = this.currentNum; i<this.currentNum+5; i++){

				if(i>this.data.length){
					break;
				}

				var render = new Render(this.artBox, this.data[i], this.url);

				render.draw();

			}

		}else{

			$.each(this.data, function (k, s){

				var render = new Render(_this.artBox, s, _this.url);

				render.draw();

			})

		}

	}

	module.exports = Page;

})