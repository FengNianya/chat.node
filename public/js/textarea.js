
'use strict';

var textarea = document.querySelector('textarea');
function resize() {
	textarea.style.height = '0';
	var height = textarea.scrollHeight;
	textarea.style.height = height + 'px';
}
textarea.addEventListener('input', resize);

document.onkeydown = function(e){
	if((e.keyCode || e.which) == 13){
		e.returnValue = false;
		if(textarea.value == ''){
			return false;
		}else{
			var username = document.getElementById('admin').innerHTML;
			var msg = textarea.value;
			socket.emit('chat', {
				username: username,
				msg: msg
			});
			textarea.value = '';
			resize();
		}
	}
}
