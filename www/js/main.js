document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  var cityList = localStorage.getItem("cityList");
  if (cityList == null){
    navigator.notification.confirm(
      'Pas de favoris. Voulez-vous être géolocalisé ?',
      onDialogConfirm,
      'Attention',
      ['Oui', 'Non']
      )
  }
}


function onDialogConfirm(){
  console.log('Vous voulez être géolocalisé')
  navigator.geolocation.getCurrentPosition(geolocationSuccess,
    geolocationError, {timeout : 5000});
  console.log('Vous voulez être géolocalisé');
}




function geolocationSuccess(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log('latitude : ' + lat + ', longitude : ' + lon);
  getWeather(lat, lon)
};

function geolocationError(error) {
  console.log(error.code + 'message: ' + error.message);
}

function getWeather(lat, lon) {

  var OpenWeatherAppKey = "eeaea8fcac8fd1222c506906b2c2c86a";
  var queryString =
    'http://api.openweathermap.org/data/2.5/weather?lat='
    + lat + '&lon=' + lon + '&appid=' + OpenWeatherAppKey + '&units=imperial';

  $.getJSON(queryString, function (data){
    if(data){
      $('#cityName').html(data.name);
      $('#weatherType').html('<img src="http://openweathermap.org/img/w/' +
        data.weather[0].icon+'.png" /><br/>'+
        data.weather[0].description);
      $('#temp').html(data.main.temp).body('refresh');
    }
  }).fail(function () {
      console.log("error getting location");
  });
}










