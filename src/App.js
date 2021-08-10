import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { PrivateRoute } from "./components/PrivateRoute";
import { PostList } from "./features/posts/PostList";
import { SinglePostPage } from "./features/posts/SinglePostPage/SinglePostPage";
import { UserProfile } from "./features/users/UserProfile";
import { UserPost } from "./features/users/UserSpecificPost/UserPost";
import { UserLikedPosts } from "./features/users/UserSpecificPost/UserLikedPosts";
import { Followers } from "./features/users/Followers";
import { Following } from "./features/users/Following";
import { Notification } from "./features/notification/Notification";
import { SearchModal } from "./components/SearchModal";
import { Signup } from "./features/auth/SignUp";
import { Login } from "./features/auth/Login";
import useToggle from "./hooks/useToggle";
import { setupAuthHeaderForServiceCalls } from "./features/auth/utils/serviceHandlers";
import { setupAuthExceptionHandler } from "./features/auth/utils/serviceHandlers";
import { logout, setData } from "./features/auth/authSlice";
import { getLocalStorage } from "./features/auth/utils/localStorage";
import { getNotifications } from "./features/notification/notificationSlice";

function App() {
  const [showModal, setShowModal] = useToggle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userdata, token } = getLocalStorage();
  useEffect(() => {
    if (token) {
      setupAuthHeaderForServiceCalls(token);
      setupAuthExceptionHandler(logout, navigate, dispatch);
      dispatch(setData({ userdata, token }));
      dispatch(getNotifications());
    }
  }, [dispatch, navigate, token, userdata]);

  return (
    <div className="App" >
      <main className="bg-gray-200 min-h-screen overflow-x-auto">
        <NavBar setShowModal={setShowModal} />
        <Routes>
          {token ? (
            <Navigate path="/" to="/home" />
          ) : (
            <Navigate path="/" to="/login" />
          )}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/home" element={<PostList />} />
          <PrivateRoute path="/notifications" element={<Notification />} />
          <PrivateRoute
            path="/:username/post/:id"
            element={<SinglePostPage />}
          />
          <PrivateRoute path="/:username" element={<UserProfile />}>
            <Route path="/" element={<UserPost />} />
            <Route path="/mylikes" element={<UserLikedPosts />} />
          </PrivateRoute>
          <PrivateRoute path="/:username/followers" element={<Followers />} />
          <PrivateRoute path="/:username/following" element={<Following />} />
        </Routes>
        {showModal && <SearchModal setShowModal={setShowModal} />}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;