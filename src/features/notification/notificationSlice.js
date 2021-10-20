import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getNotifications=createAsyncThunk("notification/getNotification",async ()=>{
    const response=await axios.get("https://1d2474cb-6db8-431d-b0ec-e2933cdd71c0.id.repl.co/notifications")
    return response.data
    }
);

export const notificationClicked=createAsyncThunk("notification/seen",async(id)=>{
    console.log(id);
    const response=await axios.post(`https://1d2474cb-6db8-431d-b0ec-e2933cdd71c0.id.repl.co/notifications/${id}/read`)
    return response.data
    }
);

const notificationSlice=createSlice({
    name:"notification",
    initialState:{
        notification:[],
        status:"idle",
        error:null,
    },
    reducers:{},
    extraReducers:{
        [getNotifications.pending]:(state)=>{
            state.status="pending";
        },
        [getNotifications.fulfilled]:(state,action)=>{
            state.status="fullfilled";
            state.notification=action.payload.notification;
        },
        [getNotifications.rejected]:(state,action)=>{
            state.status="pending";
            state.error=action.error;
        },
        [notificationClicked.pending]:(state)=>{
            state.status="pending";
        },
        [notificationClicked.fulfilled]:(state,action)=>{
            state.status="fulfilled";
            state.notification=action.payload.notification;
        },
        [notificationClicked.rejected]:(state,action)=>{
            state.status="pending";
            state.error="action.error";
        },
    },
});

export default notificationSlice.reducer;