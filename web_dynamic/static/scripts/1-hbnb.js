"use strict";
// This function will be executed when DOM is loaded
$(document).ready(function () {
  // Define an empty object to store the checked amenities
  const amenityDict = {};

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    // Get the Amenity ID and name of the current checkbox
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    // If the checkbox is checked, add the Amenity ID to the object
    if ($(this).is(':checked')) {
      amenityDict[amenityId] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the object
      delete amenityDict[amenityId];
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    const amenityList = Object.values(amenityDict);
    if (amenityList.length > 0) {
      $('div.amenities > h4').text(amenityList.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

});
