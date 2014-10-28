
/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.22
 *
 */

jQuery.fn.arcProcess = function (){
	$(window).load(function(){
		function Process(obj){
			var this.canvas = obj;
			var this.ctx = this.canvas.getContext('2d');
			var this.W = this.canvas.width;
		}
		Process.prototype.draw = function(){
			this.ctx.clearRect(0, 0, this.W, this.W);

			this.ctx.beginPath();
			this.ctx.moveTo(this.W/2, this.W/2);
			this.ctx.arc(this.W/2, this.W/2, this.W/2, 0, Math.PI * 2, false);
			this.ctx.closePath();
			this.ctx.fillStyle = '#888d91';
			this.ctx.fill();

			if(step > process){
				step = process
				clearInterval(timer);
				onOff = false;
				
			}

			this.ctx.beginPath();
			this.ctx.moveTo(this.W/2, this.W/2);
			this.ctx.arc(this.W/2, this.W/2, this.W/2, Math.PI*1.5, Math.PI * (1.5 - step /50), true);
			this.ctx.closePath();
			this.ctx.fillStyle = color[type];
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.moveTo(this.W/2, this.W/2);
			this.ctx.arc(this.W/2, this.W/2, this.W/2-7, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.ctx.fillStyle = '#ffffff';
			this.ctx.fill();
			step++;

		}

		$(window).on('scroll', function(){

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

			var canvas = this, timer = null, step = 0, 
			var context = canvas.getContext('2d');
			// 正方形 W=H
			var W = canvas.width;

			context.clearRect( 0, 0, W, W);
			// when get this elem postion draw it ;
			console.log($(window).height()+$(window).scrollTop())
			if(( $(window).height()+$(window).scrollTop() ) > $(this).offset().top && onOff){
				timer = setInterval(draw, 10)
			}
			

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
					onOff = false;
					
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
		})
	})
	
}
$(window).arcProcess();