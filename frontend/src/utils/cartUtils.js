export const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2)
}

export const updateCart = (state) => {
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

    state.totalProducts = state.cartItems.reduce((acc, item)=>acc+item.qty,0)

    localStorage.setItem('cart', JSON.stringify(state))

    return state
}