function setup(){
	console.log("Function: setup");
	fb_initialise(); // Connect to firebase
	gameCanvas = createCanvas(0,0);
};

function draw(){
	background(200,200,200);
	if (f_startGame == true){
		bg_draw();
	}

}

function lp_exit() {
	Window.close();
	console.log("Exit Success")
}

// function createGameCanvas(){
// 	console.log("Creating canvas size...");
// 	gameCanvas = createCanvas (0,0);
// 	var elmnt = document.getElementById("d_gameCanvas");
// 	gameCanvas.resize(elmnt.offsetWidth, elmnt.offsetHeight);
// 	gameCanvas.position(elmnt.offsetLeft, elmnt.offsetTop)
// 	gameCanvas.parent("d_gameCanvas");
// }


function b_switchScreen(_switchFrom, _switchTo){
	document.getElementById("p_name").innerHTML = userDetails.name;
	document.getElementById("image_user").src = userDetails.photoURL;
	console.log("Function: b_switchScreen");
	console.log("Switching Screen: " + _switchFrom + " => " + _switchTo);
	document.getElementById(_switchFrom).style.display = "none";
	document.getElementById(_switchTo).style.display = "block";
}
