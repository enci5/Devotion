import axios from 'axios'

//const baseUrl = '/api/notes'

//const baseUrl = 'http://localhost:5173/api/notes'

const baseUrl = 'http://localhost:3001/api/notes'

const token = localStorage.getItem('accessToken')

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const getAll = async() => {
  try {
    const res = await axios.get(baseUrl)
    return res.data.data
  } catch (error) {
    return []
  }
  }
  
  const create = async({title, content}) => {
    try {
      const res = axios.post(baseUrl, {title, content})
      return res.data
    } catch (error) {
      return []
    }
  }
  
  const remove = (id) =>{
    console.log("id number", id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
    
  }

  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  
  export default { getAll, create, remove, update }