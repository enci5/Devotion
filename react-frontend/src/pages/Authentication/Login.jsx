import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import { login } from "./authServices";

const Login = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin= async(e)=>{
        e.preventDefault()
        const res = await login({name:username, password})
        if(res.success){
            alert('Success!')
            navigate('/')
        }else{
            alert('Error')
        }
    }

    return(
        <div>
            <img src="jeff.svg" alt="jeff" className={styles.jeff}/>

            <form onSubmit={handleLogin} className={styles.loginForm}>

                <label htmlFor="name">Username</label>
                <input className="nameInput" id="name" type="text" placeholder="Enter your username" value={username} 
                    onChange={e=>setUsername(e.target.value)} required/>

                <label htmlFor="password">Password</label>
                <input className="passwordInput" id="password" type="text" placeholder="Enter your password" value={password} 
                    onChange={e=>setPassword(e.target.value)} required/>

                <button type="submit">Log In</button>

                <p> 
                Don't have an account yet? <Link to="/signup">Sign up</Link>
                </p> 
            </ form>

            
        </div>
    )
}

export default Login