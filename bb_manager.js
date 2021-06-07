//Randomized range of velocity - between these numbers
const VELRANGE = [9, 8, 7, 6, 5, -5, -6, -7, -8, -9];
//Number of balls on screen
const NUMOFBALLS = 10;

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
	// Create timer 
	bb_timer = setInterval (bb_gameTimer, 1000);
	// User clicks 'Start'
	if (bb_startFlag == false){
		//Create NUMOFBALLS amount of balls
		for (i = 0; i < NUMOFBALLS; i++) {
      ballsArray.push(new Ball(50));
		}
		button.innerHTML = "Stop";
		bb_startFlag = true;
		console.log("bb_startFlag: " + bb_startFlag)
	// User clicks 'Stop'
	}else if (bb_startFlag == true){
		bb_leave();
	}
}

/**************************************************************/
// bb_leave()
// User leaves the game 
// Input: User clicks on 'Back' or wins
/**************************************************************/
function bb_leave(){
	button.innerHTML = "Start";
	score = 0;
	hits = 0;
	miss = 0;
	bb_startFlag = false;
	//clears timer
	clearInterval(bb_timer);
	//reset time to 20 seconds
	bb_countdown = 20;
	// Removes existing balls
	for (i = ballsArray.length - 1; i >= 0; i--) {
		ballsArray.splice(i);
	}
}

function bb_gameTimer(){
	console.log("Function: bb_gameTimer");
	bb_countdown--;
	if (bb_countdown <= 0){
		bb_win;
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
	score = (hits * 10) - (miss * 10);
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
	}
	bb_leave();
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


// //var creation
// var ballArray = [];
// var radius;
// var i;
// var button;

// function setup() {
// 	createCanvas(windowWidth, windowHeight);
// 	createBall(5);
// 	frameRate(60);
// 	setInterval(removeBall, 1000);
// }

// function draw() {
// 	background(200);
// 	movementBall(2, 2);

// }


// function removeBall(){
// 	ballArray.splice(0, 1);
// 	ballArray.push(new Ball(random(0, windowWidth), random(0, windowHeight), 40))
// 	console.log("Amount of balls: " + ballArray.length);
// }

// function movementBall(ball_xVelocity, ball_yVelocity) {
// 	for (var i = 0; i < ballArray.length; i++) {
// 		ballArray[i].move(ball_xVelocity, ball_yVelocity);
// 		ballArray[i].show();
// 		ballArray[i].bounce();
// 	}

// }

// class Ball {
// 	constructor(x, y, r) {
// 		this.x = x;
// 		this.y = y;
// 		this.r = r;
// 	}
// 	move(ball_xVelocity, ball_yVelocity) {
// 		this.x = this.x + random(-1 * ball_xVelocity, ball_xVelocity);
// 		this.y = this.y + random(-1 * ball_yVelocity, ball_yVelocity);
// 	}
// 	show() {
// 		stroke(color(random(0, 255), random(0, 255), random(0, 255)));
// 		strokeWeight(4);
// 		noFill();
// 		ellipse(this.x, this.y, this.r);
// 	}
// 	bounce() {
// 		if (this.y > (height - this.r)) {
// 			this.y = height - this.r;
// 		} else if (this.y < this.r) {
// 			this.y = this.r;
// 		}
// 		if (this.x < this.r) {
// 			this.x = this.r;
// 		} else if (this.x > (width - this.r)) {
// 			this.x = width - this.r;
// 		}
// 	}
// }

// //set flag to false
// //loop these array of balls
// //if you hit a ball
// // * +1 to hits
// // * set flag to true
// //	if flag is still false
// // 		* add 1 to misses
// //
// // distancetoball = dist(this.posX, this.posY, mouseX, mouseY )
// // if (distancetoball) > this.dia/2
// // 		you missed
// //
// //
