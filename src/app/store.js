import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import userReducer from "../features/users/userSlice";
import authReducer from "../features/auth/authSlice";
import notifyReducer from "../features/notification/notificationSlice";

export default configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    notify: notifyReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {},
      serializableCheck: false,
    }),
});