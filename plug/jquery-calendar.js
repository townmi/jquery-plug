'use strict';
/*
 * author : towne
 * version : 0.0.2
 * for : calendar
 * date : 2014.11.20
 *
 */

var hx_tool = {};

hx_tool.toDate = function(string,format){
	if(null == format) format="yyyy-MM-dd";
    var pattern = format.replace("yyyy", "(\\~1{4})").replace("yy", "(\\~1{2})")
        .replace("MM", "(\\~1{2})").replace("M", "(\\~1{1,2})")
        .replace("dd", "(\\~1{2})").replace("d", "(\\~1{1,2})").replace(/~1/g, "d");
    
    var returnDate;
    if (new RegExp(pattern).test(string)) {
        var yPos = format.indexOf("yyyy");
        var mPos = format.indexOf("MM");
        var dPos = format.indexOf("dd");
        if (mPos == -1) mPos = format.indexOf("M");
        if (yPos == -1) yPos = format.indexOf("yy");
        if (dPos == -1) dPos = format.indexOf("d");
        var pos = new Array(yPos + "y", mPos + "m", dPos + "d");
        var data = { y: 0, m: 0, d: 1};
        var m = string.match(pattern);
        for (var i = 1; i < m.length; i++) {
            if (i == 0) return;
            var flag = pos[i - 1].split('')[1];
            data[flag] = m[i];
            //alert(pos[i-1] + ",flag:"+flag + ",i:" + i + "," + data[flag]);
        };
        
        if (data.y.toString().length == 2) {
            data.y = parseInt("20" + data.y);
        }
        data.m = data.m - 1;
        returnDate = new Date(data.y, data.m, data.d);
    }
    if (returnDate == null || isNaN(returnDate)) returnDate = new Date();
   
    return returnDate;
}

hx_tool.dateAdd = function(date, interval, number){
	switch (interval) {
      case "y":
        return new Date(date.getFullYear() + number, date.getMonth(), date.getDate());
        break;
      case "m":
        return new Date(date.getFullYear(), date.getMonth() + number, hx_tool.checkDate(date.getFullYear(), date.getMonth() + number, date.getDate()));
        break;
      case "d":
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + number);
        break;
      case "w":
        return new Date(date.getFullYear(), date.getMonth(), 7 * number + date.getDate());
        break;
    }
}

hx_tool.format = function(date,style){
	var o = {   
        "M+" : date.getMonth() + 1, //month   
        "d+" : date.getDate(),      //day   
        "h+" : date.getHours(),     //hour   
        "m+" : date.getMinutes(),   //minute   
        "s+" : date.getSeconds(),   //second   
        "w+" : "日一二三四五六".charAt(date.getDay()),   //week   
        "q+" : Math.floor((date.getMonth() + 3) / 3),  //quarter   
        "S"  : date.getMilliseconds() //millisecond   
    }   
    if(/(y+)/.test(style)) {   
        style = style.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));   
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(style)){   
            style = style.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));   
        }
    } 
    return style;
}

hx_tool.checkDate = function(year, month, date){
	var enddate = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
    var returnDate = "";
    if (year % 4 == 0) {
        enddate[1] = "29";
    }
    if (date > enddate[month]) {
        returnDate = enddate[month];
    } else {
        returnDate = date;
    }
    return returnDate;
}

