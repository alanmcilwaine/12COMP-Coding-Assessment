function setup(){
	console.log("Function: setup");
	fb_initialise(); // Connect to firebase
	fb_login();
	gameCanvas = createCanvas(0,0);
};

function draw(){
	background(200,200,200);
	if (bbStartFlag == true){
		console.log("BB Starting");
		bg_draw();
	}
}

function b_bouncingBall(){
	ui_switchScreen("s_homePage", "s_gamePage");
			fb_readRec(BGDETAILS, userDetails.uid, highScore, fb_userGameDetailsProcess);
};

function b_gameBack(){
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
