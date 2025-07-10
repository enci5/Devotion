import { Routes, Route } from 'react-router-dom'
import CreateNote from './pages/CreateNote'

const App = () => {
  
  return(
    <Routes>
      <Route path='/' element = {<CreateNote />}/>
    </Routes>
  )
}

export default App