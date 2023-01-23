import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Main from './views/Main';
import NewKeyboard from './views/NewKB';
import ViewKeyboard from './views/ViewKB';
import UpdateKeyboard from './views/UpdateKB';
import NewKeycap from './views/NewKC';
import { useState, useEffect } from 'react'
import MainHeader from './components/MainHeader';
import Login from './components/Login';
import Register from './components/Register';
import "@stripe/stripe-js";
import Success from './components/Success';
import Cancel from './components/Cancel';
import ViewKeycap from './views/ViewKC';

function App() {
  const [cartItems, setCartItems] = useState([])
  const handleAddProduct = (keyboard) => {
    const exist = cartItems.find((item) => item._id === keyboard._id);
    if(exist) {
        const newState = cartItems.map((item => {
          if(item._id === keyboard._id) {
            item['qtyDesired']++
          }
          return item
        }))
        setCartItems(newState)
    } else {
      setCartItems([...cartItems, {...keyboard, qtyDesired : 1}])
    }
  }

  const handleRemoveProduct = (keyboard) => {
    const exist = cartItems.find((item) => item._id === keyboard._id);
    if(exist) {
      setCartItems(cartItems.filter((item => item._id !== keyboard._id)))
    }
  }

  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/')
    }
  }, [location.pathname, navigate])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainHeader products={cartItems} handleRemoveProduct={handleRemoveProduct}/>} >
          <Route element={<Main />} path="/" />
          <Route element={<NewKeyboard />} path="/keyboards/new" />
          <Route element={<NewKeycap />} path="/keycaps/new" />
          <Route element={<ViewKeyboard handleAddProduct={handleAddProduct}/>} path="keyboards/:id" />
          <Route element={<ViewKeycap handleAddProduct={handleAddProduct}/>} path="keycaps/:id" />
          <Route element={<UpdateKeyboard />} path="/keyboards/:id/edit" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Success />} path="success"/>
          <Route element={<Cancel />} path="cancel" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;