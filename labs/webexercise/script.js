var buttontop = 0;
var buttonleft = 0;

var thebutton = document.querySelector('.firstbox');

document.onkeydown = function(event){
	switch (event.keyCode) {
		case 37:
			buttonleft = buttonleft-4;
		break;
		case 39:
			buttonleft = buttonleft+4;
		break;
	}
	thebutton.style.left = buttonleft + 'px';
}

window.onclick = function(event){
	console.log("click");
	if (!(event.target.matches(".menudropdown") || event.target.matches(".menubutton"))) {
		console.log("clicked outside menu");
		var themenudropdowns = document.querySelector('.menudropdown');
		themenudropdowns.style.display = "none";
	}
}

function dropdown(){
	document.querySelector('.menudropdown').style.display = "block";
}

function frame() {
	buttontop = buttontop+1;
	thebutton.style.top = buttontop + 'px';
	
	if (buttontop >= 500) {
		clearInterval(clock);
	}
}

var clock = setInterval(frame, 10);