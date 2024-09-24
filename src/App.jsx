import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Watched from './components/WatchedList.jsx'
import Profile from './components/Profile'
import MovieDetails from './components/MovieDetails'
import WatchedMovieDetails from './components/WatchedMovieDetails'
import AdvancedSearch from './components/AdvancedSearch'

import { SearchProvider } from './context/search.jsx'


import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchProvider><Home /> </SearchProvider>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watched" element={<Watched />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/watchedDetails/:movieId" element={<WatchedMovieDetails />} />
        <Route path="/search" element={<SearchProvider><AdvancedSearch /></SearchProvider>} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
