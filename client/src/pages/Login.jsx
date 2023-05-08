import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { AuthContext } from '../api_context/authentication'
const Login = () => {
  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  })
  const [err,setError] = useState(null)
  const nav = useNavigate()
  const {login} = useContext(AuthContext)
  const change = e =>{
    setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
  }
  const submit = async (e) => {
    e.preventDefault()
    try{
      await login(inputs)
    nav("/")
    }catch(err){
      setError(err.response.data)
    }
  }
  return (
    <div className="authentication">
      <h1>Login</h1>
      <form>
        <input type = "text" placeholder='username' name ="username" onChange = {change}/>
        <input type = "password" placeholder='password' name ="password" onChange = {change}/>
        <button onClick ={submit}>Login</button>
        {err&&<p>{err}</p>}
        <span>Click here to create an account! <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login