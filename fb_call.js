const DETAILS = "userDetails";

var loginStatus = ' ';
var readStatus  = ' ';
var writeStatus = ' ';

var userDetails = {
  uid:      '',
  email:    '',
  name:     '',
  photoURL: '',
  username: '',
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

}
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
}
