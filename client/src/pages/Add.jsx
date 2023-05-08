import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const Add =()=> {
  const [value, setValue] = useState('');
  const [info, setInfo] = useState('');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState('');
  const [imgLink, setImgLink] = useState('');  
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const upload = async ()=>{
    try{
      const dataForm = new FormData();
      dataForm.append("file", file)
      const res = await axios.post("/upload", dataForm)
      return res.data
    }catch(err){
      console.log(err)
    }
  }
  const click = async e=>{
    e.preventDefault()
    let img = '';
    if (file) {
      img = await upload();
    } else if (imgLink) {
      img = imgLink;
    }
    try{
      await axios.post('/cars/',{
        cars_info: info,
        cars_description: value,
        cat: cat,
        img: img,
        price: price,
      })
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className = "addCar">
      <div className="content">
        <input type="text" placeholder="Car Info" onChange={e=>setInfo(e.target.value)} />
        <input type="text" placeholder="Price: $" onChange={e => setPrice(e.target.value)} />
        <div className="editContainer">
        <ReactQuill className = "edit" theme="snow" value={value} onChange={setValue} />
      </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Appending:</h1>
          <input style={{display:"none"}} type="file" id="file" name=""  onChange={e=>setFile(e.target.files[0])}/>
          <label className="file" htmlFor="file"> {file ? file.name : "Upload image"}</label>
          <input type="text" placeholder="Image URL" value={imgLink} onChange={e => setImgLink(e.target.value)} />
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick ={click}>Append Car</button>
          </div>
        </div>
        <div className="item">
          <h1>Type of cars:</h1>
          <div className="cat">
          <input type="radio" name="cat" value="Sedan" id="Sedan"  onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Sedan">Sedan</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" value="SUVs" id="SUVs"  onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="SUVs">SUVs</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" value="Truck" id="Truck"  onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Truck">Truck</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" value="Luxury" id="Luxury" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Luxury">Luxury</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" value="Electric" id="Electric" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Electric">Electric</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" value="Hybrids" id="Hybrids" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Hybrids">Hybrids</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" value="Sport" id="Sport" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="Sport">Sport cars</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add