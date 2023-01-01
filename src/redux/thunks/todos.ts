import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAll = createAsyncThunk(
    'todos/getAll',
    async(_,thunkAPI)=>{
        try{
            const response = await axios('https://jsonplaceholder.typicode.com/todos')
            return response.data

        }catch(err: any){
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
)