// src/components.OrderHistory.tsx

// show all orders for a user

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type Order = {
    id: string
    userId: string
    totalPrice: number
    createdAt: Timestamp
}

const OrderHistory = () => {
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        const fetchOrders = async () => {

            const q = query(
                collection(db, 'orders'),
                where('userId', '==', 'authUser')
            )

            const snapshot = await getDocs(q)

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Order []

            setOrders(data)
        }

        fetchOrders()
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

                </div>
            ))}

        </div>
    );

};

export default OrderHistory;
