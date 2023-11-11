import {configureStore} from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import searchReducer from './SearchSlice'
const store = configureStore({
    reducer:{
        user: userReducer,
        searchProduct: searchReducer
    }
})

export default store;