/**************************************************************/
// fb_io.js
// Written by Mr Gillies   2021
/**************************************************************/

/**************************************************************/
// fb_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/

function fb_initialise() {
	console.log('fb_initialise: ');
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
	console.log(firebase + " firebase");
	database = firebase.database();
}

/**************************************************************/
// fb_login(_dataRec)
// Login to Firebase
// Input:  to store user info in
// Return: n/a
/**************************************************************/
function fb_login(_dataRec) {
	console.log('fb_login: dataRec= ' + _dataRec);
	firebase.auth().onAuthStateChanged(newLogin);

	function newLogin(_user) {
		if (_user) {
			// user is signed in
			_dataRec.uid = _user.uid;
			_dataRec.email = _user.email;
			_dataRec.name = _user.displayName;
			_dataRec.photoURL = _user.photoURL;
			loginStatus = 'logged in';
			console.log('fb_login: status =' + loginStatus);
			fb_readRec(DETAILS, userDetails.uid, userDetails, fb_userDetailsProcess);
		}
		else {
			// user NOT logged in, so redirect to Google login
			_dataRec = {};
			loginStatus = 'logged out';
			console.log('fb_login: status = ' + loginStatus);

			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(provider);
		}
	}
}

/**************************************************************/
// fb_logout()
// Logout of Firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_logout() {
	console.log('fb_logout: ');
	firebase.auth().signOut();
}

/**************************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return:
/**************************************************************/
function fb_writeRec(_path, _key, _data) {
	console.log('fb_WriteRec: path= ' + _path + '  key= ' + _key +
		'  data= ' + _data.name + '/' + _data.score);
	firebase.database().ref(_path + '/' + _key).set(_data)
}

/**************************************************************/
// fb_readAll(_path, _data)
// Read all DB records for the path
// Input:  path to read from and where to save it
// Return:
/**************************************************************/
function fb_readAll(_path, _data) {
	console.log('fb_readAll: path= ' + _path);
	readStatus = "pending...";
	firebase.database().ref(_path).once("value", gotRecord, readErr);

	function gotRecord(snapshot) {
		if (snapshot.val() == null) {
			readStatus = "no record";
		} else {
			readStatus = "pass";
			var dbData = snapshot.val();
			console.log(dbData);
			var dbKeys = Object.keys(dbData);
			console.log(dbKeys)
			var key = dbKeys[0];
			console.log(dbData[key])
			for (i = 0; i < dbKeys.length; i++) {
				var key = dbKeys[i]
				_data.push({
					name: dbData[key].name,
					score: dbData[key].score
				})

			}
		}
	}
	function readErr(error) {
		readStatus = 'fail';
		console.log(error);
	}
}

/**************************************************************/
// fb_readRec(_path, _key, _data)
// Read a specific DB record
// Input:  path & key of record to read and where to save it
// Return:
/**************************************************************/
function fb_readRec(_path, _key, _data, _processData) {
	console.log('fb_readRec: path= ' + _path + '  key= ' + _key);
	readStatus = "pending..."
	firebase.database().ref(_path + '/' + _key).once("value", gotRecord, readErr);
	function gotRecord(snapshot) {
		if (snapshot.val() == null) {
			readStatus = false;
			console.log("Read Status: " + readStatus);
			fb_newUser(_key)
		} else {
			readStatus = true;
			console.log("Read Status: " + readStatus);
			var dbData = snapshot.val();
			_processData(dbData, _data);
			b_switchScreen("s_loginPage", "s_homePage")
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
function fb_newUser(_key){
	if (_key == userDetails.uid){
		console.log("New User: => Register Page");
		b_switchScreen("s_loginPage", "s_registerPage");
	}
}

/**************************************************************/
// fb_userDetailsProcess
// Saves user details from firebase into an object
// Input: _data is where the firebase data is being saved to an Object
// _userDetails is the data from the firebase
// Return:
/**************************************************************/
function fb_userDetailsProcess(_userDetails, _data) {
	_data.uid = _userDetails.uid;
	_data.name = _userDetails.name;
	_data.email = _userDetails.email;
	_data.photoURL = _userDetails.photoURL;
	_data.score = _userDetails.score;
	_data.username = _userDetails.username;
	_data.phone = _userDetails.phone;
	_data.gender = _userDetails.gender;
	_data.country = _userDetails.country;
	_data.addressLine = _userDetails.addressLine;
	_data.suburb = _userDetails.suburb;
	_data.city = _userDetails.city;
	_data.postCode = _userDetails.postCode;
}
/**************************************************************/
//    END OF MODULE
/**************************************************************/
