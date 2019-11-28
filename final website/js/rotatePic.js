let currentAngle = 0;
/**
    Rotates the pic 90deg on mouseover.

*/
window.onmouseover = function(event){
  let currentRotation = event.target.style.transform;
	if (event.target.matches(".main__section__game--friends-picture")) {
    currentAngle += 90;
		event.target.style.transform = "rotate(" + currentAngle + "deg" + ")";
	}
}
/**
    Rotates the pic 90deg on mouseout.

*/
window.onmouseout = function(event){
  if (event.target.matches(".main__section__game--friends-picture")) {
    currentAngle += 90;
		event.target.style.transform = "rotate(" + currentAngle + "deg" + ")";
  }
}
/**
    Plays sound clip when clicking friend's pic.

*/
window.onclick = function(event){
  if (event.target.matches(".main__section__game--friends-picture")) {
    let callingDiv = document.querySelector('.main__section__game--friends-calling');
    callingDiv.classList.add('friendsCalling');
    callingDiv.innerHTML = "Calling..." + "<br>" + document.querySelector('.main__section__game--friends-picture').childNodes[0].alt;
    let audioDiv = document.getElementById('friendHello');
    audioDiv.play();
  }
}
