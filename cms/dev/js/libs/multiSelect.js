/*MultiSelectDropList*/

define(function(require, exports, module){

   	return function($){

	   	$.fn.multiSel = function (options){
			
			//各种属性参数
			var defaults = {
				maxheight: "152px",
				data: [
					{"text":"111111","value":"1","default":true},
					{"text":"222222","value":"2","default":true},
					{"text":"333333","value":"3","default":true},
					{"text":"444444","value":"4","default":true},
					{"text":"555555","value":"5","default":true},
					{"text":"666666","value":"6","default":true}
				],//下拉列表中
				selectallTxt: '全选',//全选文本
				selectokTxt: '确定',//确认文本
			};

			var options = $.extend(true, defaults, options);

			var self = this;

			return this.each(function (){
			 
				//插件实现代码
				//创建 input输入框, 用来保存text
				//readonly:锁住键盘，不能向文本框输入内容  
				var $ipt = $('<input type="text" readonly value="" class="form-control" />');
				// 保存value;
				var $ipth = $('<input type="hidden" value="" />');
				$ipt.width(options.width - 8);//设定文本框宽度
				
				var $this = $(this);
				$this.width(options.width);
				$ipt.appendTo($this);
				$ipth.appendTo($this);
			    
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
				for(var i = 0; i < count; i++){

				  	var divstr = '<div class="checkbox"><label style="width:100%;">&nbsp;&nbsp;&nbsp;&nbsp;'+
				   		'<input class="multiSel_unit" type="checkbox" value="'+options.data[i].value+'"';
				   	if(options.data[i].default){
				   		divstr += 'checked />'+options.data[i].text+'</label></div>';
				   	}else{
				   		divstr += ' />'+options.data[i].text+'</label></div>';
				   	}
				   	var $list = $(divstr);
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
					var opth_arr = [];
					$dropList.each(function (){
						
						if($all.is(':checked')){
							$(this)[0].checked = 'checked';
							opt_arr.push($.trim($(this).parent().text()));
							opth_arr.push($(this).val());
						}else{
							$(this)[0].checked = '';
							opt_arr = [];
							opth_arr = [];
						}
					}); 
					  
					$ipt.val(opt_arr.join(";"));
					$ipth.val(opth_arr.join(";"));	  
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
					var opth_arr = [];
					$dropList.each(function (){
						if ($(this).is(':checked')){
							opt_arr.push($.trim($(this).parent().text()));
							opth_arr.push($(this).val());
						}
					   
					});
					var $dropList_selected = $content.children(".checkbox").children().children('input:checked');

					$ipt.val(opt_arr.join(';'));
					$ipth.val(opth_arr.join(";"));

					var o = $all[0];
					var n1 = $dropList_selected.length;
					var n2 = $dropList.length;
					
					o.checked = (n1 === n2) ? 'checked' : '';
				});

				// init insert config checkbox
				(function(){
					var opt_arr = [];
					var opth_arr = [];
					$dropList.each(function (){
						if ($(this).is(':checked')){
					   		opt_arr.push($.trim($(this).parent().text()));
					   		opth_arr.push($(this).val());
					   	}
					});

					$ipt.val(opt_arr.join(";"));
					$ipth.val(opth_arr.join(";"));

				})();

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