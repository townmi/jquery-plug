/*
var re = {
	id : /^#\w+$/g,
	class : /^\.\w+$/g,
	normal : /^\w+$/g ,
	tagname : /^<[^<>]+>$/g
}
*/

function $(vArgs) {
	
	return new tQuery(vArgs);
}

function tQuery(vArgs) {
	
	switch(typeof vArgs) {
		case 'function':

			if(window.addEventListener){
				window.addEventListener('load', vArgs, false);
			}else{
				window.attachEvent('onload',vArgs)
			}
			break;
			
		case 'string':
			
			if( (/^#\w+$/g).test(vArgs) ){
				//#getbyId
				this[0] = document.getElementById(vArgs.substring(1));
				this.length = 1;

			}else if( (/^\.\w+$/g).test(vArgs) ){
				//.
				var rg = new RegExp('(^|\\s)'+ vArgs.substring(1) +'(\\s|$)');
				var arr = document.getElementsByTagName('body')[0].getElementsByTagName('*');
				var num = 0;
				for(var i = 0; i < arr.length; i++){

					if( rg.test(arr[i].className) ){
						this[num] = arr[i];
						num++;
					}

				}
				this.length = num;

			}else if( (/^\w+$/g).test(vArgs) ){
				//tag
				
				var arr = document.getElementsByTagName('body')[0].getElementsByTagName(vArgs);
				for(var i = 0; i < arr.length; i++){
					this[i] = arr[i]
				};
				this.length = arr.length;

			}else if( (/^<[^<>]+>$/g).test(vArgs) ){
				//createElement;;
				this[0] = document.createElement(vArgs.substring(1,vArgs.length - 1));
				this.length = 1;
			}
			break;
			
		case 'object':
			this[0] = vArgs;
			this.length = 1;
			break;
	}
}

tQuery.prototype.css = function() {
	var attr = arguments[0];
	
	attr = attr.replace(/-(\w)/g, function(a, b) {
		return b.toUpperCase();
	});
	
	if (arguments.length == 1) {
		if (!this[0]) {
			return ;
		}
		if (this[0].currentStyle) {
			return this[0].currentStyle[attr];
		} else {
			return getComputedStyle(this[0], false)[attr];
		}
	} else {
		
		var value = arguments[1];
		
		for (var i=0; i<this.length; i++) {
			this[i].style[attr] = value;
		}
		
		return this;
	}
}

tQuery.prototype.has = function(arg){

	var arr = [];
	if(typeof arg === 'string'){

		if( (/^#\w+$/g).test(arg) ){
			
			var o = document.getElementById(arg.substring(1));
			for(var i = 0; i < this.length; i++){
				var el = this[i].getElementsByTagName('*');
				for(var j = 0; j < el.length; j++){
					if(el[j] == o){
						arr.push(this[i]);
					}
				}
			}

		}else if( (/^\.\w+$/g).test(arg) ){
			
			var rg = new RegExp('(^|\\s)'+ arg.substring(1) +'(\\s|$)');
			for(var i = 0; i < this.length; i++){
				var el = this[i].getElementsByTagName('*');
				for(var j = 0; j < el.length; j++){
					if( rg.test(el[j].className) ){
						arr.push(this[i]);
					}
				}
			}

		}else{

			for(var i = 0; i < this.length; i++){
				if( this[i].getElementsByTagName(arg).length ){
					arr.push( this[i] );
				}
			}
			
		}
		
		for(var i = 0; i < this.length; i++){
			if( i in arr){
				this[i] = arr[i];
			}else{
				delete this[i];
			}
		}
		this.length = arr.length;
		
	}else if(typeof arg === 'object'){

		var arr = [];
		console.log(arg)
		for(var i = 0; i < this.length; i++){
			var el = this[i].getElementsByTagName('*');
			for(var j = 0; j < el.length; j++){

				if(arg.length){
					for(var k = 0; k < arg.length; k++){
						if( el[j] === arg[k] ){
							arr.push(this[i]);
							break;
						}
					}
				}else{
					if( el[j] === arg ){
						arr.push(this[i]);
						break;
					}
				}	
			}
		}
		for(var i = 0; i < this.length; i++){
			if(i in arr){
				this[i] = arr[i];
			}else{
				delete this[i]
			}
		}
		this.length = arr.length;
	}
	return this;
}

tQuery.prototype.not = function(arg){
	var arr = [];
	if(typeof arg === 'string'){
		if( (/^#\w+$/g).test(arg) ){
			
			for(var i = 0; i < this.length; i++){
				if( this[i] != document.getElementById(arg.substring(1)) ){
					arr.push(this[i]);
				}
			}

		}else if( (/^\.\w+$/g).test(arg) ){

			var rg = new RegExp('(^|\\s)'+ arg.substring(1) +'(\\s|$)');
			for(var i = 0; i < this.length; i++){		
				if( !rg.test(this[i].className) ){
					arr.push(this[i]);	
				}	
			}
			
		}else{
			
			for(var i = 0; i < this.length; i++){
				if(this[i].tagName != arg){
					arr.push(this[i])
				}
			}
		}
		for(var i = 0; i < this.length; i++){
				if(i in arr){
					this[i] = arr[i];
				}else{
					delete this[i];
				}
			}
			this.length = arr.length;
		return this;
	}
}

tQuery.prototype.filter = function(arg){
	var arr = [];
	if(typeof arg === 'string'){
		if( (/^#\w+$/g).test(arg) ){
			
			for(var i = 0; i < this.length; i++){
				if( this[i] === document.getElementById(arg.substring(1)) ){
					arr.push(this[i]);
				}
			}

		}else if( (/^\.\w+$/g).test(arg) ){

			var rg = new RegExp('(^|\\s)'+ arg.substring(1) +'(\\s|$)');
			for(var i = 0; i < this.length; i++){		
				if( rg.test(this[i].className) ){
					arr.push(this[i]);	
				}	
			}
			
		}else{
			
			for(var i = 0; i < this.length; i++){
				if(this[i].tagName === arg){
					arr.push(this[i])
				}
			}
		}
		for(var i = 0; i < this.length; i++){
			if(i in arr){
				this[i] = arr[i];
			}else{
				delete this[i];
			}
		}
		this.length = arr.length;
		return this;
	}
}

tQuery.prototype.next = function(arg){
	var arr = [];
	if(arg){
		var arrC = [];
		var arrB = [];
		if( (/^#\w+$/g).test(arg) ){

			arrC[0] = document.getElementById(arg.substring(1));

		}else if( (/^\.\w+$/g).test(arg) ){

			var rg = new RegExp('(^|\\s)'+ arg.substring(1) +'(\\s|$)');
			var arrD = document.getElementsByTagName('body')[0].getElementsByTagName('*');
			var num = 0;
			for(var i = 0; i < arrD.length; i++){

				if( rg.test(arrD[i].className) ){
					arrC[num] = arrD[i];
					num++;
				}
			}

		}else{
			arrC = document.getElementsByTagName(arg);
		}
		
		for(var i = 0; i < this.length; i++){
			while(this[i].nextSibling){
				if(this[i].nextSibling.nodeType === 1){
					arrB.push(this[i].nextSibling);
					break;
				}
				this[i] = this[i].nextSibling;
			}
		}
		
		for(var i = 0; i <arrB.length; i++){
			for(var j = 0; j < arrC.length; j++){
				if(arrB[i] === arrC[j]){
					arr.push(arrB[i])
				}
			}
		}

	}else{
		
		for(var i = 0; i < this.length; i++){

			while(this[i].nextSibling){
				if(this[i].nextSibling.nodeType === 1){
					arr.push(this[i].nextSibling);
					break;
				}
				this[i] = this[i].nextSibling;
			}

		}
	}
	alert(arr.length)
	for(var i = 0; i < arr.length; i++){
		if(i in arr){
			this[i] = arr[i];
		}else{
			delete this[i];
		}
	}
	this.length = arr.length;
	return this;
}

tQuery.prototype.prev = function(arg){
	var arr = [];
	if(arg){
		var arrC = [];
		var arrB = [];
		if( (/^#\w+$/g).test(arg) ){

			arrC[0] = document.getElementById(arg.substring(1));

		}else if( (/^\.\w+$/g).test(arg) ){

			var rg = new RegExp('(^|\\s)'+ arg.substring(1) +'(\\s|$)');
			var arrD = document.getElementsByTagName('body')[0].getElementsByTagName('*');
			var num = 0;
			for(var i = 0; i < arrD.length; i++){

				if( rg.test(arrD[i].className) ){
					arrC[num] = arrD[i];
					num++;
				}
			}
		}else{
			arrC = document.getElementsByTagName(arg);
		}
		//alert(arrC)
		for(var i = 0; i < this.length; i++){
			while(this[i].previousSibling){
				if(this[i].previousSibling.nodeType === 1){
					arrB.push(this[i].previousSibling);
					break;
				}
				this[i] = this[i].previousSibling;
			}
		}
		for(var i = 0; i <arrB.length; i++){
			for(var j = 0; j <arrC.length; j++){
				if(arrB[i] === arrC[j]){
					arr.push(arrB[i])
				}
			}
		}
	}else{
		for(var i = 0; i < this.length; i++){

			while(this[i].previousSibling){
				if(this[i].previousSibling.nodeType === 1){
					arr.push(this[i].previousSibling);
					break;
				}
				this[i] = this[i].previousSibling;
			}
		}
	}
	//problem id/class 会出现许多文本节点。next()同理
	for(var i = 0; i < arr.length; i++){
		if(i in arr){
			this[i] = arr[i];
		}else{
			delete this[i];
		}
	}
	console.log(arr);
	this.length = arr.length;
	return this;
}

tQuery.prototype.html = function(arg){
	if(arg){
		for(var i = 0; i < this.length; i++){
			this[i].innerHTML = arg;
		}
		return this;
	}else{
		return this[0].innerHTML;
	}

}

tQuery.prototype.find = function(arg){
	var arr = [];
	if(typeof arg === 'string'){

		if( (/^#\w+$/g).test(arg) ){
			
			var o = document.getElementById(arg.substring(1));
			for(var i = 0; i < this.length; i++){
				var el = this[i].getElementsByTagName('*');
				for(var j = 0; j < el.length; j++){
					if(el[j] == o){
						arr.push(o);
					}
				}
			}

		}else if( (/^\.\w+$/g).test(arg) ){
			
			var rg = new RegExp('(^|\\s)'+ arg.substring(1) +'(\\s|$)');
			for(var i = 0; i < this.length; i++){
				var el = this[i].getElementsByTagName('*');
				for(var j = 0; j < el.length; j++){
					if( rg.test(el[j].className) ){
						arr.push(el[j]);
					}
				}
			}

		}else{

			for(var i = 0; i < this.length; i++){
				if( this[i].getElementsByTagName(arg).length ){
					for(var j = 0; j < this[i].getElementsByTagName(arg).length; j++){
						arr.push( this[i].getElementsByTagName(arg)[j] );
					}
					
				}
			}
			
		}

		if(this.length > arr.length){
			for(var i = 0; i < this.length; i++){
				if( i in arr){
					this[i] = arr[i];
				}else{
					delete this[i];
				}
			}
		}else{
			for(var i = 0; i < arr.length; i++){
				this[i] = arr[i];
			}
		}
		
		this.length = arr.length;

		return this;
	}
}

tQuery.prototype.eq = function(n){
	var arr = [];
	if(n < this.length){
		arr.push(this[n])
	}
	for(var i = 0; i < this.length; i++){
		if(i in arr){
			this[i] = arr[i]
		}else{
			delete this[i]
		}
	}

	this.length = arr.length;

	return this;

}

tQuery.prototype.index = function(arg){
	if(arg){
		if(typeof arg === 'string'){
			if( (/^#\w+$/g).test(arg) ){
				//var o = document.getElementById(arg.substring(1));
				for(var i = 0; i < this.length; i++){
					if(this[i].id === arg.substring(1)){
						return i;
					}
				}
				return -1;

			}else if( (/^\.\w+$/g).test(arg) ){
				var rg = new RegExp('(^|\\s)'+ arg.substring(1) +'(\\s|$)');
				for(var i = 0; i < this.length; i++){
					if(rg.test(this[i].className)){
						return i;
						break;
					}
				}
				return -1;
			}else{
				for(var i = 0; i <this.length; i++){
					if(this[i].tagName === arg){
						return i;
					}
				}
				return -1;
			}
		}else if(typeof arg === 'object'){

		}
	}else{
		return 0;
	}
}

tQuery.prototype.attr = function(){
	if(arguments.length == 1){
		return this[0].getAttribute(arguments[0]);

	}else{
		for( var i = 0; i < this.length; i++){
			this[i].setAttribute(arguments[0],arguments[1]);
		}
		return this;
	}
}

tQuery.prototype.each = function(fn){

	for(var i = 0; i < this.length; i++){
		fn.call(this[i],i,this[i]);
	}

}

tQuery.prototype.addClass = function(arg){

	var arr = arg.split(' ');
	for(var i = 0; i < this.length; i++){
		for( var j = 0; j < arr.length; j++){
			var rg = new RegExp('(^|\\s)'+ arr[j] +'(\\s|$)');
			if(!rg.test(this[i].className)){
				if(!this[i].className ){
					this.className = arg;
				}else{
					this[i].className += " " + arr[j];
				}
			}
		}
	}
	return this;
}

tQuery.prototype.removeClass = function(arg){

	var arr = arg.split(' ');
	for(var i = 0; i < this.length; i++){
		var arrC = this[i].className.split(' ');
		for(var j = 0; j < arrC.length; j++){
			for(var k = 0; k < arr.length; k++){
				if(arrC[j] === arr[k]){
					arrC.splice(j,1)
				}
			}
		}
		if(arrC.length){
			this[i].className = arrC.join(' ');
		}else{
			this[i].className = '';
		}
	}
	return this;	
}


tQuery.prototype.insertBefore = function(obj){
	//problem 只能添加一个，虽然for循环里面会每次都添加；
	if(obj.length === 0) return this;

	var arr = [];
	for(var i = 0; i < obj.length; i++){
		
		obj[i].parentNode.insertBefore(this[0],obj[i]);
		arr.push(this[0])
	}

	for(var i = 0; i < arr.length; i++){
		this[i] = arr[i]
	}
	this.length = arr.length;
	return this;
}

tQuery.prototype.before = function(obj){

	for(var i = 0; i < this.length; i++){

		this[i].parentNode.insertBefore(obj[0],this[i]);

	}

	return this;
}

tQuery.prototype.insertAfter = function(obj){
	if(obj.length === 0) return this;

	var arr = [];
	for(var i = 0; i < obj.length; i++){
		
		obj[i].parentNode.insertBefore(this[0],obj[i].nextSibling);
		arr.push(this[0]);
	}

	for(var i = 0; i < arr.length; i++){
		this[i] = arr[i]
	}
	this.length = arr.length;
	return this;
}

tQuery.prototype.after = function(obj){
	for(var i = 0; i < this.length; i++){

		this[i].parentNode.insertBefore(obj[0],this[i].nextSibling);

	}

	return this;
}

tQuery.prototype.appendTo = function(obj){
	if(obj.length === 0) return this;

	var arr = [];
	for(var i = 0; i < obj.length; i++){
		obj[i].appendChild(this[0]);
		arr.push(this[0]);
	}

	for(var i = 0; i < arr.length; i++){
		this[i] = arr[i]
	}
	this.length = arr.length;
	return this;
}

tQuery.prototype.append = function(obj){
	for(var i = 0; i < this.length; i++){
		this[i].appendChild(obj[0])
	}
	return this;
}

tQuery.prototype.prependTo = function(obj){
	if(obj.length === 0) return this; 
	var arr = [];
	for(var i = 0; i < obj.length; i++){
		if(obj[i].children.length){
			obj[i].insertBefore(this[0],obj[i].children[0])
		}else{
			obj[i].insertBefore(this[0])
		}
		arr.push(this[0])
	}
	for(var i = 0; i < arr.length; i++){
		this[i] = arr[i]
	}
	this.length = arr.length;
	return this;
}

tQuery.prototype.prepend = function(obj){
	for(var i = 0; i < this.length; i++){
		if(this[i].children.length){
			this[i].insertBefore(obj[0],this[i].children[0])
		}else{
			this[i].insertBefore(obj[0])
		}
	}
	return this;
}

tQuery.prototype.remove = function(){
	
	for(var i = 0; i < this.length; i++){
		this[i].parentNode.removeChild(this[i]);
		
	}
	return this;
}

tQuery.prototype.width = function(){
	return parseInt( this.css('width') );
}

tQuery.prototype.innerWidth = function(){
	return this.width() + parseInt( this.css("padding-left") ) + parseInt( this.css("padding-right") );
}

tQuery.prototype.outerWidth = function(arg){
	if(arg){
		return this.innerWidth() + parseInt( this.css("border-left") ) + parseInt( this.css("border-right") ) + 
		parseInt( this.css("margin-left") ) + parseInt( this.css("margin-right") );
	}else{
		return this.innerWidth() + parseInt( this.css("border-left") ) + parseInt( this.css("border-right") );
	}
}

tQuery.prototype.on = function(s,fn){

	for(var i = 0; i < this.length; i++){
		if(this[i].addEventListener){
			
			this[i].addEventListener( s, fn, false);
		}else{
			this[i].attachEvent('on' + s, fn)
		}
	}
}

tQuery.prototype.off = function(s,fn){
	for(var i = 0; i < this.length; i++){
		if(this[i].removeEventListener){
			if(fn && s){
				this[i].removeEventListener( s, fn, false);
			}else if(s && arguments.length === 1){
				this[i].removeEventListener(s, null, false);
			}else if(arguments.length === 0){
				this[i].removeEventListener();
			}
			
		}else{
			if(fn && s){
				this[i].detachEvent('on' + s, fn)
			}else if(s && arguments.length === 1){
				this[i].detachEvent('on' + s, null)
			}else if( arguments.length === 0){
				this[i].detachEvent();
			}
			
		}
	}
}
