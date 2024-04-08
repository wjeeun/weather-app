import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, selectCity, handleCityChange}) => {
    console.log(cities);
return (
    <div>
        <Button variant={selectCity===''?"outline-danger":"danger"} onClick={()=>{handleCityChange('current')}} >CurrentLocation</Button>

        {
            cities.map((item,index)=>(
                    <Button variant={selectCity===item?"outline-danger":"danger"} key={index} onClick={()=>{setCity(item)}} >{item}</Button> ))
        }

    </div>
)
}

export default WeatherButton