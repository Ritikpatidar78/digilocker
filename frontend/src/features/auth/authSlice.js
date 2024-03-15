import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authservice";

const userexist = JSON.parse(localStorage.getItem("users"))

const authslice = createSlice({
    name : "auth",
    initialState: {
        user: userexist? userexist:null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducer:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending , (state)=> {
            state.user = null;
            state.isLoading= true,
            state.isError= false,
            state.isSuccess= false,
            state.message= ""
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.user = action.payload;
            state.isLoading= false,
            state.isError= false,
            state.isSuccess= true,
            state.message= ""
        })
        .addCase(register.rejected,(state,action)=>{
            state.user = null;
            state.isLoading= false,
            state.isError= true,
            state.isSuccess= false,
            state.message= action.payload
        })
        .addCase(login.pending , (state)=> {
            state.user = null;
            state.isLoading= true,
            state.isError= false,
            state.isSuccess= false,
            state.message= ""
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.user = action.payload;
            state.isLoading= false,
            state.isError= false,
            state.isSuccess= true,
            state.message= ""
        })
        .addCase(login.rejected,(state,action)=>{
            state.user = null;
            state.isLoading= false,
            state.isError= true,
            state.isSuccess= false,
            state.message= action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user = null;
            state.isLoading= false,
            state.isError= false,
            state.isSuccess= false,
            state.message= ""
        })

    }
})

export default authslice.reducer;

export const login = createAsyncThunk("LOGIN/USER" , async(formdata,thunkAPI) => {
    try {
        const data = await authService.loginservice(formdata)
    return data
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
} )
export const register = createAsyncThunk("REGISTER/USER" , async(formdata,thunkAPI) => {
    try {
        const data = await authService.registerservice(formdata)
    return data
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
} )

export const logout = createAsyncThunk("LOGOUT/USER", async () =>{
    localStorage.removeItem("users")
})