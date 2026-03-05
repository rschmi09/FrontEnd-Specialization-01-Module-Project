// src/components/ShoppingCart.tsx

import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux/store'
import { updateQuantity, removeFromCart, clearCart } from '../redux/cartSlice'
import type { Product } from '../types/types'
import { selectCart, selectTotalCount, selectTotalPrice } from '../redux/selectors' 
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const ShoppingCart = () => {
    const dispatch:AppDispatch = useDispatch();

    // Selectors (for totals)
    const cart: Product[] = useSelector(selectCart);
    const totalCount: number = useSelector(selectTotalCount);
    const totalPrice: number = useSelector(selectTotalPrice);

    // Handle Checkout
    const handleCheckout = async (): Promise<void> => {

        const order = {
            userId: 'authUser',
            createdAt: serverTimestamp(),
            product: cart,
            totalPrice
        }
        
        await addDoc(collection(db, 'orders'), order)       
        
        dispatch(clearCart())
        alert('order placed successfuly! Your cart has been cleared.')
    }

    if (!cart.length) return <p>Your cart is empty</p>

    return (
        <div>

            <h2>Shopping Cart</h2>
           
            {cart.map((item: Product) => (
                
                <div 
                    key={item.id} 
                    style={{ 
                        border: '1px solid gray', 
                        margin: '1rem',
                        padding: '1rem'
                    }}>

                    <h3>{item.title}</h3>
                    <img 
                        src={item.image}
                        alt={item.title}
                        width='100'
                    />

                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.count ?? 0}</p>

                    <div>
                        <button 
                            onClick={() => 
                                dispatch(updateQuantity({ 
                                    id: item.id, 
                                    count: (item.count ?? 0) - 1 
                                }))
                            }
                        >
                            -
                        </button>
                        <span>{item.count}</span>
                        <button 
                            onClick={() => 
                                dispatch(updateQuantity({ 
                                    id: item.id, 
                                    count: (item.count ?? 0) + 1 
                                }))
                            }
                        >
                            +
                        </button>
                    </div>

                    <button onClick={() => dispatch(removeFromCart(item.id))}>
                        Remove
                    </button>

                </div>

            ))}

            <hr />

            <p><strong>Total Items:</strong> {totalCount}</p>
            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            <button onClick={handleCheckout}>Checkout</button>

        </div>
    )

}

export default ShoppingCart;