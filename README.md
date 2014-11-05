#jquery-plugs by towne
-----------------------

just need to include jquery and this dialog plug, it will works.
by the way, your labels should write like this example.

## dialog

#### javascript
```javascript
	<script type="text/javascript" src="../src/jquery-min.js"></script>
	<script type="text/javascript" src="../plug/jquery-dialog.js"></script>
```
#### html
```html
	<a href="javascript:;" dialogOpen="1">for dialog1</a>
	<div class="mask" dialogMask="true"></div>
	<div class="dialog dialog1" dialogBox="1">
		<i dialogClose="true">close</i>
		<a href="javascript:;" dialogClose="true">关闭一</a>
	</div>
	<a href="javascript:;" dialogOpen="2">for dialog2</a>
	<div class="mask" dialogMask="true"></div>
	<div class="dialog dialog1" dialogBox="2">
		<i dialogClose="true">close</i>
		<a href="javascript:;" dialogClose="true">关闭一</a>
	</div>
```

##carousel-fade

#### javascript
```javascript
	<script type="text/javascript" src="../src/jquery-min.js"></script>
	<script type="text/javascript" src="../plug/jquery-carousel-fade.js"></script>
```
#### html
```html
	<div class="carousel" carouselFade="5000">
		<ul>
			<li class='active'>
				<a href="http://www.jd.com/" target="_blank">
					<img src="1.jpg" alt="1">
				</a>
			</li>
			<li>
				<a href="http://www.baidu.com/" target="_blank">
					<img src="2.jpg" alt="2">
				</a>
			</li>
			<li>
				<a href="http://www.126.com/" target="_blank">
					<img src="3.jpg" alt="3">
				</a>
			</li>
			<li>
				<a href="http://www.taobao.com/" target="_blank">
					<img src="4.jpg" alt="4">
				</a>
			</li>
			<li>
				<a href="http://www.qq.com/" target="_blank">
					<img src="5.jpg" alt="5">
				</a>
			</li>
		</ul>
		<div class="car_btn" event="click" outlook>
			<span class='active'>1</span>
			<span>2</span>
			<span>3</span>
			<span>4</span>
			<span>5</span>
		</div>
		<a href="javascript:;" class="prev" event="click"><</a>
		<a href="javascript:;" class="next" event="click">></a>
	</div>
```

##arc-process

#### javascript
```javascript
	<script type="text/javascript" src="../src/jquery-min.js"></script>
	<script type="text/javascript" src="../plug/jquery-arc-process.js"></script>
```
#### html
```html
	<div class="process" process="true">
		<canvas width="106" height="106" type="ing"></canvas>
		<span>100%</span>
	</div>
```