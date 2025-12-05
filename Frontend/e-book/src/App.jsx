import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Books from './Components/Books'
import Categories from './Components/Categories'
import Myorders from './Components/Myorders'


function App() {
 return ( <div>
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/' element={<Home /> }/>
    <Route path='/books' element={<Books /> }/>
    <Route path='/categories' element={<Categories /> }/>
    <Route path='/myorders' element={<Myorders /> }/>l̥
  </Routes></div>
 )
}

export default App
