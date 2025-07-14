import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Login.module.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()

        fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    if (data.token) {
                        localStorage.setItem('token', data.token)
                        console.log("TOKEN SAVED", data.token)
                        window.location.href = 'http://localhost:5173/'
                    }
                }
                console.log("response:", data);
            })
            .catch(error => {
                console.error("login error:", error);
            })

    }

    return (
        <div className={styles.loginCard}>
            <form onSubmit={handleLogin} className={styles.loginForm}>

                <label htmlFor="name">Username</label>
                <input className="nameInput" id="name" type="text" placeholder="Enter your username" value={username}
                    onChange={e => setUsername(e.target.value)} required />

                <label htmlFor="password">Password</label>
                <input className="passwordInput" id="password" type="text" placeholder="Enter your password" value={password}
                    onChange={e => setPassword(e.target.value)} required />

                <button type="submit">Log In</button>

                <p>
                    Don't have an account yet? <Link to="/signup">Sign up</Link>
                </p>
            </ form>


        </div>
    )
}

export default Login