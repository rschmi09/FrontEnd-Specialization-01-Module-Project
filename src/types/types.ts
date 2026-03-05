// src/types/types.ts

import { Timestamp } from "firebase/firestore";

export type Product = {
    id: string
    title: string
    price: number
    category: string
    description: string
    image: string             // URL string    
    rating: {                 // What API returns
      rate: number            // What we need
      count: number
  }
  count?: number            // optional, used for cart
};

export type CartState = Product[];

export type CartItem = Product & {
  count: number
}

export type Order = {
  id: string
  userId: string
  products: Product[]
  totalPrice: number
  createdAt: Timestamp
}