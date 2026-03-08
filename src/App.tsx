// src/App.tsx

import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import ShoppingCart from './components/ShoppingCart'
import { useSelector, useDispatch } from 'react-redux'
import { selectTotalCount } from './redux/selectors'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { setUser, clearUser } from './redux/authSlice';
import type { AppDispatch, RootState } from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import { handleLogout } from './components/Logout';
import ProductManagement from './components/ProductManagement';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  // get total item count from Redux
  const totalCount = useSelector(selectTotalCount);

    // Access current user anywhere
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const location = useLocation();
  
  // Show NavBar only on non-login/register pages
  const showNav = location.pathname !== '/login' && location.pathname !== '/register';

  // Listen to Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        dispatch(setUser(user));      //store logged-in user in Redux
      } else {
        dispatch(clearUser());        // clear user on logout
      }
    });

    return () => unsubscribe();
  }, [dispatch]);


  return (
    <div className='app-container'>

      {/* NavBar */}
      {showNav && (
        <nav className='navbar'>

          <div className='navbar-left'>
            <Link to='/' >Home</Link>
            <Link to='/product-management' >Product Management</Link>
          </div>

          <div className='navbar-right'>
            <Link to='/cart'>Cart ({totalCount})</Link> 
            {currentUser && <button onClick={handleLogout}>Logout</button>}
          </div>

        </nav>
      )}

      {/* Route Definitions */}
      <Routes>
        {/* Redirect to login if not logged in */}
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />

        {/* Auth pages */}
        <Route 
          path='/login' 
          element={<Login />}
        />
        <Route 
          path='/register' 
          element={!currentUser ? <Register /> : <Navigate to='/' />}
        />

        {/* Cart page requires login */}
        <Route 
          path='/cart' 
          element={
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
            } 
        />

        {/* Product Management */}
        <Route
          path='product-management'
          element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>

    </div>
  )

}

export default App
