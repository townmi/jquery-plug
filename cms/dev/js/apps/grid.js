define(function(require, exports, module){

    var $ = require("jquery");

    var datatables = require("datatables")($);

    var datatables_ext = require("datatables_ext")($,datatables);

    $(document).ready(function() {
    	
        $('#dataTables-example').DataTable({
        });
		

        
    });

});