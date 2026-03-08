// src/components/ProductManagement.tsx

// CRUD operations w/ Firestrore: Add, Display, Update, and Delete

import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import type { Product } from '../types/types';

const placeholderImage = "https://via.placeholder.com/150";

const ProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);

    // Inputs for new products
    const [newTitle, setNewTitle] = useState('');
    const [newPrice, setNewPrice] = useState<number>(0);
    const [newCategory, setNewCategory] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newRating, setNewRating] = useState<number>(0);

    // Update inputs per product
    const [editValues, setEditValues] = useState<Record<string, Partial<Product>>>({});

    // Firestore CRUD functions
    const createProduct = async () => {
        if (!newTitle || !newCategory) return;

        await addDoc(collection(db, 'products'), {
            title: newTitle,
            price: newPrice,
            category: newCategory,
            description: newDescription,
            image: newImage || placeholderImage,
            rating: {
                rate: newRating,
                count:0
            }
        });


        // Clear inputs
        setNewTitle('');
        setNewPrice(0);
        setNewCategory('');
        setNewDescription('');
        setNewImage('');
        setNewRating(0);
    };

    const updateProduct = async (productId: string) => {
        const updatedData = editValues[productId];
        if (!updatedData) return;

        const productDoc = doc(db, 'products', productId);
        await updateDoc(productDoc, updatedData);

        // Clear edit values 
        setEditValues(prev => ({ ...prev, [productId]: {} }));
    };

    const deleteProduct = async (productId: string) => {
        const productDoc = doc(db, 'products', productId);
        await deleteDoc(productDoc);
    };

    // Real-time listener
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<Product, 'id'>)
            }));
            setProducts(data);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Products</h2>

            {/* Create New Product */}
            <div style={{ border: "2px solid blue", padding: "10px", marginBottom: "20px" }}>
                <h3>Create New Product</h3>
                <input
                    type='text'
                    placeholder='Title'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Price'
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                />
                <input
                    type='text'
                    placeholder='Category'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Description'
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Image URL'
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                />
                <input
                    type='number'
                    placeholder='Rating'
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                />      

                <button onClick={createProduct}>Add Product</button>

            </div>

            {/* Display Products */}
            {products.map((product) => (
                <div key={product.id} style={{
                    border: '2px solid black',
                    margin: '10px',
                    padding: '10px'
                    }}
                >
                    <h3>{product.title}</h3>
                    <img src={product.image || placeholderImage}
                        width={150} 
                        alt={product.title} 
                        onError={(e) => {
                            e.currentTarget.src = placeholderImage;
                        }}
                    /> 
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Rating:</strong> {product.rating.rate}</p>

                    {/* Update Fields */}
                    <div style={{ marginTop: '10px' }}>
                        <input  
                            placeholder='Title'
                            value={editValues[product.id]?.title || ''}
                            onChange={(e) => setEditValues(prev => ({
                                ...prev,
                                [product.id]: {...prev[product.id], title: e.target.value }
                            }))}
                        />
                        <input  
                            type='number'
                            placeholder='Price'
                            value={editValues[product.id]?.price || ''}
                            onChange={(e) => setEditValues(prev => ({
                                ...prev,
                                [product.id]: {...prev[product.id], price: Number(e.target.value )}
                            }))}
                        />
                            <input  
                            placeholder='Category'
                            value={editValues[product.id]?.category || ''}
                            onChange={(e) => setEditValues(prev => ({
                                ...prev,
                                [product.id]: {...prev[product.id], category: e.target.value }
                            }))}
                        />
                            <input  
                            placeholder='Description'
                            value={editValues[product.id]?.description || ''}
                            onChange={(e) => setEditValues(prev => ({
                                ...prev,
                                [product.id]: {...prev[product.id], description: e.target.value }
                            }))}
                        />
                            <input  
                            placeholder='Image'
                            value={editValues[product.id]?.image || ''}
                            onChange={(e) => setEditValues(prev => ({
                                ...prev,
                                [product.id]: {...prev[product.id], image: e.target.value }
                            }))}
                        />
                            <input  
                            type='number'
                            placeholder='Rating'
                            value={editValues[product.id]?.rating?.rate || ''}
                            onChange={(e) => setEditValues(prev => ({
                                ...prev,
                                [product.id]: {
                                    ...prev[product.id], 
                                    rating: {
                                        rate: Number(e.target.value ),
                                        count: product.rating.count
                                    }
                                }
                            }))}
                        />

                        <button onClick={() => updateProduct(product.id)}>
                            Update Product
                        </button>

                        <button onClick={() => deleteProduct(product.id)}>
                            Delete Product
                        </button>
                    </div>

                </div>               

            ))}

        </div>
    );

};

export default ProductManagement;
