//Number of balls on screen
var NUMOFBALLS = 10;
//Randomized range of velocity - between these numbers
var VELRANGE = [9, 8, 7, 6, 5, -5, -6, -7, -8, -9];

//variables
var bb_startFlag = false;
var gameCanvas;
var i;
var ballsArray = [];
var radius;
var hits = 0;
var miss = 0;
var score;
var highScore;
var button = document.getElementById("b_startButton");
var bb_timer;
var bb_countdown = 20;
var bb_easyMode = true;
var bb_mediumMode = false;
var bb_hardMode = false;
var bb_stopFlag = false;
/**************************************************************/
// class Ball()	
// Properties of the ball - movement, display and click
// Input: ball radius in pixels
/**************************************************************/
class Ball {
	constructor(_r){
		this.x = width / 2;
		this.y = height / 2;
		this.r = _r;
		this.velocityX = random(VELRANGE);
		this.velocityY = random(VELRANGE);
		this.colour = random(10,245), random(10,245), random(10,245);
	}
	//
	// Ball Movement - Horizontal, Verticle, Bounciness
	//
	move (){
	//Checks if the ball bounces along the y wall, move it the opposite way
		if (this.x >= width - this.r) {
			this.velocityX = this.velocityX * -1;
			this.x = width - this.r;
		} else if (this.x <= this.r){
			this.velocityX = this.velocityX * -1;
			this.x = this.r;
		}
	// Checks if the ball bounces along the y wall, move it the opposite way
		if (this.y >= height - this.r){
			this.velocityY = this.velocityY * -1;
			this.y = height - this.r;
		}else if (this.y <= this.r){
			this.velocityY = this.velocityY * -1;
			this.y = this.r;
		}
	// Horizontal ball movement
		this.x = this.x + this.velocityX;
	// Verticle ball movement
		this.y = this.y + this.velocityY;
	};
	//
	// Player Interation - Click
	//
	click (){
	// distanceToBall - tracks the distance between the mouse position and the ball
		var distanceToBall = dist(this.x, this.y, mouseX, mouseY);
	// If the mouse is inside the balls radius, return true or false
		if (distanceToBall <= this.r){
			return true;
		}else {
			return false;
		}
	};
	//
	// Ball Display Properties
	//
	show (){
		fill(this.colour);
		ellipse (this.x, this.y, (this.r * 2));
	};
}

/**************************************************************/
// bb_start()	
// Setup game canvas
// Input:  User clicks on 'Start' or 'Stop'
/**************************************************************/
function bb_start() {
	// Create Game Canvas 
	var elmnt = document.getElementById("d_gameCanvas")
	gameCanvas.resize(elmnt.offsetWidth, elmnt.offsetHeight)
	gameCanvas.parent(d_gameCanvas);
	console.log("Game canvas set");

	// Remove difficulty buttons
	document.getElementById("b_easy").style.display = "none";
	document.getElementById("b_medium").style.display = "none";
	document.getElementById("b_hard").style.display = "none"

	// Reset win/lose status
	document.getElementById("p_gameStatus").innerHTML = "";

	// User clicks 'Start'
	if (bb_stopFlag == false){
		// Resets the canvas
		bb_reset();
		bb_startFlag = true;
		//Create NUMOFBALLS amount of balls
		for (i = 0; i < NUMOFBALLS; i++) {
      ballsArray.push(new Ball(50));
		}
		bb_timer = setInterval(bb_gameTimer, 1000);
		button.innerHTML = "Stop";
		bb_stopFlag = true;
		console.log("bb_startFlag: " + bb_startFlag);
	// User clicks 'Stop'
	}else if (bb_stopFlag == true){
		document.getElementById("b_easy").style.display = "flex"; document.getElementById("b_medium").style.display = "flex"; document.getElementById("b_hard").style.display = "flex";
		console.log("bb_stopFlag: " + bb_stopFlag)
		button.innerHTML = "Start";
		score = 0;
		hits = 0;
		miss = 0;
		clearInterval(bb_timer);
		bb_startFlag = false;
		bb_stopFlag = false;
	}
}

/**************************************************************/
// bb_reset()
// User leaves the game 
// Input: User clicks on 'Back' or wins
/**************************************************************/
function bb_reset(){
	console.log("BBLeave")
	button.innerHTML = "Start";
	score = 0;
	hits = 0;
	miss = 0;
	bb_countdown = 20;
	// Removes existing balls
	bb_updateScore();
	for (i = ballsArray.length - 1; i >= 0; i--) {
		ballsArray.splice(i);
	}
}

