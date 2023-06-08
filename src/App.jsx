import { useState, useEffect } from 'react'
import axios from 'axios'

const minTemp = 10;
const maxTemp = 34;

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

function getRGB(data) {
  const t = data ? Math.round(data.main.temp - 273.15) : 0;
  let v = (t < minTemp ? minTemp : (t > maxTemp ? maxTemp : t)) * 255 / (maxTemp - minTemp);

  // min: 0, 127.5, 255
  // max: 255, 0, 100
  const r = 0 + v;
  const g = 127.5 - (v / 2);
  const b = 255 - (v * 155 / 255);
  return [r, g, b];
}

function App() {
  const [data, setData] = useState()
  const [city, setCity] = useState()
  const [country, setCountry] = useState()

  useEffect(() => {
    if (city != undefined) {
      axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15168dd2b03aa52748b3eface2ca436f`)
        .then(i => setData(i.data));
    }
  }, [city])

  useEffect(() => {
    if (data != undefined) { setCountry(regionNames.of(data.sys.country)) }
  }, [data])

  function formHandler(e) {
    e.preventDefault()
    setCity(e.target.city.value)
    e.target.city.value = ""
  }

  console.log({ data });

  const [r, g, b] = getRGB(data);

  return (
    <>
      <div className='mainDiv' style={{
        backgroundImage: `linear-gradient(45deg,rgb(255, 255, 255),rgb(${r}, ${g}, ${b}))`
      }}>
        <form className='mainForm' action="" onSubmit={formHandler}>
          <input className='mainInput' placeholder='Enter your city' type="text" name="city" id="city" />
          <button><ion-icon name="search-outline"></ion-icon></button>
        </form>

        {data && <>
          <div className='cityCountry'>
            <h1 className='cityName'>{data.name}</h1>
            <h3 className='country'><ion-icon name="earth-outline"></ion-icon>{country}</h3>
          </div>
          <h1 className='temp'>{Math.round(data.main.temp - 273.15)}°C</h1>
          <h3 className='feelsLike'>Feels Like {Math.round(data.main.feels_like - 273.15)}°C</h3>
          <img height="200px" width="200px" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />

          <div className='humidityWind'>
        <div><ion-icon name="water-outline"></ion-icon> Humidity: {data.main.humidity}%</div>
        <div><ion-icon name="leaf-outline"></ion-icon> Wind Speed: {data.wind.speed} Km/h</div>
      </div>
        </>}

        
      </div>
      
    </>
  )
}

export default App
