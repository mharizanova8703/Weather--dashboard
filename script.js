$(document).ready(function () {
  var ApiKey = '8d4ddaa41dd589137d8ef5584615807d'

  $('#search-button').on('click', function (event) {
    event.preventDefault()
    let userSearch = $('#search-input').val()

    getCurrentWeather(userSearch)
  })

  function getCurrentWeather(userSearch) {
    console.log('userSearch inside getCurrentWeather function', userSearch)

    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${ApiKey}&units=imperial`
    console.log('query URL', queryUrl)

    fetch(queryUrl)
      .then((response) => response.json())
      .then(function (data) {
        console.log('data from api call', data)

        let cityName = $('<div>').addClass('card-title').text(data.name)
        let temp = $('<div>')
          .addClass('card-text')
          .text('Temperature: ' + data.main.temp + 'F')
        let humidity = $('<div>')
          .addClass('card-text')
          .text('Humidity: ' + data.main.humidity + '%')
        let wind = $('<div>')
          .addClass('card-text')
          .text('Wind: ' + data.wind.speed + 'MPH')

        $('#currentWeather').append(cityName, temp, humidity, wind)

        let coords = {
          lon: data.coord.lon,
          lat: data.coord.lat,
        }
        getUvIndex(coords)
        getCurrentForecast(data.name)
      })
  }

  function getUvIndex(coords) {
    console.log(ApiKey)
    let queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${ApiKey}`
    fetch(queryUrl)
      .then((response) => response.json())
      .then(function (data) {
        console.log('UV INDEX DATA', data)

        let UVIndex = data.current.uvi
        let UVIndexElement = $('<button>')
          .addClass('card-text btn btn-sm')
          .text('UV Index: ' + UVIndex)

        if (UVIndex < 3) {
          UVIndexElement.addClass('btn-success')
        } else if (UVIndex < 7) {
          UVIndexElement.addClass('btn-warning')
        } else {
          UVIndexElement.addClass('btn-danger')
        }

        $('#currentWeather').append(UVIndexElement)
      })
  }

  var cityArray = []
  //creating a function when buuton is click

  function showSavedData() {
    var cityArray = JSON.parse(localStorage.getItem('citylist'))
    for (var i = 0; i < cityArray.lenght; i++) {
      console.log('cityArray', cityArray)
      var a = $('<button>').attr({
        class: 'list-group-item list-group-item-action',
        id: cityArray[i],
      })
      $('#buttons-view').append(a)
      $('#' + cityArray[i]).on('click', function (event) {
        event.preventDefault()
        var cityName = this.id
      })
    }
  }

  //let userSearch = $('#search-input').val()

  function getCurrentForecast(name) {
    console.log(name)
    let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${ApiKey}&units=imperial`
    console.log('query URL', queryUrl)
    fetch(queryUrl)
      .then((response) => response.json())
      .then(function (data) {
        console.log('data from api call', data)

        // fetch(queryUrl).then((response) => response.json())
        //.then(function (data) {
        //console.log('data from api call', data)
        // }
        //fetch(queryUrl)
        //.then((response) => response.json())
        //.then(function (data) {
        //console.log('data from api call', data)
        // })
      })
  }
})
