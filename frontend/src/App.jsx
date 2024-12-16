import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Products from './pages/Products';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import About from './pages/About';
import Admin from './pages/Admin';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import AdminRoute from './AdminRoute.jsx';
function App() {
  const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user information from localStorage or an API
        const fetchingData= async()=>{
          const storedUser = await axios.get("/getUserProfile");
          setUser(storedUser);
        }
        fetchingData()
    }, []);
  return (
    <>
      <Navbar />
      <div className="h-full w-full bg-gray-100">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/admin' element={<Admin />}></Route>
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/checkout/:id' element={<Checkout />} />
            </Route>
              
                
              
          
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;