import { createSlice } from "@reduxjs/toolkit";
import reducer from "./bookSlice";

const initialState = {
    allMyOrders: [],
    singleOrder: null,
    allAdminGetAllOrders: [],
    singleAdminOrder: []
}

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setAllMyOrders(state, action) {
            state.allMyOrders = action.payload
        },
        setSingleOrder(state, action) {
            state.singleOrder = action.payload
        },
        setAllAdminGetAllOrders(state, action) {
            state.allAdminGetAllOrders = action.payload
        },
        setSingleAdminOrder(state, action) {
            state.singleAdminOrder = action.payload
        },
        setPlacedOrder(state, action) {
            state.singleOrder = action.payload;
        }
    }
})

export const {setAllAdminGetAllOrders,setAllMyOrders,setSingleAdminOrder,setSingleOrder, setPlacedOrder} = orderSlice.actions

export default orderSlice.reducer

