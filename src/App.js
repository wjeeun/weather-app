import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다
//2. 날씨정보에는 도시 ,섭씨 날씨상태
//3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때마다 도시별 날씨가 나온다
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다


function App() {
  let appid='8586a80bc35dc4607b7d2d1b5e66df85';
  const [weather, setWeather]=useState(null);
  const cities=['new york','tokyo','beijing','seoul'];
  const [city, setCity]=useState('');
  const [loading, setLoading]=useState(false);
  const [apiError, setApiError]=useState('');

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition(((position)=>{
      let lat=position.coords.latitude;
      let lon=position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    }));
  } 
  
  const getWeatherByCurrentLocation=async(lat, lon)=>{   
    try{
    let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;
    setLoading(true);
    let response=await fetch(url);
    let data=await response.json();
    // console.log('data '+JSON.stringify(data));
    // console.log('weather '+JSON.stringify(data.weather[0].description));
    setWeather(data);
    setLoading(false);
    }catch(e){
      setApiError(e.message);
      alert("에러메시지"+apiError);
      setLoading(false);
    }

  }; 

  const getWeatherByCity=async()=>{
    try{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`;
    setLoading(true);
    let response=await fetch(url);
    let data=await response.json();
    console.log('data '+JSON.stringify(data));
    // console.log('weather '+JSON.stringify(data.weather[0].description));
    setWeather(data);
    setLoading(false);
    }catch(e){
      setApiError(e.message);
      alert("에러메시지"+apiError);
      setLoading(false);
    }
  }

  const handleCityChange=(city)=>{
    if(city==='current'){
      setCity('');
    } else{
      setCity(city);
    }
  }

  useEffect(()=>{
    if(city===''){
      getCurrentLocation();    
    }else{
      getWeatherByCity();
    }
  },[city]);

  return (
    <div>
      {
        loading===true?
        <div className='container'>
        <ClipLoader
        color='#d88x6b'
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      : 
      <div className='container'>
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities} setCity={setCity} handleCityChange={handleCityChange} selectCity={city}/>      
      </div>
        }
    </div>
  );
}

export default App;

//weather api : 8586a80bc35dc4607b7d2d1b5e66df85