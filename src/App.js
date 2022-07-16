import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [condition, setCondition] = useState("Few clouds");
  let [temp, setTemp] = useState("Temperature");
  let [city, setCity] = useState("Wakanda");
  let [img, setImg] = useState("https://openweathermap.org/img/wn/02d@2x.png");
  let [citySearch, setCitySearch] = useState("");
  const APIKey = "";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getWeatherGeo, errorOccurred);
    }
  }, []);

  function getWeatherGeo(position) {
    const { longitude, latitude } = position.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${APIKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const { name, weather, main } = data;
        const temStr = `Temp: ${main.temp}℃ Min: ${main.temp_min}℃ Max: ${main.temp_max}℃`;
        setCity(name);
        setCondition(
          weather[0].description[0].toUpperCase() +
            weather[0].description.substring(1)
        );
        setTemp(temStr);
        setImg(`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`);
      });
  }

  function getWeatherCity(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APIKey}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const { name, weather, main } = data;
        const temStr = `Temp: ${main.temp}℃ Min: ${main.temp_min}℃ Max: ${main.temp_max}℃`;
        setCity(name);
        setCitySearch(name)
        setCondition(
          weather[0].description[0].toUpperCase() +
            weather[0].description.substring(1)
        );
        setTemp(temStr);
        setImg(`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`);
      });
  }

  function errorOccurred(err) {
    alert("An error occurred in getting location");
  }

  function search(event) {
    if(event.key === 'Enter') {
      getWeatherCity(citySearch);
    }
  }

  return (
    <div className="App">
      <input type="text" placeholder="Enter City" className="Searchbar" value={citySearch} onChange={(event) => setCitySearch(event.target.value)} onKeyUp={search}/>
      <div className="Card">
        <h1>{city}</h1>
        <img src={img} alt={condition} />
        <h2>{condition}</h2>
        <h3>{temp}</h3>
      </div>
    </div>
  );
}

export default App;
