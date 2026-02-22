README.md

-------------------------------------
Project Overview
-------------------------------------
Frontend Specialization 01 Module Project

Goal: 
Create an 'Advanced' React E-Commerce web App 
utilizing React Query to fetch products from
a fake store API and Redux Toolkit to manage 
the shopping cart state.


-------------------------------------
Project Installations
-------------------------------------
Creation: vite@latest

Installs:
- axios
- react-dom
- react-router-dom
- @tanstack/react-query
- redux react-redux @reduxjs/toolkit


-------------------------------------
Project Architecture
-------------------------------------

src
|
|_ components
|   |_CategoryNav.tsx
|   |_Products.tsx
|   |_ShoppingCart.tsx
|
|
|_redux
|    |_cartSlice.ts
|    |_selectors.ts
|    |_store.ts
|
|
|_ pages
|   |_Home.tsx
|
|
|_ types
|   |_types.ts
|
|
|_App.txs


-------------------------------------
Project Useage 
-------------------------------------

A homepage displays all products fetched from the 
ake store API, a dropdown to choose a product category 
which displays just that category of products, and a
navbar allowing access to the shopping cart and Home 
pages. Users are able to add a product to thier cart
directly from the Home page and when viewing the 
shopping cart, the total number of items and the 
total price are displayed. When the user 'checks out'
the cart is cleared and they receive a notice that 
thier checkout is successful and the cart has been
cleared.

