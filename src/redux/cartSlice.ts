// src/redux/cartSlice.ts

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product, CartState } from '../types/types'


// Initialize from sessionStorage
const cartFromStorage = sessionStorage.getItem('cart');
const initialState: CartState = cartFromStorage ? JSON.parse(cartFromStorage) : []

const saveToSession = (cart: CartState) => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state: CartState, action: PayloadAction<Product>) => {
            const existing = state.find(item => item.id === action.payload.id)
            if (existing) {
                existing.count = (existing.count ?? 0) + 1
            } else {
                state.push({ ...action.payload, count: 1 })
            }

            saveToSession(state)          
        },

        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; count: number }>
        ) => {
            const item = state.find((i) => i.id === action.payload.id)
            
            if (!item) return   // exit if item not found
            
            if ((item.count ?? 0) <=0) {
                return state.filter(i => i.id !== action.payload.id)
                // remove if 0
                //if (item.count <= 0) {
                    //const index = state.findIndex((i) => i.id === action.payload.id)
                    //state.splice(index, 1)
                //}
            }

            saveToSession(state)
        },

           removeFromCart: (state: CartState, action: PayloadAction<string>) => {
            const index = state.findIndex(item => item.id == action.payload)
            if (index >= 0) {
                state.splice(index, 1)
            }
            saveToSession(state)
        },

        clearCart: (state: CartState) => {
            state.length = 0
            saveToSession(state)
        }
    
    }
})

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
