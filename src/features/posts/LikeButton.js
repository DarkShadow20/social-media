import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiThumbsUp } from "react-icons/fi";
import {
  likePost,
  likeSinglePost,
  unlikePost,
  unLikeSinglePost,
} from "./postSlice";

export const LikeButton = ({ post, type }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const likeColorToggle = (post) => {
    if (post?.likes.includes(currentUser.userid)) {
      return "text-blue-500";
    } else {
      return "";
    }
  };

  const likeButtonHandler = (post,currentUser) => {
    if (post.likes.includes(currentUser?.userid)) {
      if (type === "single") {
        dispatch(unLikeSinglePost(post?.id));
      } else {
        dispatch(unlikePost(post?.id));
      }
    } else {
      if (type === "single") {
        dispatch(likeSinglePost(post?.id));
      } else {
        dispatch(likePost(post?.id));
      }
    }
  };

  return (
    <button
      onClick={() => likeButtonHandler(post, currentUser)}
      className={`post-buttons ${likeColorToggle(
        post,
        dispatch,
        currentUser
      )}`}>
      <FiThumbsUp />
      <span className="pl-1 text-base">Like</span>
    </button>
  );
};