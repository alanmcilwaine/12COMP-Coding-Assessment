// Text has numbers a-z lowercase and uppercase and could contain numbers
const NAMEREGEX = /^[a-zA-Z0-9]+$/;
// Text only contains numbers
const NUMREGEX = /^(1[3-9]|[2-9][0-9]|1[0-2][0-9]|130)$/;
// Text doesn't have white space
const WHITESPACEREGEX = /^[^\s]+(\s+[^\s]+)*$/
// Text is letters and spaces
const COUNTRYREGEX = /^[a-zA-Z\s]*$/;
// Text is a valid addressLine
const ADDRESSREGEX = /^\s*\S+(?:\s+\S+){2}/;
// Post code regex
const POSTCODEREGEX = /^\d{4,9}$/;

function reg_regDetailsEntered() {
  console.log('Function: reg_regDetailsEntered');

  // Save player1's details from the form into your details object
	// USERSTATS
  userStats.username     =        reg_getFormItemValue("f_register", 0);
	// USERDETAILS
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

	//validates the username through regex
	var regEx_username = reg_validate(userStats.username, NAMEREGEX);
	if(regEx_username){
		console.log("Validation: Username passed");
		document.querySelector("#i_username").setCustomValidity("");
	}else{
		//custom error message if regex failed
		document.querySelector("#i_username").setCustomValidity("Username is invalid");
	}
	var regEx_postCode = reg_validate(userDetails.postCode, POSTCODEREGEX);
	if(regEx_postCode){
		console.log("Validation: Post Code passed");
		document.querySelector("#i_postCode").setCustomValidity("");
	}else{
		//custom error message if regex failed
		document.querySelector("#i_postCode").setCustomValidity("Post Code is invalid");
	}
	var regEx_suburb = reg_validate(userDetails.suburb, COUNTRYREGEX);
	if (regEx_suburb){
			console.log("Validation: Suburb passed");
			document.querySelector("#i_suburb").setCustomValidity("");
	}else{
		//custom error message if regex failed
		document.querySelector("#i_suburb").setCustomValidity("Suburb is invalid");
	}

	var regEx_city = reg_validate(userDetails.city, COUNTRYREGEX);
	if (regEx_city){
			console.log("Validation: Suburb passed");
			document.querySelector("#i_city").setCustomValidity("");
	}else{
		//custom error message if regex failed
		document.querySelector("#i_city").setCustomValidity("City is invalid");
	}

	//validates the age through regex
	var regEx_age = reg_validate(userDetails.age, NUMREGEX);
	if (regEx_age){
		console.log("Validation: Age passed");
		document.querySelector("#i_username").setCustomValidity("");
	}else {
		//custom error if regex failed
		console.log("Validation: Age failed")
	}

	var regEx_country = reg_validate(userDetails.country, COUNTRYREGEX);
	if(regEx_country){
		console.log("Validation: Country Passed");
		document.querySelector("#i_country").setCustomValidity("");
	}else{
		document.querySelector("#i_country").setCustomValidity("Country is invalid");
	}

	var regEx_address = reg_validate(userDetails.addressLine, ADDRESSREGEX);
	if(regEx_address){
		console.log("Validation: Address Passed");
		document.querySelector("#i_address").setCustomValidity("");
	}else{
		document.querySelector("#i_address").setCustomValidity("Address is invalid");
	}

	//validates registration form
	var inpForm = document.getElementById("f_register");
	if (!inpForm.checkValidity()){
		console.log("Validation failed: Registration");
	}else{
	//writes details to firebase if form is filled in
		fb_writeRec(USERDETAILS, userDetails.uid, userDetails);
		fb_writeRec(BBDETAILS, userDetails.uid, userStats);
		console.log("Name: " + userDetails.name);
		ui_switchScreen("s_registerPage", "s_homePage");
	}
}

function reg_validate(_input, _regEx){
	if(_regEx.test(WHITESPACEREGEX)){
		return false
	}else if (_regEx.test(_input)){
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
