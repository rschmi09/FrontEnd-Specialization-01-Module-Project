// src/redux.selectors.ts

// exportable totalCount and totalPrice for the cart

import type { RootState } from '../redux/store'


export const selectCart = (state: RootState) => state.cart

export const selectTotalCount = (state: RootState) =>
  state.cart.reduce((sum, item) => sum + (item.count ?? 0), 0)

export const selectTotalPrice = (state: RootState) =>
  state.cart.reduce((sum, item) => sum + (item.price * (item.count ?? 0)), 0)
