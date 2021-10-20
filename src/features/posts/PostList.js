import React from "react";
import { AddPostInput } from "./AddPostInput";
import { useDispatch, useSelector } from "react-redux";
import { PostBody } from "./PostBody";
import { orderPostByDate } from "../utils/orderPostByDate";
import { fetchAllPosts } from "./postSlice";
import { useEffect } from "react";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
export const PostList = () => {
  const [status, setStatus] = useState("idle");
  const { token } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setStatus("pending");
          const result = await dispatch(fetchAllPosts());
          unwrapResult(result);
          setStatus("success");
        } catch (error) {
          console.log(error);
          setStatus("idle");
        }
      })();
    }
  }, [dispatch, token]);

  const orderedPost = orderPostByDate(posts);
  let renderContent;

  renderContent =
    posts.length === 0 ? (
      <div className="text-center">
        <p className="p-2">No posts found</p>
      </div>
    ) : (
      React.Children.toArray(
        orderedPost?.map((post) => <PostBody post={post} />)
      )
    );

  return (
    <div className="flex items-center flex-col mt-3 mb-5">
      <AddPostInput />
      {status === "pending" && <p className="text-2xl">Loading...</p>}
      {status === "success" && renderContent}
    </div>
  );
};