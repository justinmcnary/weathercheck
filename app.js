console.log('SUPERMAN!!!');
let state = {};
let lat = '';
let long = '';

const checkLoc = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    checkWeather();
  });
};

const checkWeather = () => {
  $.get(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`, function(data) {
    console.log(data);
    state.name = data.name;
    state.tempC = Math.round(data.main.temp);
    state.tempF = Math.round(data.main.temp * (9 / 5) + 32);
    state.humidity = data.main.humidity;
    state.minTempC = data.main.temp_min;
    state.minTempF = Math.round(data.main.temp_min * (9 / 5) + 32);
    state.maxTempC = data.main.temp_max;
    state.maxTempF = Math.round(data.main.temp_max * (9 / 5) + 32);
    state.description = data.weather[0].description;
    state.icon = data.weather[0].icon;
    console.log(state);
    updateDom();
    background();
  });
};

const updateDom = () => {
  $('#location').html(`${state.name}`);
  $('#description').html(`${state.description.toUpperCase()}`);
  $('#current').html(`${state.tempF}&deg`);
  $('#temp').html(`Low: ${state.minTempF}&deg High: ${state.maxTempF}&deg`);
  $('#celsius').html(`<a class="btn btn-default btn-md" id="temp-button" href="#" role="button">F&deg / C&deg</a>`);
  if (state.icon === undefined) {
    $('#icon').html(
      `<img src="https://4.bp.blogspot.com/-xjLbvdPaPBo/WJn4xvGuOmI/AAAAAAAAT9M/v8yMC3d7rnYcQQWIdQiizVMehoZmgY99ACLcB/s1600/tearful-emoji.png">`
    );
  } else {
    $('#icon').html(`<img src=${state.icon}>`);
  }
};

//background image
const background = () => {
  if (state.description === 'thunderstorm') {
    $('body').css({
      'background-image':
        'url(https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=)'
    });
  } else if (state.description === 'moderate rain') {
    $('body').css({
      'background-image':
        'url(https://images.unsplash.com/photo-1417008914239-59b898b49382?dpr=1&auto=format&fit=crop&w=1500&h=983&q=80&cs=tinysrgb&crop=)'
    });
  } else if (state.description === 'scattered clouds') {
    $('body').css({
      'background-image':
        'url(https://images.unsplash.com/photo-1487732051747-883a9d609c1e?dpr=1&auto=format&fit=crop&w=1500&h=994&q=80&cs=tinysrgb&crop=)'
    });
  } else if (state.description === 'overcast clouds') {
    $('body').css({
      'background-image':
        'url(https://images.unsplash.com/photo-1415199899804-121c5b2c2132?dpr=1&auto=format&fit=crop&w=1199&h=794&q=80&cs=tinysrgb&crop=)'
    });
  }
};

//clickHandlers
$('#weather-check').on('click', function() {
  checkLoc();
});

let hasBeenClicked = false;
$('#celsius').on('click', '#temp-button', function() {
  if (hasBeenClicked === false) {
    $('#current').html(`${state.tempC}&deg`);
    $('#temp').html(`Low: ${state.minTempC}&deg High: ${state.maxTempC}&deg`);
    hasBeenClicked = true;
  } else if (hasBeenClicked === true) {
    $('#current').html(`${state.tempF}&deg`);
    $('#temp').html(`Low: ${state.minTempF}&deg High: ${state.maxTempF}&deg`);
    hasBeenClicked = false;
  }
});

checkLoc();
