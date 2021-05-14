const USERDETAILS = "userDetails";
const BGDETAILS = "bg_userDetails";
// flag_login
var f_login = false;
var readStatus  = ' ';
var writeStatus = ' ';

var userDetails = {
  uid:      '',
  email:    '',
  name:     '',
  photoURL: '',
  username: '',
	age: '',
  phone: '',
  gender: '',
  country:'',
  addressLine:'',
  suburb:'',
  city:'',
  postCode:''
};

var bg_userDetails = {
  highScore: '',
};

var dbArray = [];

function setup(){
	fb_initialise(); // Connect to firebase
	console.log("setup being run")
};
/**************************************************************/
// login()
// Input event; called when user clicks LOGIN button
// Logs user into firebase using Google login
// Input:
// Return:
/**************************************************************/
function b_login() {
  fb_login(userDetails);
	console.log("button not defined")
};
function b_register() {
   reg_regDetailsEntered();
	 console.log("b_register: Called");
};
function b_ballGame(){
	b_switchScreen("s_homePage", "s_gamePage");
	createGameCanvas();
};
function b_gamePageBack(){
	b_switchScreen("s_gamePage", "s_homePage");
};
function b_startBallGame(){

}