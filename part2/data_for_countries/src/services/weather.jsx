import { useState, useEffect  } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const getWeather = (url) => {
    return axios.get(url)
  }

const WeatherInfo = (props) => {
    
    const [capitalWeather, setCapitalWeather] = useState("")
    const searchIdUrl = `http://api.openweathermap.org/data/2.5/find?q=${props.country.capital}&appid=${api_key}`;
    
    
    useEffect(() => {
        getWeather(searchIdUrl)
        .then(response => {
         const capitalId = response.data.list[0].id;
         const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?id=${capitalId}&units=metric&appid=${api_key}`
         return getWeather(weatherUrl); 
        })
        .then(response => {
        setCapitalWeather(response.data);
      })
    }, [])    

    if (!capitalWeather) {
        return <div>Loading...</div>;
    }
    console.log("capitalweather", capitalWeather)
    return(
    <div>
        temperature {capitalWeather.main.temp} Celcius <br/>
        <img src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`} /> <br/>
        wind {capitalWeather.wind.speed} m/s
    </div>
    )
}



export default WeatherInfo