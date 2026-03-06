

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
            let weatherCode = current.weather_code;
            let Temperature = current.temperature_2m
            let iconElement = document.querySelector('#txtconditionIcon')
            let textElement = document.querySelector('#txtWeatherConditions')
            let iconTemp = document.querySelector('#txtTempIcon')
           
         //Temperture icon
            if(Temperature >= 0 && Temperature <=31  ){
                iconTemp.className = 'bi bi-thermometer text-primary-emphasis'
            }else if(Temperature >=32 && Temperature <= 60) {
                iconTemp.className = 'bi bi-thermometer-low text-primary'
            }else if(Temperature >=61 && Temperature <=80){
                iconTemp.className = 'bi bi-thermometer-half text-warning'
            }else {
                iconTemp.className = 'bi bi-thermometer-high text-danger'
            }
            // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
            //Weather code icons 
            if (weatherCode === 0) {
                iconElement.className = 'bi bi-brightness-high-fill text-warning'
                textElement.innerHTML = 'Clear Skies'
            } 
            else if (weatherCode >= 1 && weatherCode <= 3) {
                iconElement.className = 'bi bi-cloud-sun-fill text-secondary'
                textElement.innerHTML = 'Partly Cloudy'
            } 
            else if (weatherCode >= 45 && weatherCode <= 48) {
                iconElement.className = 'bi bi-cloud-fog2-fill text-light'
                textElement.innerHTML = 'Foggy'
            }
            else if (weatherCode >= 51 && weatherCode <= 67) {
                iconElement.className = 'bi bi-cloud-rain-heavy-fill text-info'
                textElement.innerHTML = 'Rainy'
            } 
            else if (weatherCode >= 71 && weatherCode <= 77) {
                iconElement.className = 'bi bi-snow2 text-white'
                textElement.innerHTML = 'Snowing'
            }
            else {
                iconElement.className = 'bi bi-cloud-fill text-primary'
                textElement.innerHTML = 'Cloudy'
            }

        })
        .catch(error => {
            console.error("Error getting the weather:", error)
            document.querySelector('#txtWeatherConditions').innerHTML = "Error loading data"
        })
}

getWeatherData();
