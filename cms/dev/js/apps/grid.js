define(function(require, exports, module){

    var $ = require("jquery");

    var datatables = require("datatables")($);

    var datatables_ext = require("datatables_ext")($,datatables);

    $(document).ready(function() {
    	
        $('#dataTables-example').DataTable({
        	"processing": true,
        	"serverSide": true,
        	"ajax": {
	            "url": "../../data.php",
	            "data": function ( d ) {
	                d.myKey = "myValue";
	                // d.custom = $('#myInput').val();
	                // etc
	            }
	        }
        });
		

        
    });

});