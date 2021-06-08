/**************************************************************/
// fb_io.js
// Written by Alan McIlwaine 2021
/**************************************************************/

/**************************************************************/
// setup()
// Runs when program is opened
// Input:  Google login details
/**************************************************************/
function setup(){
	console.log("Function: setup");
	//Connect to firebase and login
	fb_initialise();  
	fb_login();
	//Create a game canvas
	gameCanvas = createCanvas(0,0);
	frameRate(60);
};

/**************************************************************/
// draw()
// Runs if there is an active game
// Input: Game flag to true to start from button
/**************************************************************/
function draw(){
	background(200,200,200);
	if (bb_startFlag == true){
		bb_draw();
	}
}

/**************************************************************/
// windowResized
// If the user resizes their window, resize the game canvas with them
// Input:  User window width and height
/**************************************************************/
function windowResized(){
	var elmnt = document.getElementById("d_gameCanvas");
	resizeCanvas(elmnt.offsetWidth, elmnt.offsetHeight);
}
/**************************************************************/
// b_bouncingBall()
// Runs when opening the bouncing ball page
// Input:  Press bouncing ball button
/**************************************************************/
function b_bouncingBall(){
	ui_switchScreen("s_homePage", "s_gamePage");
	fb_readRec(BBDETAILS, userDetails.uid, userStats, fb_userGameDetailsProcess);
};
/**************************************************************/
// b_leaderboardBack()
// Exits the leaderboard page
// Input:  Press back button on leaderboard screen
/**************************************************************/
function b_leaderboardBack(){
	ui_switchScreen("s_leaderboardPage", "s_homePage")
}
/**************************************************************/
// b_gameBack()
// Exits the game page
// Input:  Press back button on game screen
/**************************************************************/
function b_gameBack(){
	//stops the game 
	bb_reset();
	document.getElementById("b_startButton").innerHTML = "Start";
	ui_switchScreen("s_gamePage", "s_homePage");
};
/**************************************************************/
// b_leaderboardRun()
// Creates a leaderboard using records on firebase
// Input:  Press leaderboard button on home screen
/**************************************************************/
function b_leaderboardRun(){
	fb_createLeaderboard(BBDETAILS, 5);
	ui_switchScreen("s_homePage", "s_leaderboardPage");

}
/**************************************************************/
// ui_switchScreen()
// Function to switch screens
// Input:  The screen to switch from and to
// Output: Changes screens
/**************************************************************/
function ui_switchScreen(_switchFrom, _switchTo){
	//takes user details to display on home screen
	document.getElementById("h_name").innerHTML = userDetails.name;
	document.getElementById("i_userImage").src = userDetails.photoURL;
	console.log("Function: ui_switchScreen");
	console.log("Switching Screen: " + _switchFrom + " => " + _switchTo);
	//switch screens
	document.getElementById(_switchFrom).style.display = "none";
	document.getElementById(_switchTo).style.display = "block";
}
