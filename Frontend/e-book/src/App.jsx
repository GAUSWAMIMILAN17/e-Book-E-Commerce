import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Books from './Components/Books'
import Categories from './Components/Categories'
import Myorders from './Components/Myorders'
import ViewOrders from "./Components/ViewOrders"
import Details from "./Components/Details"
import Cart from './Components/Cart'


function App() {
 return ( <div>
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/' element={<Home /> }/>
    <Route path='/cart' element={<Cart /> }/>
    <Route path='/books' element={<Books /> }/>
    <Route path='/categories' element={<Categories /> }/>
    <Route path='/myorders' element={<Myorders /> }/>
    <Route path='/detail/:id' element={<Details /> }/>
    <Route path='/myOrders/:id' element={<ViewOrders /> }/>
  </Routes></div>
 )
}

export default App
