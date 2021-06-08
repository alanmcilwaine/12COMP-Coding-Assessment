// Text has numbers a-z lowercase and uppercase and could contain numbers
const NAMEREGEX = /^[a-zA-Z0-9]+$/;
// Text only contains numbers
const NUMREGEX = /^(1[3-9]|[2-9][0-9]|1[0-2][0-9]|130)$/
// Text doesn't have white space
const WHITESPACEREGEX = /.*\\S+.*/

function reg_regDetailsEntered() {
  console.log('Function: reg_regDetailsEntered');

  // Save player1's details from the form into your details object
  //  ENSURE THE OBJECT NAME THE PROGRAM SAVES TO IS CORRECT;
  //    its currently details
  userStats.username     =        reg_getFormItemValue("f_register", 0);
  userDetails.phone        = Number(reg_getFormItemValue("f_register",2));
	userDetails.age = Number(reg_getFormItemValue("f_register", 1))
  userDetails.gender = reg_getFormItemValue("f_register", 3);
  userDetails.country = reg_getFormItemValue("f_register", 4);
  userDetails.addressLine = reg_getFormItemValue("f_register", 5);
  userDetails.suburb = reg_getFormItemValue("f_register", 6);
  userDetails.city = reg_getFormItemValue("f_register", 7);
  userDetails.postCode = Number(reg_getFormItemValue("f_register", 8));
  console.table(userDetails);
	console.table(userStats);

	var regEx_username = reg_validate(userStats.username, NAMEREGEX);
	if(regEx_username){
		console.log("Validation: Username passed");
		document.querySelector("#i_username").setCustomValidity("");
	}else{
		document.querySelector("#i_username").setCustomValidity("Username is invalid");
		console.log(regEx_username);
	}

	var regEx_age = reg_validate(userDetails.age, NUMREGEX);
	if (regEx_age){
		console.log("Validation: Age passed");
		document.querySelector("#i_username").setCustomValidity("");
	}else {
		document.querySelector("#i_age").setCustomValidity("Age is below 13 or unreasonable");
	}
	
	var inpForm = document.getElementById("f_register");
	if (!inpForm.checkValidity()){
		console.log("Validation failed: Registration");
	}else{
		fb_writeRec(USERDETAILS, userDetails.uid, userDetails);
		fb_writeRec(BBDETAILS, userDetails.uid, userStats.username);
		console.log("Name: " + userDetails.name);
		ui_switchScreen("s_registerPage", "s_homePage");
	}
}

function reg_validate(_input, _regEx){
	if(_regEx.test(_input)){
		return true;
	}else {
		return false;

	}
}

/**************************************************************/
// reg_getFormItemValue(_elementId, _item)
// Called by reg_regDetailsEntered
// Returns the value of the form's item
// Input:  element id & form item number
// Return: form item's value
/**************************************************************/
function reg_getFormItemValue(_elementId, _item) {
  //console.log('reg_getFormItemValue: _elementId=' + _elementId +
  //	  ',  _item= ' + _item);

  return document.getElementById(_elementId).elements.item(_item).value;
}

/**************************************************************/
//    END OF PROG
/**************************************************************/
