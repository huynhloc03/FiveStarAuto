import React, { useContext, useEffect, useState } from 'react';
import Recommendation from '../components/Recommendation';
import { useParams } from "react-router-dom";
import axios from "axios";
import { cartContext } from '../api_context/cartContext.js';
import { AuthContext } from '../api_context/authentication.js'; 

const Car = () => {
  const [car, setCar] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const { id: carID } = useParams();
  const { addToCart } = useContext(cartContext);
  const { currentUser } = useContext(AuthContext); 
  
  const text = (html)=>{
    const doc = new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  };

  const handleAddToCart = () => {
    addToCart(car);
    setAddedToCart(true);
  };

  useEffect(() => {
    setAddedToCart(false); // Reset addedToCart when car ID changes
    const fetchData = async () => {
      try {
        const res = await axios.get(`/cars/${carID}`);
        setCar(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [carID]);

  return (
    <div className="oneCar">
      <div className="content">
        {car.img && car.img.startsWith("http") ? (
          <img src={car.img} alt="" />) : (<img src={`../upload/${car.img}`} alt="" />
        )}
        <h1>{car.cars_info}</h1>
        <h3 className="overview">Overview</h3>
        <p>{text(car.cars_description)}</p>
        {currentUser && currentUser.role === 'customer' && (
          <>
            <button onClick={handleAddToCart}>Order now.</button>
            {addedToCart && <p className = "success">Successfully added to cart!</p>}
          </>
        )}
      </div>
      <Recommendation cat ={car.cat}/>
    </div>
  );
};

export default Car;
