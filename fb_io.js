/**************************************************************/
// fb_io.js
// Written by Mr Gillies   2021
// Adapted by Alan McIlwaine 2021 to fit my program
/**************************************************************/
const USERDETAILS = "userDetails";
const BBDETAILS = "userStats";
const USERROLES = "userRoles";
// flag_login
var loginFlag = false;
var readStatus  = ' ';
var writeStatus = ' ';

var userDetails = {
  uid:      '',
  email:    '',
  name:     '',
  photoURL: '',
	age: '',
  phone: '',
  gender: '',
  country:'',
  addressLine:'',
  suburb:'',
  city:'',
  postCode:''
};

var userStats = {
  highScore: '',
	username: '',
};

var dbArray = [];


/**************************************************************/
// fb_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/

function fb_initialise() {
	console.log("Function: fb_initialise");
	var firebaseConfig = {
		apiKey: "AIzaSyDzg8NP8BwOahVbAOL_PGwnpBWO6w7vHsE",
		authDomain: "comp12-2021-alan-mcilwaine.firebaseapp.com",
		projectId: "comp12-2021-alan-mcilwaine",
		storageBucket: "comp12-2021-alan-mcilwaine.appspot.com",
		messagingSenderId: "118291210896",
		appId: "1:118291210896:web:7b565dcb6c7a2551fc6e15",
		measurementId: "G-JNT1JY92E6"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	database = firebase.database();
	console.table("Firebase Connected");
}

/**************************************************************/
// fb_login(_dataRec)
// Login to Firebase
// Input:  to store user info in
// Return: n/a
/**************************************************************/
function fb_login() {
	console.log("Function: fb_login");
	var userInfo = firebase.auth().currentUser;
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
		console.log("Function: newLogin");
		console.log("User has signed in");
		// user is signed in
		userDetails.uid = user.uid;
		userDetails.email = user.email;
		userDetails.name = user.displayName;
		userDetails.photoURL = user.photoURL;
		loginFlag = true;
		fb_readRec(USERROLES, userDetails.uid, '', fb_checkAdmin);
		fb_readRec(USERDETAILS, userDetails.uid, userDetails, fb_userDetailsProcess);
		fb_readRec(BBDETAILS, userDetails.uid, userStats, fb_userGameDetailsProcess);
  } else {
    // No user is signed in.
		console.log("Function: newLogin");
		console.log("User has NOT signed in. Redirecting...");
		// user NOT logged in, so redirect to Google login
		_dataRec = {};
		loginFlag = false;
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
  }
	});
}

function fb_checkAdmin(_result, _dbData){
	console.log("Function: fb_checkAdmin");
	var dbData = _dbData.val();
	if (_result == "Record found"){
		console.log("userRole Record Found...")
		if (dbData == 'admin'){
			console.log(userDetails.name + " is an admin");
			document.getElementById('b_admin').style.display = "block";
		}
	}else{
			console.log(userDetails.name + " is not an admin");
			document.getElementById('b_admin').style.display = "none";
	}
}


/**************************************************************/
// fb_logout()	
// Logout of Firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_logout() {
	console.log("Function fb_logout");
	firebase.auth().signOut();
}

/**************************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return:
/**************************************************************/
function fb_writeRec(_path, _key, _data) {
	console.log("Function fb_writeRec");
	firebase.database().ref(_path + '/' + _key).set(_data, writeErr);
	//write record error
	function writeErr(error) {
		if (error) {
			writeStatus = false;
			console.log("Write error: " + error);
		}
	}
}

/**************************************************************/
// fb_readAll(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/**************************************************************/
function fb_readAll(_path, _data, _processData) {
	console.log("Function: fb_readAll");
	console.log("Reading All:" + _path);
	readStatus = "pending...";
	firebase.database().ref(_path).once("value", gotRecord, readErr);

	function gotRecord(snapshot) {
		if (snapshot.val() == null) {
			readStatus = "no record";
		} else {
			readStatus = "pass";
			var dbData = snapshot;
			_processData(readStatus,snapshot, _data);
		}
	}

	function readErr(error) {
		if (error) {
			readStatus = "fail";
			console.log("Read Error: " + error)
		}
	}
}



