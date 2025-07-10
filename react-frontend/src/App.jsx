import { Routes, Route } from 'react-router-dom'
import CreateNote from './pages/CreateNote'
import Login from './pages/Authentication/Login'
import Signup from './pages/Authentication/Signup'

const App = () => {
  
  return(
    <Routes>
      <Route path='/' element = {<CreateNote />}/> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}

export default App