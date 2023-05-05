const $ = window.$;

$(document).ready(function () {
  const apiUrl = 'http://0.0.0.0:5001/api/v1/status/';

  $.ajax({
    url: apiUrl,
    type: 'GET',
    success: function (response) {
      console.log(response);
      if (response.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    },
    error: function (xhr, status, error) {
      $('div#api_status').removeClass('available');
      console.error('Error:', error);
    }
  });
});
