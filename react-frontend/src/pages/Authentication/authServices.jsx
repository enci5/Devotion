import axios from 'axios'

export const signup = async({name,password})=>{
    try {
        const res = await axios.post('http://localhost:3001/api/auth/signup', {
            name,
            password
        })

        const data = res.data
        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const login = async({name,password})=>{
    try {
        const res = await axios.post('http://localhost:3001/api/auth/login', {
        name,
        password
        })

        const data = res.data
        if(data.token){
            localStorage.setItem('accessToken', data.token)
        }
        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            message: 'Login up failed'
        }
    }
}