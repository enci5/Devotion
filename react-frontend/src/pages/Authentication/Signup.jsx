import { useState, useEffect } from "react";
import axios from 'axios'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmpassword] = useState('')


    const handleSignup = (e) => {
        e.preventDefault()


        fetch("http://localhost:3001/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Signup success:", data);
            })
            .catch(error => {
                console.error("Signup error:", error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <label htmlFor="email">Email</label>
                <input id="email" placeholder="Enter Email" value={email}
                    onChange={e => setEmail(e.target.value)} required />

                <label htmlFor="name">Username</label>
                <input id="name" type="text" placeholder="Enter Username" value={username}
                    onChange={e => setUsername(e.target.value)} required />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" value={password}
                    onChange={e => setPassword(e.target.value)} required />

                <label htmlFor="passwordConfirm">Confirm password</label>
                <input id="passwordConfirm" type="password" placeholder="Enter Password again" value={confirmPassword}
                    onChange={e => setConfirmpassword(e.target.value)} required />

                <button type="submit">Sign up</button>
            </ form>
        </div>
    )
}

export default Signup