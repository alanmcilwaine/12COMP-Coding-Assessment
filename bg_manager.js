const VELRANGE = [9, 8, 7, 6, 5, -5, -6, -7, -8, -9];
var f_ballGameStart = false;
var f_startGame = false;
var gameCanvas;

class Ball {
	constructor(_x, _y, _r){
		this.x = _x;
		this.y = _y;
		this.r = _r;
		this.velocityX = random(VELRANGE);
		this.velocityY = random(VELRANGE);
	}
	// Checks if the ball bounces along the x wall, move it the opposite way 
	move (){
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
	};
	// Checks if the player clicks the ball
	click (_x, _y){
		var distanceToBall = dist(_x, _y, this.x, this.y);

		if (distanceToBall <= this.r){
			return true;
		}else {
			return false;
		}
	};
	show (){
		fill(this.colour);
		ellipse (this.x, this.y, (this.r * 2));
	};
}

function bg_start() {
	var elmnt = document.getElementById("d_gameCanvas")
	gameCanvas.resize(elmnt.offsetWidth, elmnt.offsetHeight)
	gameCanvas.parent(d_gameCanvas);

	console.log("Game canvas set")

	var button = document.getElementById("b_startButton")
	if (f_ballGameStart == true) {
		button.innerHTML = "Stop";

		f_startGame = true;
	}
}
function createBall(ball_amount) {
	for (i = 0; i < ball_amount; i++) {
		ballArray[i] = new Ball(random(0, windowWidth), random(0, windowHeight), 40)
		console.log("Amount of balls :" + ballArray.length);
	}
}
    bb_interval = setInterval(bb_timer, 200)
    for (i = 0; i < NUMOFBALLS; i++) {
      ballsArray.push(new b_ball(VELRANDOM, BB_MIND, BB_MAXD))
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

function createBall(ball_amount) {
	for (i = 0; i < ball_amount; i++) {
		ballArray[i] = new Ball(random(0, windowWidth), random(0, windowHeight), 40)
		console.log("Amount of balls :" + ballArray.length);
	}
}

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
