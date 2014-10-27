'use strict';
/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.22
 *
 */

jQuery.fn.arcProcess = function (){
	$('[process] canvas').each(function(){

		// 获取百分比
		var process = parseInt( $(this).next().html() );
		process = process>100 ? 100 : process;
		// 颜色库
		var color = {
			"ing" : "#0db2ff",
			"over" : "#fa5b48"
		}

		// 获取当前进度的UI
		var type = $(this).attr('type');

		var canvas = this, timer = null, step = 0;
		var context = canvas.getContext('2d');
		// 正方形 W=H
		var W = canvas.width;

		context.clearRect( 0, 0, W, W);

		timer = setInterval(draw, 10)

		function draw(){

			context.clearRect( 0, 0, W, W);
			context.beginPath();
			context.moveTo(W/2, W/2);
			context.arc(W/2, W/2, W/2, 0, Math.PI * 2, false);
			context.closePath();
			context.fillStyle = '#888d91';
			context.fill();

			if(step > process){
				step = process
				clearInterval(timer);
			}

			context.beginPath();
			context.moveTo(W/2, W/2);
			context.arc(W/2, W/2, W/2, Math.PI*1.5, Math.PI * (1.5 - step /50), true);
			context.closePath();
			context.fillStyle = color[type];
			context.fill();

			context.beginPath();
			context.moveTo(W/2, W/2);
			context.arc(W/2, W/2, W/2-7, 0, Math.PI * 2, true);
			context.closePath();
			context.fillStyle = '#ffffff';
			context.fill();
			step++;
		}
		draw()
    })
}
$(window).arcProcess();