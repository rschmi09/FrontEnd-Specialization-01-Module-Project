// src/types/types.ts

export type Product = {
    id: number
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
