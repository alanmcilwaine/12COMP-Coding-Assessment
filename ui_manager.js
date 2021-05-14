function draw(){
	if (f_ballGameStart == true){
	}

}

function lp_exit() {
	Window.close();
	console.log("Exit Success")
}

function createGameCanvas(){
	console.log("Creating canvas size...");
	gameCanvas = createCanvas (0,0);
	var elmnt = document.getElementById("d_gameCanvas");
	gameCanvas.resize(elmnt.offsetWidth, elmnt.offsetHeight);
	gameCanvas.position(elmnt.offsetLeft, elmnt.offsetTop)
	gameCanvas.parent("d_gameCanvas");
}


function b_switchScreen(_switchFrom, _switchTo){
	console.log(userDetails.name);
	document.getElementById("p_name").innerHTML = userDetails.name;
	document.getElementById("image_user").innerHTML = userDetails.photoURL;
	document.getElementById(_switchFrom).style.display = "none";
	document.getElementById(_switchTo).style.display = "block";
}
