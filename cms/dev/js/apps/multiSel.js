define(function(require, exports, module){
	var $ = require("jquery");
    var multiSel = require("libs/multiSelect.js")($);

    $('#multi_select').multiSel({
    	'data': ['待付款','已付款','认购中','认购成功','赎回中','赎回成功','交易结束']
	});

});