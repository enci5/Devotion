import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Login.module.css'

const Login = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin=(e)=>{
        e.preventDefault()
    }

    return(
        <div className={styles.loginCard}>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <label htmlFor="name">Username</label>
                <input className="nameInput" id="name" type="text" placeholder="Enter your username" value={username} 
                    onChange={e=>setUsername(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input className="passwordInput" id="password" type="text" placeholder="Enter your password" value={password} 
                    onChange={e=>setPassword(e.target.value)}/>

                <button type="submit">Log In</button>

                <p> 
                Don't have an account yet? <Link to="/signup">Sign up</Link>
                </p> 
            </ form>

            
        </div>
    )
}

export default Login