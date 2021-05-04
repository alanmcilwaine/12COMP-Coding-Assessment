//var creation
var ballArray = [];
var radius;
var i;
var button;

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

function removeBall(){
	ballArray.splice(0, 1);
	ballArray.push(new Ball(random(0, windowWidth), random(0, windowHeight), 40))
	console.log("Amount of balls: " + ballArray.length);
}

function movementBall(ball_xVelocity, ball_yVelocity) {
	for (var i = 0; i < ballArray.length; i++) {
		ballArray[i].move(ball_xVelocity, ball_yVelocity);
		ballArray[i].show();
		ballArray[i].bounce();
	}

}

class Ball {
	constructor(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}
	move(ball_xVelocity, ball_yVelocity) {
		this.x = this.x + random(-1 * ball_xVelocity, ball_xVelocity);
		this.y = this.y + random(-1 * ball_yVelocity, ball_yVelocity);
	}
	show() {
		stroke(color(random(0, 255), random(0, 255), random(0, 255)));
		strokeWeight(4);
		noFill();
		ellipse(this.x, this.y, this.r);
	}
	bounce() {
		if (this.y > (height - this.r)) {
			this.y = height - this.r;
		} else if (this.y < this.r) {
			this.y = this.r;
		}
		if (this.x < this.r) {
			this.x = this.r;
		} else if (this.x > (width - this.r)) {
			this.x = width - this.r;
		}
	}
}

//set flag to false
//loop these array of balls
//if you hit a ball 
// * +1 to hits
// * set flag to true
//	if flag is still false 
// 		* add 1 to misses
// 
// distancetoball = dist(this.posX, this.posY, mouseX, mouseY ) 
// if (distancetoball) > this.dia/2
// 		you missed
// 
// 
