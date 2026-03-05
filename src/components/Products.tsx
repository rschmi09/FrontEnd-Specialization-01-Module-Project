// src/components/Products.tsx

// Fetch data using 'useQuery'

import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import type { Product } from '../types/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';


type Props = {
    selectedCategory: string
}

// source for fallback placeholder image 
const placeholderImage = 'https://via.placeholder.com/150';

// Fetch function
const fetchProducts = async (): Promise<Product[]> => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    
    const products: Product[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>)
    }));

    return products;
};

const Products = ({ selectedCategory }: Props) => {
    const dispatch = useDispatch();

    // useQuery
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts
    });

    // Error Handling
    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) {
        return <p>Error: {error.message}</p>
    }
    if (!data) return null;

    const filteredProducts = selectedCategory
        ? data.filter(p => p.category === selectedCategory)
        : data;

    return (
        <div className='products-container'>

            {filteredProducts.map(product => (
                <div key={product.id} className='product-card'>

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
    );

};

export default Products;