function bb_gameTimer(){
	console.log("Function: bb_gameTimer");
	bb_countdown--;
	if (bb_countdown <= 0){
		bb_lose();
	}
}

/**************************************************************/
// bb_draw()
// Draw function for game
// Input: Called when ball game is active
/**************************************************************/
function bb_draw(){
	//Updates HTML user score
	bb_updateScore();
	//Updates background
	background(200);
	//Checks where mouse clicks are on the canvas
	gameCanvas.mousePressed(bb_ballClicked);

	//Every active ball to show and move
	for (var i = 0; i < ballsArray.length; i++) {
	ballsArray[i].move()
	ballsArray[i].show()
	}
	//If there are no balls left, win
	if (ballsArray.length == 0){
		bb_win();
		bb_startFlag = false;
	}	
}

/**************************************************************/
// bb_updateScore()
// Updates HTML of User Score
// Input:  Mouse clicks hit and miss on canvas, firebase saved highScore
function bb_updateScore(){
	bb_calculateScore();
	document.getElementById("p_bbHighScore").innerHTML = 'High Score: ' + userStats.highScore;
	document.getElementById("p_bbScore").innerHTML = "Score: " + score;
	document.getElementById("p_bbMiss").innerHTML = "Misses:" + miss;
	document.getElementById("p_bbHits").innerHTML = "Hits: " + hits;
	document.getElementById("p_bbTimer").innerHTML = "Timer: " + bb_countdown;
}

/**************************************************************/
// bb_calculateScore()
// Calculates user score
// Input:  Mouse hits and miss on canvas
// Return: User Score 
/**************************************************************/
function bb_calculateScore(){
	if (bb_easyMode == true){
		score = ((hits * 10) - (miss * 10));
	}else if (bb_mediumMode == true){
		score = ((hits * 11) - (miss * 9));
	}else if (bb_mediumMode == true){
		score = ((hits * 12) - (miss * 8));
	}
}

/**************************************************************/
// bb_win()	
// If the user clicks every ball
// Input:  If the ball object is empty
// Return: Updates firebase if score is a new highScore
/**************************************************************/
function bb_win(){
	if (score > userStats.highScore) {
		userStats.highScore = score;
		fb_writeRec(BBDETAILS, userDetails.uid, userStats);
		document.getElementById("p_gameStatus").innerHTML = "You Win. </br> New High Score!";
		bb_updateScore();
	}
	document.getElementById("p_gameStatus").innerHTML = "You Win."
	bb_reset();
}

/**************************************************************/
// bb_lose()	
// If the timer runs out
// Input:  Ball timer 
// Return: Changes game html to display 'You Lose'
/**************************************************************/
function bb_lose(){
	bb_reset();
	document.getElementById("p_gameStatus").innerHTML = "You Lose";
	// Stop timer
	clearInterval(bb_timer);
	bb_countdown = 0;
}

/**************************************************************/
// bb_ballClicked()
// Checks if the ball is clicked
// Input:  Mouse position on canvas, ball x,y on canvas and radius
// Return: Adds to hit or miss and splices the ball frmo the array
/**************************************************************/
function bb_ballClicked(){
	var hitBall = false;
	for (var i = ballsArray.length - 1; i >= 0; i--) {
		if (ballsArray[i].click()) {
			hits++
			ballsArray.splice(i,1);
			hitBall = true;
		}
	}
	if (hitBall == false){
		miss++
	}
}

function bb_easy(){
	console.log("Easy Difficulty")
	bb_easyMode = true;
	bb_mediumMode = false;
	bb_hardMode = false;

	//Randomized range of velocity - between these numbers
	VELRANGE = [7, 6, 5, -5, -6, -7,];
}
function bb_medium(){
	console.log("Medium Difficulty")
	bb_easyMode = false;
	bb_mediumMode = true;
	bb_hardMode = false;

	//Randomized range of velocity - between these numbers
	VELRANGE = [9,8,7, 6,-6, -7,];
	NUMOFBALLS = 12;
}
function bb_hard(){
	console.log("Hard Difficulty")
	bb_easyMode = false;
	bb_mediumMode = false;
	bb_hardMode = true;

	//Randomized range of velocity - between these numbers
	VELRANGE = [11,10,9,8,7, -7, -8, -9,-10,-11];
	NUMOFBALLS = 12;
}
