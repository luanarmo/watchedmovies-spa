import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Watched from './components/Watched'
import MovieDetails from './components/MovieDetails'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/watched" element={<Watched />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
