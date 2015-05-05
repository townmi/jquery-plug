seajs.config({

    // 配置基础路径，内部模块的依赖，不再需要全局去配置路径
    base: "../../dev/js/",

    // 系统公用模块，直接依赖
    alias: {
        "jquery": "src/jquery.min.js",
        "bootstrap": "libs/bootstrap.min.js",
        "dateTimePicker": "libs/datetimepicker.min.js",
        "datatables": "libs/dataTables.js",
        "datatables_ext": "libs/dataTables.bootstrap.js",
        "moment": "src/moment.min.js",
        "daterangepicker": "libs/daterangepicker.js"
    }

});