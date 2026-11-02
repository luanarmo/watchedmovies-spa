import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Watched from './pages/WatchedList.jsx'
import Plan from './pages/PlanList.jsx'
import Profile from './pages/Profile'
import MovieDetails from './pages/MovieDetails'
import WatchedMovieDetails from './pages/WatchedMovieDetails'
import AdvancedSearch from './pages/AdvancedSearch'
import { EmailVerification } from './pages/EmailVerification.jsx'
import { VerifyEmail } from './pages/VerifyEmail.jsx'
import { ForgotPasswordForm } from './pages/ForgotPasswordForm.jsx'
import { ResetPassword } from './pages/ResetPassword.jsx'
import { PrivateRoute } from './components/PrivateRoute.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { SearchProvider } from './context/search.jsx'
import { Loading } from './components/Loading.jsx'

import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

// recharts and @dnd-kit only matter on these routes, so they stay out of the first bundle
const Stats = lazy(() => import('./pages/Stats.jsx'))
const TierList = lazy(() => import('./pages/TierList.jsx'))

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div className="min-h-screen flex justify-center items-center"><Loading /></div>}>
        <Routes>
          <Route path="/" element={<SearchProvider><Home /></SearchProvider>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/watched" element={<PrivateRoute><Watched /></PrivateRoute>} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/watchedDetails/:movieId" element={<PrivateRoute><WatchedMovieDetails /></PrivateRoute>} />
          <Route path="/search" element={<SearchProvider><AdvancedSearch /></SearchProvider>} />
          <Route path="/verify/:uid/:token" element={<EmailVerification />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
          <Route path="/resetPassword/:uid/:token" element={<ResetPassword />} />
          <Route path="/plan" element={<PrivateRoute><Plan /></PrivateRoute>} />
          <Route path="/stats" element={<PrivateRoute><Stats /></PrivateRoute>} />
          <Route path="/tier-list" element={<PrivateRoute><TierList /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
