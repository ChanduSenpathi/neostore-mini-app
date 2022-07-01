import React from 'react'
import { BrowserRouter as Router , Routes , Route, Navigate } from 'react-router-dom'
import MyAppBar from './components/MyAppBar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Addproducts from './components/Addproducts';
import ProductInfo from './components/ProductInfo';
import Cart from './components/Cart';
import Paginationpages from './components/Paginationpages';
import { isAdmin, isLoggedIn } from './service/Auth';
import Home from './components/Home'

function ProtectedRoute({children}){
  const user=isLoggedIn()
  return user ? children: <Navigate to="/"/>
}
function AdminProtectedRoute({children}){
  const user=isLoggedIn()
  const admin=isAdmin()
  return user && admin ? children : <Navigate to="/"/> 
}
export default function App() {
  return (
    <>
      <Router>
        <MyAppBar/>
        <section>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/home" element={<ProtectedRoute>
                <Home/>
              </ProtectedRoute>}/>
              <Route path="/products" element={<ProtectedRoute>
                <Paginationpages/>
              </ProtectedRoute>}/>
              <Route path='/addproducts' element={<AdminProtectedRoute>
                <Addproducts/>
              </AdminProtectedRoute>}/>
              <Route path="/productsinfo:id" element={<ProtectedRoute>
                <ProductInfo/>
              </ProtectedRoute>}/>
              <Route path='/cart' element={<ProtectedRoute>
                <Cart/>
              </ProtectedRoute>}/>
          </Routes>
        </section>
      </Router>
    </>
  )
}
