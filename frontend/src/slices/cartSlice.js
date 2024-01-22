import {createSlice} from '@reduxjs/toolkit'
import {updateCart} from '../utils/cartUtils'

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[]}

const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2)
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const existItem = state.cartItems.find((product) => product._id === item._id) 

            if(existItem){
                // item.qty += existItem.qty
                state.cartItems = state.cartItems.map((product) => product._id === existItem._id ? item : product)
            }else{
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item)=>item._id !== action.payload)

            return updateCart(state)
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer