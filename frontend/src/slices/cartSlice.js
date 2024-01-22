import {createSlice} from '@reduxjs/toolkit'

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
                state.cartItems = state.cartItems.map((product) => product._id === existItem._id ? item : product)
            }else{
                state.cartItems = [...state.cartItems, item]
            }

            // calculating items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item)=>
            acc + item.price * item.qty, 0))

            // calculating shipping price (over 99$ order, its free otherwise 10$ shipping cost)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

            // calculating tax price
            state.taxPrice = addDecimals(Number(state.itemsPrice*0.15))

            // calculating total price
            state.totalPrice = (
                Number(state.itemsPrice)+
                Number(state.shippingPrice)+
                Number(state.taxPrice)
            ).toFixed(2)

            localStorage.setItem('cart', JSON.stringify(state))
        }
    }
})

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer