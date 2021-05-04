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
			if (loginStatus = 'logged in') {
				b_switchScreen();
			}
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
		var dbData = snapshot.val();
		if (dbData == null) {
			readStatus = false;
		} else {
			readStatus = true;
		}
		_processData(readStatus, dbData);
	}

	function readErr(error) {
		readStatus = 'fail';
		console.log(error);
	}
}

function userDataProcess() {
	_data.uid = dbData.uid;
	_data.name = dbData.name;
	_data.email = dbData.email;
	_data.photoURL = dbData.photoURL;
	_data.score = dbData.score;

}

/**************************************************************/
//    END OF MODULE
/**************************************************************/