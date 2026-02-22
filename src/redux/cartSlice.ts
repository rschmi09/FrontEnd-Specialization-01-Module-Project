// src/redux/csrtSlice.ts

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

        removeFromCart: (state: CartState, action: PayloadAction<number>) => {
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

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
