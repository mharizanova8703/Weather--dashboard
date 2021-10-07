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
        document.querySelector('#temp1').innerHTML = data.list[0].main.temp
        document.querySelector('#humidity1').innerHTML =
          data.list[0].main.humidity

        document.querySelector('#temp2').innerHTML = data.list[1].main.temp
        document.querySelector('#humidity2').innerHTML =
          data.list[1].main.humidity
        document.querySelector('#temp3').innerHTML = data.list[2].main.temp
        document.querySelector('#humidity3').innerHTML =
          data.list[2].main.humidity



          
        for (let i = 0; i < data.list.length; i++) {
          $('#temp1' + i + 1).text(data.list[i].main.temp)
          $('#humidity1' + i + 1).text(data.list[i].main.humidity)
          $('#wind1' + i + 1).text(data.list[i].main.wind)
          $('#temp2' + i + 1).text(data.list[i].main.temp)
          // same for humidity and wind
        }
        // fetch(queryUrl).then((response) => response.json())
        //.then(function (data) {
        //console.log('data from api call', data.wind)
        // }
        //fetch(queryUrl)
        //.then((response) => response.json())
        //.then(function (data) {
        //console.log('data from api call', data)
        // })
      })
  }
  let now = new Date()
  let time = document.querySelector('time')
  let date = now.getDate()
  let year = now.getFullYear()
  let hours = now.getHours()
  let todayMinute = now.getMinutes()
  if (todayMinute < 10) {
    todayMinute = `0${todayMinute}`
  }

  let p = document.querySelector('p')

  p.innerHTML = `${hours}:${todayMinute}`

  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let day = days[now.getDay()]

  let months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let month = months[now.getMonth()]
  weekday.innerHTML = `Today is ${day}, ${month} ${date}, ${year}`
})
