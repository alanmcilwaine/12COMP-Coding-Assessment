
function lp_exit() {
	Window.close();
	console.log("Exit Success")
}

// function b_switchScreen(_switchFrom, _switchTo){
// 	document.getElementById(_switchFrom).style.display = "none";
// 	document.getElementById(_switchTo).style.display = "block";

// }

function b_switchScreen(_switchFrom, _switchTo){
	console.log(userDetails.name);
	document.getElementById("p_name").innerHTML = userDetails.name;
	document.getElementById("image_user").innerHTML = userDetails.photoURL;
	document.getElementById(_switchFrom).style.display = "none";
	document.getElementById(_switchTo).style.display = "block";
}
