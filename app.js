

const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,rain,snowfall,showers,precipitation,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,showers,snowfall,rain,weather_code&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";
/*
https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&daily=temperature_2m_max,weather_code,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,rain_sum&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch
https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,rain,snowfall,showers,precipitation,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,showers,snowfall,rain,weather_code&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch
*/

function getWeatherData(){
    fetch(weatherUrl)
        .then(response=>{
            if(!response.ok){
                throw new Error('Bad HTTP Response')
            }
            return response.json()

        })
        .then(data => {
            console.log(data)
            const current = data.current // this is the current section of the api
            const daily = data.daily   //This is in the daily section of the api

            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
            //to round the temp to be whole numbers because what temp is not

            document.querySelector('#txtTemp').innerHTML = Math.round(current.temperature_2m) 
            document.querySelector('#txtApparentTemp').innerHTML = Math.round(current.apparent_temperature)
            document.querySelector('#txtTempHigh').innerHTML = Math.round(daily.temperature_2m_max [0]) // this is in an array and I needed to pick a spot
            document.querySelector('#txtTempLow').innerHTML = Math.round(daily.temperature_2m_min [0])// I am going to assume the 0 is the current days H and L
            document.querySelector('#txtHumity').innerHTML = current.relative_humidity_2m
           // Weather Code Logic
            let strweatherCode = current.weather_code;
            let strTemperature = current.temperature_2m
            let strIconWeather = document.querySelector('#txtconditionIcon')
            let strTextWeather = document.querySelector('#txtWeatherConditions')
            let strIconTemp = document.querySelector('#txtTempIcon')
           
         //Temperture icon
            if(strTemperature >= 0 && strTemperature <=31  ){
                strIconTemp.className = 'bi bi-thermometer text-primary-emphasis'
            }else if(strTemperature >=32 && strTemperature <= 60) {
               strIconTemp.className = 'bi bi-thermometer-low text-primary'
            }else if(strTemperature >=61 && strTemperature <=80){
                strIconTemp.className = 'bi bi-thermometer-half text-warning'
            }else {
                strIconTemp.className = 'bi bi-thermometer-high text-danger'
            }
            // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
            //Weather code icons 
            if (strweatherCode === 0) {
                strIconWeather.className = 'bi bi-brightness-high-fill text-warning'
                strTextWeather.innerHTML = 'Clear Skies'
            } 
            else if (strweatherCode >= 1 && strweatherCode <= 3) {
                strIconWeather.className = 'bi bi-cloud-sun-fill text-secondary'
                strTextWeather.innerHTML = 'Partly Cloudy'
            } 
            else if (strweatherCode >= 45 && strweatherCode <= 48) {
                strIconWeather.className = 'bi bi-cloud-fog2-fill text-light'
                strTextWeather.innerHTML = 'Foggy'
            }
            else if (strweatherCode >= 51 && strweatherCode <= 67) {
                strIconWeather.className = 'bi bi-cloud-rain-heavy-fill text-info'
                strTextWeather.innerHTML = 'Rainy'
            } 
            else if (strweatherCode >= 71 && strweatherCode <= 77) {
                strIconWeather.className = 'bi bi-snow2 text-white'
                strTextWeather.innerHTML = 'Snowing'
            }
            else {
                strIconWeather.className = 'bi bi-cloud-fill text-primary'
                strTextWeather.innerHTML = 'Cloudy'
            }

        })
        .catch(error => {
            console.error("Error getting the weather:", error)
            document.querySelector('#txtWeatherConditions').innerHTML = "Error loading data"
        })
}

getWeatherData();
