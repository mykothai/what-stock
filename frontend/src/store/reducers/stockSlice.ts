import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface StockState {
  quantity: number
  status: 'idle' | 'loading' | 'failed'
}

export interface StockAction {
  type: string
  payload: {
    quantity: number
  }
}

const initialState: StockState = {
  quantity: 0,
  status: 'idle'
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    increment: state => {
      state.quantity += 1
    },
    decrement: state => {
      state.quantity -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.quantity += action.payload
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.quantity -= action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount, decrementByAmount } = stockSlice.actions

export const selectQuantity = (state: RootState) => state.stock.quantity
export const selectStatus = (state: RootState) => state.stock.status

export default stockSlice.reducer