import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Error from './Components/Error/Error'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path = '/' element={<Home />}/>
          <Route path = '/dashboard' element={<Dashboard />}/>
          <Route path = '/login' element={<Login />}/>
          <Route path = '/signup' element={<Signup />}/>
          <Route path = '*' element={<Error />}/>
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
