function b_submitRegister() {
  console.log('reg_regDetailsEntered');

  // Save player1's details from the form into your details object
  //  ENSURE THE OBJECT NAME THE PROGRAM SAVES TO IS CORRECT;
  //    its currently details                                           //<=======
  userDetails.username     =        reg_getFormItemValue("f_register", 0);       //<=======
  userDetails.phone        = Number(reg_getFormItemValue("f_register", 1));      //<=======
  userDetails.gender = reg_getFormItemValue()


  console.table(userDetails);
  // call your function to write to details record firebase             //<=======
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
