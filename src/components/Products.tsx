// src/components/Products.tsx

// Fetch data using 'useQuery'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import type { Product } from '../types/types'


type Props = {
    selectedCategory: string
}

// source for fallback placeholder image 
const placeholderImage = 'https://via.placeholder.com/150';

// Fetch function
const fetchProducts = async (category: string): Promise<Product[]> => {
    const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products'
    
    const response = await axios.get(url);
    return response.data;
}
const Products = ({ selectedCategory }: Props) => {
    const dispatch = useDispatch();

    // Using 'useQuery' to fetch products

    // Error Handling
    const { data, isLoading, error } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => fetchProducts(selectedCategory)
    });

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) {
        return <p>Error: {error.message}</p>
    }
    if (!data) return null;

    return (
        <div>

            {data.map(product => (
                <div key={product.id} style={{ 
                    border: '1px solid gray',
                    margin: '1rem',
                    padding: '1rem'
                }}>

                    <h2>{product.title}</h2>

                    <img
                        src={product.image}
                        alt={product.title}
                        width='150'
                        onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = placeholderImage
                        }}
                    />

                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Rating:</strong> {product.rating.rate}</p>

                    <button onClick={() => dispatch(addToCart(product))}>
                        Add Item to Cart
                    </button>
                
                </div>
            ))}

        </div>
    )

}

export default Products;