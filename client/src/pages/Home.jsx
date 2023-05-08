import React from 'react'
import {Link, useLocation} from "react-router-dom"
import axios from "axios"
import {useState, useEffect} from 'react'

const Home = () => {
  const [searchInputs, setSearchInputs] = useState('');
  const [showTopButton, setShowTopButton] = useState(false);
  useEffect(() => {
    const checkPosition = () => {
      if (window.pageYOffset > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', checkPosition);
    return () => window.removeEventListener('scroll', checkPosition);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleInputChange = (event) => {
    setSearchInputs(event.target.value);
  };

  const [cars,setCars] = useState([])
  const cat = useLocation().search
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`/cars/${cat}`)
        setCars(res.data);
      }catch(err){
        console.log(err);
      };
    };
    fetchData();
  },[cat]);

  const filteredCars = cars.filter((car) => {
    return car.cars_info.toLowerCase().includes(searchInputs.toLowerCase());
  });
  

const text = (html)=>{
  const doc = new DOMParser().parseFromString(html,"text/html")
  return doc.body.textContent
}
  return (
    <div className='home'>
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
        >
          Back to Top
        </button>
      )}
      <div className="cars">
        <div>
          <input type="search" value={searchInputs} placeholder='Enter car name' onChange={handleInputChange} size={145}/>
        </div>
        {filteredCars.map((car)=>(
          <div className="car" key = {car.cars_id}>
            <div className="img">
            {car.img.startsWith("http") ? (<img src={car.img} alt="" />) : 
            (<img src={`../upload/${car.img}`} alt="" />
          )}
            </div>
            <div className="content">
              <Link className = "link" to={`/car/${car.cars_id}`}>
              <h1>{car.cars_info}</h1>
              </Link>
              <p>{text(car.price)}</p>
              <Link className = "link" to={`/car/${car.cars_id}`}>
                <button>More info.</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }
  export default Home
