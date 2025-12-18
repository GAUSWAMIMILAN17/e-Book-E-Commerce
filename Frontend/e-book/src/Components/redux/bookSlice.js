import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allBooks: [],
    allAdminBooks: [],
    singleBook: null,
    filterBooks: [],
    setAllOrders: [],
    filterAdminBooks: [],
    adminSingleBook: null,
}

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setAllBooks(state, action) {
            state.allBooks = action.payload;
        },
        setSingleBook(state, action) {
            state.singleBook = action.payload
        },
        setAllAdminBooks(state, action) {
            state.allAdminBooks = action.payload
        },
        setAllOrders(state, action) {
            state.allPlacedBooks = action.payload
        },
        setFilterBooks(state, action){
            const category = action.payload
            console.log(category)
            // state.selectedCategory = category
            if(category === "All"){
                state.filterBooks = state.allBooks;

            } else {
                state.filterBooks = state.allBooks.filter(
                    (book) => book.category === category
                )
            }
        },
        setFilterAdminBooks(state, action){
            const category = action.payload
            // console.log(category)
            if(category === "All"){
                state.filterAdminBooks = state.allAdminBooks;

            } else {
                state.filterAdminBooks = state.allAdminBooks.filter(
                    (book) => book.category === category
                )
            }
        },
        setAdminSingleBook(state, action) {
            state.adminSingleBook = action.payload
        }
    }
})

export const {setAllAdminBooks,setAdminSingleBook,setFilterAdminBooks,setAllBooks,setSingleBook,setFilterBooks,setAllPlacedBook} = bookSlice.actions

export default bookSlice.reducer