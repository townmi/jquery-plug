/**
 * [svg line chart]
 * @author [haixiangtang@creditease.cn]
 * @date [2015-10-15]
 * @version [0.1.3]
 * @param {[ARRAY]} [site] [array.length<=7]
 * [{"date": "10-01", "rate": "2.01"}]
 */

$.fn.intChart = function (site) {

	var BASELENGTH = 7;
	var data = site;

	var DEVICE_WIDTH = window.innerWidth;

	var SVG_WIDTH = DEVICE_WIDTH - 50;
	var SVG_HEIGHT = Math.ceil((SVG_WIDTH/2)/9)*10;
	var SVG_START_XAXIS = SVG_WIDTH/(BASELENGTH)/2;
	var SVG_XAXIS_STEP = SVG_WIDTH/(BASELENGTH);

	
	var SVG_START_YAXIS = 1;
	var SVG_YAXIS_STEP = (SVG_HEIGHT-2)/(BASELENGTH-1);

	var rateArray = [];

	for (var i = 0; i < data.length; i++) {
		rateArray.push(data[i].rate*1)
	};

	rateArray.sort();

	var start_y = Math.floor(rateArray[0]-1);
	var end_y = Math.floor(rateArray[rateArray.length-1]+1);

	var step = ((end_y-start_y)/(BASELENGTH-1)).toFixed(2);

	var xAxisHtml = '<div class="x_axis">',
		yAxisHtml = '<div class="y_axis">';

	var xLine = "", yLine = "", polyLine = '<polyline points="', circle = "", circle2 = "", rate = "", path = '<path id="glow" filter="url(#blur-filter);" fill="none" stroke-width="2" stroke-miterlimit="10" stroke="#e3363a" d="m';
	var filter = '<filter id="blur-filter" x="0" y="" width="200" height="200"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /></filter>';

	for(var i = 0; i < BASELENGTH-1; i++) {
		yAxisHtml += '<span style="top:'+Math.ceil(i*SVG_YAXIS_STEP)+'px;">'+(end_y-i*step).toFixed(2)+'</span>';
	}

	for(var i = 0; i < BASELENGTH; i++) {
		yLine += '<line i="'+i+'" x1="'+(SVG_START_XAXIS+i*SVG_XAXIS_STEP)+'" y1="'+SVG_START_YAXIS+'" x2="'+(SVG_START_XAXIS+i*SVG_XAXIS_STEP)+'" y2="'+(SVG_START_YAXIS+(BASELENGTH-1)*SVG_YAXIS_STEP)+'" style="stroke:rgb(210,210,210);stroke-width:1"/>';
		xLine += '<line i="'+i+'" x1="'+SVG_START_XAXIS+'" y1="'+(SVG_START_YAXIS+i*SVG_YAXIS_STEP)+'" x2="'+(SVG_START_XAXIS+(BASELENGTH-1)*SVG_XAXIS_STEP)+'" y2="'+(SVG_START_YAXIS+i*SVG_YAXIS_STEP)+'" style="stroke:rgb(210,210,210);stroke-width:1"/>';
	}

	for(var i = 0; i<data.length; i++) {

		xAxisHtml += '<span style="left:'+Math.ceil(i*SVG_XAXIS_STEP+SVG_START_XAXIS-16)+'px;">'+data[i].date+'</span>';
		
		if(i!=0){
			polyLine += ' ';
			path += ' L';
		}

		if(i+1>data.length) continue;
		var pointXAxis = Math.floor(SVG_START_XAXIS+i*SVG_XAXIS_STEP);
		var pointYAxis = Math.floor((end_y-(data[i].rate*1))/(end_y-start_y)*(SVG_HEIGHT-2));

		path +=pointXAxis+' '+pointYAxis;

		circle += '<circle cx="'+pointXAxis+'" cy="'+pointYAxis+'" r="5" stroke="#e3363a" stroke-width="2" fill="white"/>';

		circle2 += '<circle class="js_touch_show_rate" cx="'+pointXAxis+'" cy="'+pointYAxis+'" c_plus="'+(pointXAxis+20)+'" r="25" stroke="none" stroke-width="25" fill="rgba(255, 255, 255, 0.1)" content="'+data[i].rate+'"/>';
		
		rate = '<div class="ui_rate" id="js_rate" style="transform: translate('+(pointXAxis+20)+'px,'+pointYAxis+'px'+');-moz-transform: translate('+(pointXAxis+20)+'px,'+pointYAxis+'px'+');'+
		'-webkit-transform: translate('+(pointXAxis+20)+'px,'+pointYAxis+'px'+');-ms-transform: translate('+(pointXAxis+20)+'px,'+pointYAxis+'px'+');-o-transform: translate('+(pointXAxis+20)+'px,'+pointYAxis+'px'+');">'+data[i].rate+'<span>◆</span></div>';

	}

	xAxisHtml += '</div>';

	yAxisHtml += '<span style="top:'+Math.ceil((BASELENGTH-1)*SVG_YAXIS_STEP)+'px;">'+start_y.toFixed(2)+'</span></div>';

	path += '"/>';

	polyLine +='" style="fill:none;stroke:red;stroke-width:2"/>';

	$(this).html('<h2 class="mobile_chart_title">当日年化收益率走势图</h2>'+xAxisHtml+yAxisHtml+'<svg width="'+SVG_WIDTH+'" height="'+SVG_HEIGHT+'">'+filter+xLine+yLine+path+circle+circle2+'</svg>'+rate)

	/**
	 * [add Events]
	 * @type {[type]}
	 */
	var rateShow =$(this).find("#js_rate")[0];

	$(this).on("touchstart", ".js_touch_show_rate", function () {

		rateShow.innerHTML = this.getAttribute('content')+'<span>◆</span>';

		rateShow.style.transform = 'translate('+this.getAttribute('c_plus')+'px,'+this.getAttribute('cy')+'px)';
		rateShow.style['-moz-transform'] = 'translate('+this.getAttribute('c_plus')+'px,'+this.getAttribute('cy')+'px)';
		rateShow.style['-webkit-transform']= 'translate('+this.getAttribute('c_plus')+'px,'+this.getAttribute('cy')+'px)';
		rateShow.style['-ms-transform'] = 'translate('+this.getAttribute('c_plus')+'px,'+this.getAttribute('cy')+'px)';
		rateShow.style['-o-transform'] = 'translate('+this.getAttribute('c_plus')+'px,'+this.getAttribute('cy')+'px)';

	});

}