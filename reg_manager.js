function reg_regDetailsEntered() {
  console.log('reg_regDetailsEntered');

  // Save player1's details from the form into your details object
  //  ENSURE THE OBJECT NAME THE PROGRAM SAVES TO IS CORRECT;
  //    its currently details         
  userDetails.username     =        reg_getFormItemValue("f_register", 0);
  userDetails.phone        = Number(reg_getFormItemValue("f_register",2));
	userDetails.age = Number(reg_getFormItemValue("f_register", 1))
  userDetails.gender = reg_getFormItemValue("f_register", 3);
  userDetails.country = reg_getFormItemValue("f_register", 4);
  userDetails.addressLine = reg_getFormItemValue("f_register", 5);
  userDetails.suburb = reg_getFormItemValue("f_register", 6);
  userDetails.city = reg_getFormItemValue("f_register", 7);
  userDetails.postCode = Number(reg_getFormItemValue("f_register", 8));
  console.table(userDetails);
  fb_writeRec(DETAILS, userDetails.uid, userDetails);
	console.log(userDetails.name);
  b_switchScreen("s_registerPage", "s_homePage");
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
