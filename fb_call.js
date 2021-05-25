const USERDETAILS = "userDetails";
const BGDETAILS = "userStats";
const USERROLES = "userRoles";
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


/**************************************************************/
// login()
// Input event; called when user clicks LOGIN button
// Logs user into firebase using Google login
// Input:
// Return:
/**************************************************************/
function b_login() {
  fb_login(userDetails);
};
function b_register() {
   reg_regDetailsEntered();
};
function b_ballGame(){
	b_switchScreen("s_homePage", "s_gamePage");
			fb_readRec(BGDETAILS, userDetails.uid, highScore, fb_userGameDetailsProcess);
};
function b_gamePageBack(){
	b_switchScreen("s_gamePage", "s_homePage");
};
function b_startBallGame(){
 f_ballGameStart = true; 
 bg_start();
}