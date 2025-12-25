import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setAddtoCart(state, action) {
            const item = action.payload
            const existingItem = state.items.find((i)=> i._id === item._id)
            if(existingItem){
                existingItem.qauntity += 1
            } else {
                state.items.push({...item, qauntity: 1})
            }
        },
        setRemoveFromCart(state, action) {
            const id = action.payload;
            state.items = state.items.filter(i => i._id !== id);
        },
        setIncreaseQty(state, action) {
            const id = action.payload
            const item = state.items.find(i => i._id === id)
            if(item) {
                item.qauntity += 1
            }
        },
        setDecreaseQty(state, action) {
            const id = action.payload
            const item = state.items.find(i => i._id === id)
            if(item) {
                if(item.qauntity > 1) {
                    item.qauntity -= 1
                }
            }
        }, 
        setClearCart (state, action) {
            state.items = []
        }

    }
})

export const {setAddtoCart,setRemoveFromCart,setIncreaseQty,setDecreaseQty,setClearCart} = cartSlice.actions;
export default cartSlice.reducer;