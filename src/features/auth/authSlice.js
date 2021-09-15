import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setupAuthHeaderForServiceCalls } from "./utils/serviceHandlers";
import { toastSuccess } from "../utils/toastMessage";
import { clearLocalStorage, setLocalStorage } from "./utils/localStorage";

export const userSignUp = createAsyncThunk(
  "auth/signup",
  async (values, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://1d2474cb-6db8-431d-b0ec-e2933cdd71c0.id.repl.co/auth/signup",
        values
      );
      console.log(values)
      if (response.status === 201) {
        console.log("heelo")
        toastSuccess("User Registered Successfully");
      }
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (values, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://1d2474cb-6db8-431d-b0ec-e2933cdd71c0.id.repl.co/auth/login",
        values
      );

      if (response.status === 200) {
        setupAuthHeaderForServiceCalls(response.data.token);
        setLocalStorage(response.data.userdata, response.data.token);
      }
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const currentUser = {
  username: "",
  name: "",
  profilePicture: "",
  userid: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: currentUser,
    token: "",
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.token = "";
      clearLocalStorage();
    },
    setData: (state, action) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.userdata;
    },
    updateUser: (state, action) => {
      console.log(action.payload);
      state.currentUser = action.payload;
      localStorage.setItem("userdata", JSON.stringify(state.currentUser));
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "pending";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
      state.currentUser = action.payload.userdata;
    },
    [login.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    },
  },
});

export const { logout, setData, updateUser } = authSlice.actions;

export default authSlice.reducer;