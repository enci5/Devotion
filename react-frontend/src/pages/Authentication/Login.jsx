import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin=(e)=>{
        e.preventDefault()
    }

    return(
        <>
            <form onSubmit={handleLogin}>
                <label htmlFor="name">Username</label>
                <input id="name" type="text" placeholder="Enter your username" value={username} 
                    onChange={e=>setUsername(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input id="password" type="text" placeholder="Enter your password" value={password} 
                    onChange={e=>setPassword(e.target.value)}/>

                <button type="submit">Log In</button>
            </ form>

            <p> 
                Don't have an account yet? <Link to="/signup">Sign up</Link>
            </p> 
        </>
    )
}

export default Login