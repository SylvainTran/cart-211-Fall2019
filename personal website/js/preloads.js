let miscData = [];

function goHide() {
	let x = document.getElementsByClassName("taburu");
    let i;
    for(i = 0; i < x.length; i++){
	  	if (x[i].style.display === "none") {
	  	  x[i].style.display = "table";
	  	} 
	  	else {
	  	  x[i].style.display = "none";
	  	}
  	}
}

function closeMe(){
	let x = document.getElementById('zoneAffichage');
	x.innerHTML = "";
}

function chargeImages(){
	im1 = document.getElementById('1'),
	im2 = document.getElementById('2'),
	im3 = document.getElementById('3'),
	im4 = document.getElementById('4'),
	im5 = document.getElementById('5');
	im6 = document.getElementById('bannerIcon');
	
	//im1.innerHTML += "<br><br><img src=\"images/bunny.png\" alt=\"bunny\" height=\"30px\" width=\"30px\">";	
	//im2.innerHTML += "<br><br><img src=\"images/peach.png\" alt=\"bunny\" height=\"30px\" width=\"30px\">";	 
	//im3.innerHTML += "<br><br><img src=\"images/newborn.png\" alt=\"bunny\" height=\"30px\" width=\"30px\">";	
	//im4.innerHTML += "<br><br><img src=\"images/bird.png\" alt=\"bunny\" height=\"30px\" width=\"30px\">";	
	//im5.innerHTML += "<br><br><img src=\"images/toilet-paper.png\" alt=\"bunny\" height=\"30px\" width=\"30px\">";
	//im6.innerHTML += "<img src=\"./images/avatar2.png\" alt=\"avatar\" height=\"100px\" max-width=\"100%\" style=\"float:left;\">";
}