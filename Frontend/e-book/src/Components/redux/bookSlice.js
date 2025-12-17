import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allBooks: [],
    allAdminBooks: [],
    singleBook: null,
    filterBooks: [],
    setAllOrders: [],
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
            state.selectedCategory = category
            // state.filterBooks = state.allBooks;
            if(category === "All"){
                state.filterBooks = state.allBooks;

            } else {
                state.filterBooks = state.allBooks.filter(
                    (book) => book.category === category
                )
            }
        }
    }
})

export const {setAllAdminBooks,setAllBooks,setSingleBook,setFilterBooks,setAllPlacedBook} = bookSlice.actions

export default bookSlice.reducer