jQuery.fn.calendarOpen = function(currDate, beginDate, endDate, disableDate){
	// source
	var _this = this;

	var secret = $(this).attr("calendar");
	// target
	var box = null;

	$("*[calendarBox]").each(function(){
		if($(this).attr('calendarBox') === secret){
			// box is open Box
			box = $(this);
		}
	});

    this.X = this.offset().left - (box.outerWidth() - this.outerWidth())/2;

    this.Y = this.offset().top + this.outerHeight() + 5;

    $("*[calendarBox]").css({"display" : "none"});
    
    box.css({left:this.X, top:this.Y});

	var draw = function(date){
		var currDate = hx_tool.toDate(date,"yyyy-MM");
	    if(currDate < _this.beginDate){
	        date = _this.beginDate;
	    }

	    if(currDate > _this.endDate){
	        date = _this.endDate;
	    }
	    
	    _this.year = date.getFullYear();
	    _this.month = date.getMonth()+1;
	
	    var thisMonthFirstDate = hx_tool.dateAdd(date, "d", 1-date.getDate());
	    var lastMonthEndDate = hx_tool.dateAdd(thisMonthFirstDate, "d", -1);
	    var lastMonthDate =  thisMonthFirstDate.getDay(); // first line ||
	    var lastMonthEndDate = lastMonthEndDate.getDate();
	    var thisMonthLastDate = hx_tool.dateAdd( hx_tool.dateAdd(thisMonthFirstDate, "m", 1), "d", -1 );
	    var thisMonthEndDate = thisMonthLastDate.getDate();
	    var thisMonthEndDay = thisMonthLastDate.getDay();
	    box.find('.calendar_title span').each(function(i){
	    	i===0 ? $(this).html(_this.year) : $(this).html(_this.month)
	    })

	   	var str = "";

	   	for(var i=0;i<lastMonthDate;i++){
	   		str += "<li><a href='javascript:;' class='prev_month_date'>"+(lastMonthEndDate-lastMonthDate+1+i)+"</a></li>"
	   	}
	   
	   	for(var i=1;i<thisMonthEndDate+1;i++){

	   		var cD = hx_tool.dateAdd(thisMonthFirstDate, "d", (i-1));
	   		
	   		if(hx_tool.format(cD, "yyyy-MM-dd") === hx_tool.format(_this.date, "yyyy-MM-dd")){
	   			str += "<li><a href='javascript:;' class='this_month today' title='"+hx_tool.format(cD, "yyyy-MM-dd")+"'>"+i+"</a></li>";
	   		}else{
	   			str += "<li><a href='javascript:;' class='this_month' title='"+hx_tool.format(cD, "yyyy-MM-dd")+"'>"+i+"</a></li>";
	   		}
	   	}

	   	for(var i=1;i<7-thisMonthEndDay;i++){
	   		str += "<li><a href='javascript:;' class='next_month_date'>"+i+"</a></li>"
	   	}
	   	
		box.find('.date').html(str);
	   
    	box.css({"display" : "block"});

    	box.show(100, function(){

    		$(this).find('.date .this_month').on('click', function(){

    			if(_this.disableDate<hx_tool.toDate($(this).attr('title'),null)){

					$(_this).val($(this).attr("title"))
					
				}
    		});

    	})
	    
	}

    if(currDate){
        this.date = hx_tool.toDate(currDate,null);
    }else{
        this.date = new Date();
    }

    if(beginDate){
        this.beginDate = hx_tool.toDate(beginDate,null);
    }
    if(endDate){
        this.endDate = hx_tool.toDate(endDate,null);
    }
    if(disableDate){
    	this.disableDate = hx_tool.toDate(disableDate,null);
    }

	this.beginDate = hx_tool.toDate("1900-01-01",null);

    this.endDate = hx_tool.toDate("2020-01-01",null);

    this.disableDate = hx_tool.toDate('2014-06-01',null);

    // this.today = new Date();

	draw(this.date);

	box.find('.prev_year').on('click', function(){
		_this.date = hx_tool.dateAdd(_this.date, 'y', -1);
		draw(_this.date);
		return false;
	});
	box.find('.prev_month').on('click', function(){
		_this.date = hx_tool.dateAdd(_this.date, 'm', -1);
		draw(_this.date);
		return false;
	});
	box.find('.next_month').on('click', function(){
		_this.date = hx_tool.dateAdd(_this.date, 'm', 1);
		draw(_this.date);
		return false;
	});
	box.find('.next_year').on('click', function(){
		_this.date = hx_tool.dateAdd(_this.date, 'y', 1);
		draw(_this.date);
		return false;
	});
}


jQuery.fn.calendarClose = function(){
	$("*[calendarBox]").hide();
}