// src/scripts/importProducts.ts

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.ts';

async function importProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        for (const p of products) {
            await addDoc(collection(db, 'products'), {
                title: p.title,
                price: p.price,
                description: p.description,
                category: p.category,
                image: p.image,
                rating: p.rating
            });
        }

        console.log('Products imported successfully');
        
    } catch (err) {
        console.error('Error importing products:', err);
    }
}

importProducts();