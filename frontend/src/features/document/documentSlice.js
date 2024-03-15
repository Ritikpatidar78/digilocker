import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import docservice from "./documentService";

const docslice = createSlice({
    name : "docs",
    initialState : {
        documents : [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
        sdocument : {},
        edit : {
            editdoc: {},
            isedit : false 
        }
    },
    reducers:{

    },
    extraReducers:(builder)=> {
        builder
        .addCase(createdoc.pending,(state)=>{
            state.isLoading= true,
            state.isError= false,
            state.isSuccess= false,
            state.message = ""
        })
        .addCase(createdoc.fulfilled,(state,action)=>{
            state.isLoading= false,
            state.isError= false,
            state.isSuccess= true,
            state.message = ""
        })
        .addCase(createdoc.rejected,(state,action)=>{
            state.isLoading= false,
            state.isError= true,
            state.isSuccess= false,
            state.message = action.payload
        })
        .addCase(getalldoc.pending,(state)=>{
            state.isLoading= true,
            state.isError= false,
            state.isSuccess= false,
            state.message = ""
        })
        .addCase(getalldoc.fulfilled,(state,action)=>{
            state.isLoading= false,
            state.isError= false,
            state.isSuccess= true,
            state.message = "",
            state.documents = action.payload
        })
        .addCase(getalldoc.rejected,(state,action)=>{
            state.isLoading= false,
            state.isError= true,
            state.isSuccess= false,
            state.message = action.payload,
            state.documents = []
        })
        .addCase(getsingledoc.pending,(state)=>{
            state.isLoading= true,
            state.isError= false,
            state.isSuccess= false,
            state.message = ""
        })
        .addCase(getsingledoc.fulfilled,(state,action)=>{
            state.isLoading= false,
            state.isError= false,
            state.isSuccess= true,
            state.message = "",
            state.sdocument = action.payload
        })
        .addCase(getsingledoc.rejected,(state,action)=>{
            state.isLoading= false,
            state.isError= true,
            state.isSuccess= false,
            state.message = action.payload,
            state.sdocument = {}
        })
        .addCase(updatedoc.pending,(state)=>{
            state.isLoading= true,
            state.isError= false,
            state.isSuccess= false,
            state.message = ""
        })
        .addCase(updatedoc.fulfilled,(state,action)=>{
            state.isLoading= false,
            state.isError= false,
            state.isSuccess= true,
            state.message = "",
            state.edit = {
                editdoc : {},
                isedit: false
            }
        })
        .addCase(updatedoc.rejected,(state,action)=>{
            state.isLoading= false,
            state.isError= true,
            state.isSuccess= false,
            state.message = action.payload
        })
        .addCase(deletedoc.pending,(state)=>{
            state.isLoading= true,
            state.isError= false,
            state.isSuccess= false,
            state.message = ""
        })
        .addCase(deletedoc.fulfilled,(state,action)=>{
            state.isLoading= false,
            state.isError= false,
            state.isSuccess= true,
            state.message = action.payload
        })
        .addCase(deletedoc.rejected,(state,action)=>{
            state.isLoading= false,
            state.isError= true,
            state.isSuccess= false,
            state.message = action.payload
        })
       
        .addCase(editdoc.fulfilled,(state,action)=>{
            state.isLoading= false,
            state.isError= false,
            state.isSuccess= true,
            state.message = "",
            state.edit = {
                editdoc : action.payload,
                isedit: true
            }
        })
       


    }
})

export default docslice.reducer

export const createdoc = createAsyncThunk( "CREATE/DOC" , async(formdata,thunkAPI)=> {
    
    try {
        const token = thunkAPI.getState().auth.user.token
        const data = await docservice.createdocservice(formdata,token)
        console.log(data)
        return data
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const getalldoc = createAsyncThunk( "GET/DOCS" , async(_,thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        const data = await docservice.getalldocservice(token)
        console.log(data)

        return data
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
   
})
export const getsingledoc = createAsyncThunk( "GET/SINGLEDOC" , async(id,thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        const data = await docservice.getsingledocservice(id,token)
        console.log(data)

        return data
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
   
})

export const updatedoc = createAsyncThunk( "UPDATE/DOC" , async(formdata,thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        const data = await docservice.updatedocservice(formdata._id, formdata ,token)
        console.log(data)

        return data
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})
export const deletedoc = createAsyncThunk( "DELETE/DOC" , async(id,thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        const data = await docservice.deletedocservice(id,token)
        console.log(data)

        return data
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})
export const editdoc = createAsyncThunk( "EDIT/DOC" , async(data)=> {
    return data
  
})


