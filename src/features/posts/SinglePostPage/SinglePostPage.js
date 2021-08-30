import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { LikeButton } from "../LikeButton";
import { fetchSinglePost, postComment } from "../postSlice";
import { BiComment } from "react-icons/bi";
import { TimeAgo } from "../TimeAgo";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";
import { Comments } from "./Comments";
import { ProfilePhoto } from "../../../components/ProfilePhoto";
import { useState } from "react";
import { PostProfileHeader } from "../PostProfileHeader";
import { unwrapResult } from "@reduxjs/toolkit";
import { toastError } from "../../utils/toastMessage";

export const SinglePostPage = () => {
  const { id } = useParams();
  const [showBox, setShowBox] = useState(false);
  const [comment, setComment] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [pending, setPending] = useState("idle");

  const canPost = Boolean(comment);

  const post = useSelector((state) => state.post.singlePost);

  const handleOnclickHandler = (post) => {
    dispatch(postComment({ postid: post.id, comment }));
    setShowBox(false);
    setComment("");
  };

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setPending("pending");
          const resultAction = await dispatch(fetchSinglePost(id));
          unwrapResult(resultAction);
          setPending("success");
        } catch (error) {
          console.log(error);
          toastError("Something went wrong");
        }
      })();
    }
  }, [dispatch, id, token]);

  const renderSinglePost = (
    <>
      {pending === "success" && (
        <div className="flex items-center flex-col mt-3 mb-10">
          <div className="bg-white mt-3 w-full md:max-w-lg rounded shadow">
            <div className="mx-2 py-1 border-b-2">
              <Link
                to="/home"
                className="flex items-center text-2xl font-bold ">
                <TiArrowBack />
                <span>Feed</span>
              </Link>
            </div>
            <div className="flex pl-2 pt-3">
              <ProfilePhoto
                photo={post.userid.profilePicture}
                name={post.userid.name}
              />
              <div className="pl-3">
                <PostProfileHeader
                  username={post.userid.username}
                  name={post.userid.name}
                />
                <TimeAgo timestamp={post.createdAt} />
              </div>
            </div>
            <div>
              <p className="py-3 px-2">{post.desc}</p>
              {post.image && (
                <img src={post.image} alt="name" className="mt-2 p-1 md:p-0" />
              )}
            </div>
            <div className="flex justify-end my-2 text-gray-700">
              <p className="mr-2">{post.likes.length} likes</p>
              <p className="mr-2">{post.comments.length} comments</p>
            </div>
            <div className="flex justify-around my-1 border-t-2">
              <LikeButton post={post} type="single" />
              <button className="post-buttons" onClick={() => setShowBox(true)}>
                <BiComment />
                <span className="pl-1 text-base">Comment</span>
              </button>
            </div>
            {showBox && (
              <div className="flex items-center flex-col my-3">
                <textarea
                  autoFocus={true}
                  className="w-11/12 md:w-11/12 bg-gray-200 rounded-lg p-2"
                  coloums="40"
                  placeholder="Would you like to make a comment?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}></textarea>
                <div className="inline self-end mr-3 mt-2">
                  <button
                    className="comment-buttons"
                    onClick={() => setShowBox(false)}>
                    Cancel
                  </button>
                  <button
                    className="comment-buttons"
                    onClick={() => handleOnclickHandler(post)}
                    disabled={!canPost}>
                    Comment
                  </button>
                </div>
              </div>
            )}
          </div>
          <Comments comments={post.comments} />
        </div>
      )}
    </>
  );

  return (
    <section>
      {renderSinglePost}
      <div className="text-center">
        <p> {pending === "pending" && "Loading..."}</p>
      </div>
    </section>
  );
};