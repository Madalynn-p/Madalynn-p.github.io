
const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=36.1628&longitude=-85.5016&daily=temperature_2m_max,weather_code,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,rain_sum&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";
/*
  https://Madalynn-p.github.io/v1/forecast?latitude=36.1628&longitude=-85.5016&daily=temperature_2m_max,weather_code,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,rain_sum&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch
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
            const current = data.current

            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
            //to round the temp to be whole numbers because what temp is not

            document.querySelector('txtTemp').innerHTML = Math.round(data.current.temperature_2m, apparent_temprature) 
            document.querySelector('txtHumity').innerHTML = data.current.relatice_humidity_2m
            // By looking at the data it seems that weather_code lets you know what the weather conditions are 
            // logic assumes that 0=sunny/cleary skys,
            //  1= Mainly clear, 2=Partly cloudy, 3= overcast
            // 61= rain slightly , 62= rain moderate and 63= rain heavy instensity
            let weatherCode = data.current.weather_code

            if(weatherCode ===0 ){
                document.querySelector('#txtxCondition').className = 'bi bi-brightness-high-fill txt-waring'
                document.querySelector('#txtWeatherCondition').alt ='Sunny Skys'

            }else if (weatherCode <= 3) {
                   document.querySelector('#txtCondition').className = 'bi bi-cloud-fill txt-secondary-emphasis'
                 document.querySelector('txtWeatherCondition').alt = 'Cloudy Skys'
            }else if(weatherCode == 61 <= 63 ){
                 document.querySelector('#txtCondtion').className = 'bi bi-cloud-drizzle-fill txt-primary-emphasis'
                 document.querySelector('txtWeatherConditon').alt = 'Rainny Skys'

            }
     })
     .catch(error =>{
        console.error("Error getting the weather", error)
     })

}
getWeatherData()
