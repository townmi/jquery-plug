define(function (require, exports, module){

	var $ = require("jquery");

	if($.fn){

		return function($){



			$.fn.table = function(_config){
				var config = {
					ths : [];

				};

				$.each(config.ths, function (i ,e) {
					if(!e.sort){

					}else{

					}
					$("<th>", {
						"class": "js_th"
					})i
				});
			}
		}

	}else{

		function Table (){


		};

		Table.prototype.init = function(first_argument) {
			// body...
		};

		Table.prototype.event = function(first_argument) {
			// body...
		};

	}
});