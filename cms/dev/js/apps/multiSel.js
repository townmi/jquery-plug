define(function(require, exports, module){
	var $ = require("jquery");
    var multiSel = require("libs/multiSelect.js")($);

    $('#multi_select').multiSel({
    	'data': [
    		{"text":"111111","value":"1","default":true},
			{"text":"222222","value":"2","default":false},
			{"text":"333333","value":"3","default":true},
			{"text":"444444","value":"4","default":false},
			{"text":"555555","value":"5","default":false},
			{"text":"666666","value":"6","default":true},
			{"text":"5555557","value":"7","default":false},
			{"text":"6666668","value":"8","default":true}
		]
	});

});