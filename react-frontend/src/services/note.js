import axios from 'axios'

//const baseUrl = '/api/notes'

//const baseUrl = 'http://localhost:5173/api/notes'

const baseUrl = 'http://localhost:3001/api/notes'

const getAll = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(baseUrl, config)
    .then(response => {
      return {
        success: true,
        data: response.data
      }
    })
    .catch(error => {
      return {
        success: false,
        data: error.response ? error.response.data : error.message
      }
    })
}

const create = async (newObject, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    return {
      success: false,
      data: error.response ? error.response.data : error.message
    }
  }
}

const remove = (id) => {
  console.log("id number", id)
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)

}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll, create, remove, update }