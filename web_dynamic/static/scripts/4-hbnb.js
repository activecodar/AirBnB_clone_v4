const $ = window.$;

const fetchPlaces = () => {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
  const amenitiesDiv = document.querySelector('div.amenities');
  const popOver = amenitiesDiv.querySelector('div.popover');
  const liElements = popOver.querySelectorAll('li');
  const checkedIds = [];
  liElements.forEach(li => {
    const input = li.querySelector('input[type="checkbox"]');
    if (input.checked) {
      checkedIds.push(input.getAttribute('data-id'));
    }
  });
  $.ajax({
    url: apiUrl,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
        amenities: checkedIds
    }),
    success: function (response) {
        const placesSection = document.querySelector('section.places');
        response.forEach(place => {
          // Create the article element
          const article = document.createElement('article');

          // Create the title box
          const titleBox = document.createElement('div');
          titleBox.classList.add('title_box');
          const title = document.createElement('h2');
          title.textContent = place.name;
          const priceByNight = document.createElement('div');
          priceByNight.classList.add('price_by_night');
          priceByNight.textContent = '$' + place.price_by_night;
          titleBox.append(title, priceByNight);

          // Create the information box
          const information = document.createElement('div');
          information.classList.add('information');
          const maxGuest = document.createElement('div');
          maxGuest.classList.add('max_guest');
          maxGuest.textContent = place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '');
          const numberRooms = document.createElement('div');
          numberRooms.classList.add('number_rooms');
          numberRooms.textContent = place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '');
          const numberBathrooms = document.createElement('div');
          numberBathrooms.classList.add('number_bathrooms');
          numberBathrooms.textContent = place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '');
          information.append(maxGuest, numberRooms, numberBathrooms);

          // Create the user box
          const user = document.createElement('div');
          user.classList.add('user');
          user.innerHTML = '<b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name;

          // Create the description box
          const description = document.createElement('div');
          description.classList.add('description');
          description.innerHTML = place.description;

          // Append everything to the article element
          article.append(titleBox, information, user, description);

          // Append the article element to the DOM
          placesSection.append(article);
        });
    },
    error: function (xhr, status, error) {
      $('div#api_status').removeClass('available');
      console.error('Error:', error);
    }
  });
};
