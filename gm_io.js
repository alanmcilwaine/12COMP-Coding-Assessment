// // Google Maps IO

// var searchInput = 'i_address'

// $(document).ready(function () {
//     var autocomplete;
//     autocomplete = new google.maps.places.Autocomplete((document.getElementById(i_address)), {
//         types: ['geocode'],
//     });


// function initAutocomplete(){
// 	autocomplete = new google.maps.places.Autocomplete(
// 		document.getElementById('i_address'),
// 		{
// 			types: ['establishment'],
// 			componentRestrictions: {'country' : ['NZ']},
// 			fields: ['place_id', 'geometry', 'name']
// 		});

// 		autocomplete.addListener('place_changed', onPlaceChanged);
// }

// function onPlaceChanged(){
// 	var i_address = autocompelte.getPlace();

// 	if (!i_address.geometry){
// 		// User did not select a prediction; reset the input field
// 		document.getElementById('i_address').placeholder = 'Enter a place';
// 	} else {
// 		//Display details about the valid place_changed
// 		document.
// 	}

// }