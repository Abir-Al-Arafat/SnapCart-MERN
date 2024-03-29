import {createSlice} from '@reduxjs/toolkit'
import {updateCart} from '../utils/cartUtils'

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[], shippingAddress: {}, paymentMethod: 'PayPal'}

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
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state)
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state)
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state)
        },
        resetCart: (state) => (state = initialState),
    }
})

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart} = cartSlice.actions

export default cartSlice.reducer