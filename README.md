#jquery-plugs by towne
-----------------------
## dialog

```javascript
	<script type="text/javascript" src="../src/jquery-min.js"></script>
	<script type="text/javascript" src="../plug/jquery-dialog.js"></script>
```


just need to include jquery and this dialog plug, it will works.
by the way, your labels should write like this example.


```html
	<a href="javascript:;" dialogOpen="1">for dialog1</a>
	<div class="dialog dialog1" dialogBox="1">
		<i dialogClose="true">close</i>
		<a href="javascript:;" dialogClose="true">关闭一</a>
	</div>
```


keep attribute of the dislogOpen source same as the dialogBox's; and give the close button with a dialogClose attribute.

