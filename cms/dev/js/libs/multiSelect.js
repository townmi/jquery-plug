/*MultiSelectDropList*/

define(function(require, exports, module){

   	return function($){

	   	$.fn.multiSel = function (options){
			
			//各种属性参数
			var defaults = {
				maxheight: "152px",
				data: ['1','2','3','4','5','6'],//下拉列表中的数据	
				selectallTxt: '全选',//全选文本
				selectokTxt: '确定',//确认文本
			};

			var options = $.extend(true, defaults, options);

			var self = this;

			return this.each(function (){
			 
				//插件实现代码
				//创建 input输入框
				//readonly:锁住键盘，不能向文本框输入内容  
				var $ipt = $('<input type="text" readonly value="" class="form-control" />');
				$ipt.width(options.width - 8);//设定文本框宽度
				
				var $this = $(this);
				$this.width(options.width);
				$ipt.appendTo($this);
			    
				//创建 下拉选项 
				
				//1.下拉选项包裹
				var $container = $('<div class="panel panel-default" id="content"></div>');
				$container.css({
					"position": "absolute",
					"z-index": 1,
					"width": "100%"
				});
				
				//2.创建 全选和确认按钮  top层 
				var $top = $('<div class="panel-heading clearfix" style="padding:5px 0;"></div>');
				var $allbody = $('<div class="col-lg-8 checkbox" style="margin:0"><label><input type="checkbox" class="select_all"/>'+
							options.selectallTxt+'</label></div>');
	            var $btnbody = $('<div class="col-lg-4"><a class="btn btn-success btn-xs" style="width:100%">'+options.selectokTxt+'</a></div>');
	            $allbody.appendTo($top);
	            $btnbody.appendTo($top);
				
				//3.下拉中的内容 content层
				var $content = $('<div class="form-group" style="overflow-y:scroll;margin:0;"></div>');//外层div包裹
				var count = options.data.length;
				var h = ( (count * 22) > parseInt(options.maxheight) ) ? options.maxheight : "'" + count * 22 + "'";
				$content.height(h);
				for(var i = count-1; i >= 0; i--){
				  
				   var $list = $('<div class="checkbox"><label style="width:100%;">&nbsp;&nbsp;&nbsp;&nbsp;'+
				   				'<input class="multiSel_unit" type="checkbox" value='+options.data[i]+' />'+options.data[i]+
				   				'</label></div>');
				   $list.appendTo($content);
				}
	           
				//4把top层和content层加到$container下
				$top.appendTo($container);
	            $content.appendTo($container);	

	            //把$container加到$(this)下
				$container.appendTo($this);	

				
	            //js event
				var $dropList = $content.find(".multiSel_unit");
				var $all = $allbody.find(".select_all");
				var $btn = $btnbody.find(".btn");

				$all.change(function (){//点击all
					
					var opt_arr = [];
					$dropList.each(function (){
						console.log($all[0])
						if($all.is(':checked')){
							$(this)[0].checked = 'checked';
							opt_arr.push($(this).val());
						}else{
							$(this)[0].checked = '';
							opt_arr=[];
						}
					}); 
					  
					$ipt.val(opt_arr.join(';')); 	  
				});
				
				$container.addClass('hidden');//开始隐藏
				
				$ipt.focus(function (){//文本框处于编辑
					$container.removeClass('hidden');
					$this.addClass('multi_select_focus2');
				});
				
				$btn.click(function (){//点击 ok按钮 
				    $container.addClass('hidden');
					$this.removeClass('multi_select_focus2');
				});
				
				
				$dropList.change(function (){//勾选选项
					var opt_arr = [];
					$dropList.each(function (){
					   if ($(this).is(':checked'))  opt_arr.push($(this).val());
					   
					});
					var $dropList_selected = $content.children().children('input:checked');
					$ipt.val(opt_arr.join(';'));
					var o = $all[0];
					var n1 = $dropList_selected.length;
					var n2 = $dropList.length;
					o.checked = (n1 === n2) ? 'checked' : '';
				});

				$(document).on("click", function(e){
					if(self.has(e.target).length){
						return;
					}else{
						$btn.click();
					}
				})
			});
		}
	}

});