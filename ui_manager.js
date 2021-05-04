
function lp_exit() {
	Window.close();
	console.log("Exit Success")
}

// function b_switchScreen(_switchFrom, _switchTo){
// 	document.getElementById(_switchFrom).style.display = "none";
// 	document.getElementById(_switchTo).style.display = "block";
	
// }

function b_switchScreen(){
	document.getElementById("s_loginPage").style.display = "none";
	document.getElementById("s_registerPage").style.display = "block";
}