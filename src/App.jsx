
import './App.css'
import WeatherApp from './components/WeatherApp'

import { Routes, Route } from "react-router-dom"


function App() {



  return (
    <>
    <div>
    <Routes>
      <Route path='/' element={<WeatherApp />} />
      <Route path="/:cityName" element={ <WeatherApp/> } />
    </Routes>
    </div>
    
      
      
     
    </>
  )
}

export default App
