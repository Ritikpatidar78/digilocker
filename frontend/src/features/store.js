import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./auth/authSlice"
import docsreducer from "./document/documentSlice"
const store = configureStore({
    reducer:{
        auth: authreducer,
        docs: docsreducer
    }
})

export default store;