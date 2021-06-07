function setup(){
	console.log("Function: setup");
	fb_initialise(); // Connect to firebase
	fb_login();
	gameCanvas = createCanvas(0,0);
	frameRate(5);
};

function draw(){
	background(200,200,200);
	if (bb_startFlag == true){
		bb_draw();
	}
}

function windowResized(){
	var elmnt = document.getElementById("d_gameCanvas");
	resizeCanvas(elmnt.offsetWidth, elmnt.offsetHeight);
}

function b_bouncingBall(){
	ui_switchScreen("s_homePage", "s_gamePage");
			fb_readRec(BBDETAILS, userDetails.uid, userStats, fb_userGameDetailsProcess);
};

function b_gameBack(){
	bb_leave();
	document.getElementById("b_startButton").innerHTML = "Start";
	ui_switchScreen("s_gamePage", "s_homePage");
};

function ui_switchScreen(_switchFrom, _switchTo){
	document.getElementById("h_name").innerHTML = userDetails.name;
	document.getElementById("i_userImage").src = userDetails.photoURL;
	console.log("Function: ui_switchScreen");
	console.log("Switching Screen: " + _switchFrom + " => " + _switchTo);
	document.getElementById(_switchFrom).style.display = "none";
	document.getElementById(_switchTo).style.display = "block";
}
