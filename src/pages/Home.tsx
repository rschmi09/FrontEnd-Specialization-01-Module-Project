// src/pages/Home.tsx

import { useState } from 'react'
import CategoryNav from '../components/CategoryNav'
import Products from '../components/Products'

const Home = () => {
    // Track the currently selected category
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    return (
        <div style={{ padding: '2rem' }}>
        
            <h1>Fake Store Products</h1>

            {/* Category dropdown */}
            <CategoryNav
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* Products list filtered by category */}
            <Products selectedCategory={selectedCategory} />

        </div>
    )
}

export default Home;