import React from 'react'
import axios from "axios"
import {useState, useEffect} from 'react'
import {Link} from "react-router-dom"


const Recommendation = ({ cat }) => {
  const [cars,setCars] = useState([])
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`/cars/?cat=${cat}`)
        setCars(res.data);
      }catch(err){
        console.log(err);
      };
    };
    fetchData();
  },[cat]);

  return (
    <div className='recommendation'>
      <h1>Other cars you may like</h1>
      {cars.map((car)=>(
        <div className='car_post' key ={car.id}>
          {car.img.startsWith("http") ? (<img src={car.img} alt="" />) : 
            (<img src={`../upload/${car.img}`} alt="" />
          )}
          <h2>{car.cars_info}</h2>
          <Link className = "link" to={`/car/${car.cars_id}`}>
              <button>More info.</button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Recommendation
