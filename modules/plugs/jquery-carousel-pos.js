'use strict';
/*
 * author : towne
 * version : 0.0.1
 * date : 2014.10.23
 *
 */
jQuery.fn.carouselPos = function (){
	// 图片转换
	bestImg();
	$('*[carouselPos]').each(function(){
		// 获取基础数据
		var len = $(this).find('li').length;
		var iW = $(this).find('li').outerWidth();
		var _this = this;
		var current = 1, timer = null, time = $(this).attr('carouselPos');
		// 初始化设置ul li 等;
		$(this).find('ul').css({'width' : (len+2)*iW, "left" : -iW});
		$(this).find('ul li').css({'width' : iW});
		$(this).find('ul li').eq(len-1).clone().prependTo( $(this).find('ul').append($(this).find('ul li').eq(0).clone()) );

		timer = setInterval(autoRun,time)

		// 鼠标移入、移出，关、开定时器
		$(this).hover(function(){
			clearInterval(timer);
			$(this).find('.prev').stop().show(250);
			$(this).find('.next').stop().show(250);
		}, function(){
			timer = setInterval(autoRun, time);
			$(this).find('.prev').stop().hide();
			$(this).find('.next').stop().hide();
		});

		// 左右切换事件
		$(this).find('.prev').on($(this).find('.prev').attr('event'), function(){
			current--;
			if(current<0){
				current = 0;
			}
			init();
		});
		$(this).find('.next').on($(this).find('.next').attr('event'), function(){
			current++;
			if(current>len+1){
				current = len+1
			}
			init();
		});

		// 序列号联动
		$(this).find('[outlook] span').on($(this).find('[outlook]').attr('event'), function(){
			current = $(this).index()+1;
			init();
		})

		function init(){
			$(_this).find('[outlook] span').removeClass('active');
			$(_this).find('[outlook] span').eq((current-1) % len).addClass('active');

			$(_this).find('ul').stop().animate({"left" : -current*iW},1000, function (){
				// 切换点
				if(current > len){
					$(_this).find('ul').css({'left': -iW});
					current = 1;
				}else if(current < 1){
					$(_this).find('ul').css({'left': -len*iW});
					current = len;
				}
			})
		};
		function autoRun(){
			current++;
			init();
		};
	})
	
	// 处理图片的失真---background-image
	function bestImg(){
		$('*[carouselPos] li a').each(function(){
			var src = "url("+ $(this).children()[0].src +")";
			$(this).css({'background-image' : src})
		})
	}
}
$(window).carouselPos();