import { createSlice } from "@reduxjs/toolkit";
import reducer from "./bookSlice";

const initialState = {
    allMyOrders: [],
    singleOrder: null,
    allAdminGetAllOrders: [],
    singleAdminOrder: [],
    adminOrdersFilter: []

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
        },
        setAdminOrdersFilter(state, action) {
            const status = action.payload
            if (status === "All Status"){
                state.adminOrdersFilter = state.allAdminGetAllOrders
            } else {
                state.adminOrdersFilter = state.allAdminGetAllOrders.filter(
                    (order) => order.orderStatus === status
                )
            }
        }
    
    }
})

export const {setAllAdminGetAllOrders,setAllMyOrders,setSingleAdminOrder,setSingleOrder, setPlacedOrder,setAdminOrdersFilter} = orderSlice.actions

export default orderSlice.reducer

