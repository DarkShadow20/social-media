import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostBody } from "../../posts/PostBody";
import { getAllUserPost } from "../../posts/postSlice";
import { orderPostByDate } from "../../utils/orderPostByDate";
import { toastError } from "../../utils/toastMessage";

export const UserPost = () => {
  const [status, setStatus] = useState("idle");
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.auth);
  const orderedPost = orderPostByDate(posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setStatus("pending");
          const result = await dispatch(getAllUserPost(user.id));
          unwrapResult(result);
          setStatus("success");
        } catch (error) {
          console.log(error);
          toastError("Something went wrong, cannot load post");
          setStatus("idle");
        }
      })();
    }
  }, [dispatch, user.id, token]);

  let renderContent;
  renderContent =
    posts.length === 0 ? (
      <div className="text-center">
        <p className="p-2">No posts Found</p>
      </div>
    ) : (
      React.Children.toArray(
        orderedPost?.map((post) => <PostBody post={post} />)
      )
    );

  return <>{status === "success" && renderContent}</>;
};