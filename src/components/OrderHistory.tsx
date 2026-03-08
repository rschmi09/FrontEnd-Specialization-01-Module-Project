// src/components.OrderHistory.tsx

// show all orders for a user

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

type Order = {
    id: string
    userId: string
    totalPrice: number
    createdAt: Timestamp
}

const OrderHistory = () => {
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {

        const q = query(
            collection(db, 'orders'),
             where('userId', '==', auth.currentUser?.uid)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Order []

            setOrders(data)
        })
        
        return () => unsubscribe()
  
    }, [])

    return (
        <div>

            <h2>Order History</h2>

            {orders.map(order => (
                <div
                    key={order.id}
                    style={{
                        border: '1px solid gray',
                        padding: '1rem',
                        margin: '1rem'
                    }}
                >
                    <p><strong>Order ID:</strong>{order.id}</p>
                    <p><strong>Total:</strong>${order.totalPrice.toFixed(2)}</p>
                    <p><strong>Date:</strong>{order.createdAt?.toDate().toLocaleString()}</p>

                </div>
            ))}

        </div>
    );

};

export default OrderHistory;
