define(function(require, exports, module){

	var $ = require("jquery");

	var moment = require("moment");

	// console.log(moment)

	var daterangepicker = require("daterangepicker")(moment, $);

	$('#reservationtime').daterangepicker({
		timePicker: true,
		timePickerIncrement: 30,
		format: 'MM/DD/YYYY h:mm A'
	}, function(start, end, label) {
		console.log(start.toISOString(), end.toISOString(), label);
	});

})