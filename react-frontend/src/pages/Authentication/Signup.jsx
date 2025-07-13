import { useState, useEffect } from "react";
import { signup } from "./authServices";
import styles from './Signup.module.css'
import { Link } from "react-router-dom";

const Signup = () =>{
    //const[email,setEmail]=useState('')
    const[username, setUsername]=useState('')
    const[password, setPassword]=useState('')
    const[confirmPassword, setConfirmpassword]=useState('')

    const handleSignup = async(e) =>{
        e.preventDefault()
        const res = await signup({name:username, password:password})
        if (res.success){
            alert('success')
        }else{
            alert(`Error: ${res.message}`)
        }
    }

    return(
        <div>
            <form onSubmit={handleSignup} className={styles.signupForm}>

                <img src="jeff.svg" alt="jeff" className={styles.jeff}/>
                {/*
                <label htmlFor="email">Email</label>
                <input id="email" placeholder="Enter Email" value={email} 
                onChange={e=>setEmail(e.target.value)} required/>*/}

                <label htmlFor="name">Username</label>
                <input id="name" type="text" placeholder="Enter Username" value={username}
                onChange={e=>setUsername(e.target.value)} required/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" value={password}
                onChange={e=>setPassword(e.target.value)} required/>

                <label htmlFor="passwordConfirm">Confirm password</label>
                <input id="passwordConfirm" type="password" placeholder="Enter Password again" value={confirmPassword}
                onChange={e=>setConfirmpassword(e.target.value)} required/>

                <button type="submit">Sign up</button>

                <p2>Have an account? <Link to='/Login'>Log in</Link></p2>
            </ form>
        </div>
    )
}

export default Signup