/**************************************************************/
// fb_readRec(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// Return:
/**************************************************************/
function fb_readRec(_path, _key, _data, _processData) {
	console.log("Function: fb_readRec");
	console.log("Reading Record: " + _path + ' /  ' + _key)
	readStatus = "pending..."
	firebase.database().ref(_path + '/' + _key).once("value", gotRecord, readErr);
	function gotRecord(snapshot) {
		if (snapshot.val() == null) {
			readStatus = "No record";
			console.log("Read Status: " + readStatus);
			_processData(readStatus, snapshot, _data);
		} else {
			readStatus = "Record found";
			console.log("Read Status: " + readStatus);
			// var dbData = snapshot.val();
			_processData(readStatus, snapshot, _data);
		}
	}

	function readErr(error) {
		readStatus = false;
		console.log(error);
	}
}

/**************************************************************/
// fb_newUser
// Checks if readRec was specifically caused because user is new
// If true, it will send them to registration page
// Input: Record _key and if it's null for a uid
// Return:
/**************************************************************/
function fb_newUser(_key) {
	ui_switchScreen("s_loginPage", "s_registerPage")
}

/**************************************************************/
// fb_userDetailsProcess
// Saves user details from firebase into an object
// Input: _data is where the firebase data is being saved to an Object
// _userDetails is the data from the firebase
// Return:
/**************************************************************/
function fb_userDetailsProcess(_result,_userDetails, _data) {
	var dbData = _userDetails.val();
	if (_result == "No record"){
		fb_newUser()
	}else {
	_data.uid = dbData.uid;
	_data.name = dbData.name;
	_data.email = dbData.email;
	_data.photoURL = dbData.photoURL;
	_data.phone = dbData.phone;
	_data.gender = dbData.gender;
	_data.country = dbData.country;
	_data.addressLine = dbData.addressLine;
	_data.suburb = dbData.suburb;
	_data.city = dbData.city;
	_data.postCode = dbData.postCode;
	console.log(dbData)
	//Change this switch screen when editing future parts of the website
	ui_switchScreen("s_loginPage", "s_homePage")
	}
}

/**************************************************************/
// fb_userGameDetailsProcess()
// Saves game data from record to an object
// Input: Read status, record, object
// Return: Saves record to object userStats
/**************************************************************/
function fb_userGameDetailsProcess(_result, snapshot, _data) {
	var dbData = snapshot.val();
	//Run if user has no game records
	if (_result == "No record"){
	//If they don't have a record, their highScore is set to 0
		userStats.highScore = Number(0); 
	}else{
	//Run if user has a game record. Save it to object userStats
	_data.highScore = dbData.highScore;
	_data.username = dbData.username;
	console.table(userStats);
	}

}

/**************************************************************/
// fb_createLeaderboard()
// Reads userStats from database. Sorts highScore numerically and changes the html
// Input:  userStats path in firebase, list number on leaderboard
// Return: Changes HTML on leaderboard using recorded high score/username
/**************************************************************/
function fb_createLeaderboard(_path, _num){
	//orders high scores
	ref = firebase.database().ref(_path).orderByChild("highScore").limitToLast(_num);
	ref.once("value", gotData, readErr);
	function gotData(snapshot) {
		//if there is no record
		if (snapshot.val() == null) {
			console.log("No record");
		}else{
		//if there is a highscore change html, acts like a for loop that will change 
		//each list 
			snapshot.forEach(function (childSnapshot){
		//user id
				var childKey = childSnapshot.key;
		//userStats object from firebase
				var childData = childSnapshot.val();
		//setting it to a variable. otherwise result will be 'undefined'
				var ld_highScore = childData.highScore;
				var ld_username = childData.username;
		//changes html on leaderboard
				document.getElementById("ld_leader" + _num).innerHTML = ld_username + " | High Score | " + ld_highScore;
				_num--;
				console.log(childData)
			});
		}
	}
	//console logs if there is a read/write error
	function readErr(error) {
	readStatus = false;
	console.log(error);
	}
}

/**************************************************************/
//    END OF MODULE
/**************************************************************/
