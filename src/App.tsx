// src/App.tsx

import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import ShoppingCart from './components/ShoppingCart'
import { useSelector } from 'react-redux'
import { selectTotalCount } from './redux/selectors'


const App = () => {

    // get total item count from Redux
    const totalCount = useSelector(selectTotalCount);

  return (
    <div>

      {/* NavBar */}
      <nav style={{
        padding: '1rem',
        borderBottom: '1px solid gray'
        }}
      >
        <Link to='/' style={{ marginRight: '1rem' }}>Home</Link>
        <Link to='/cart' style={{
          marginLeft: 'auto',
          fontWeight: 'bold'
          }}
        >
          Cart ({totalCount})
        </Link> 

      </nav>

      {/* Route Definitations */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<ShoppingCart />} />
      </Routes>

    </div>
  )

}

export default App
