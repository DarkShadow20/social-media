import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProfilePhoto } from "../../components/ProfilePhoto";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotifications, notificationClicked } from "./notificationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toastError } from "../utils/toastMessage";

export const Notification = () => {
  const { notification } = useSelector((state) => state.notify);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [status, setStatus] = useState("idle");
  const notificationClick = (id) => {
    dispatch(notificationClicked(id));
  };

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setStatus("pending");
          const result = await dispatch(getNotifications());
          unwrapResult(result);
          setStatus("success");
        } catch (error) {
          console.log(error);
          setStatus("idle");
          toastError("Something went wrong");
        }
      })();
    }
  }, [dispatch, token]);

  const renderNotifications =
    notification?.length === 0 ? (
      <div className="text-center">
        <p className="p-2">No notifications yet</p>
      </div>
    ) : (
      React.Children.toArray(
        notification?.map((details) =>
          details?.notifytype === "FOLLOW" ? (
            <Link
              to={`/${details.sourceUser.username}`}
              onClick={() => notificationClick(details.id)}
              className="flex items-center space-x-2 pl-2 py-2 hover:bg-gray-100 transition delay-100 ease-in-out ">
              <ProfilePhoto
                photo={details.sourceUser.profilePicture}
                name={details.sourceUser.name}
              />
              <div className="text-1xl font-semibold">
                <span>{details.sourceUser.name}</span>
              </div>
              <div>Followed you</div>
              {!details.read && <GoPrimitiveDot className="text-blue-500" />}
            </Link>
          ) : (
            <Link
              to={`/${details?.sourceUser.username}/post/${details.post}`}
              onClick={() => notificationClick(details.id)}
              className="flex items-center space-x-2 pl-2 py-2 hover:bg-gray-100 transition delay-100 ease-in-out ">
              <ProfilePhoto
                photo={details.sourceUser.profilePicture}
                name={details.sourceUser.name}
              />
              <div className="text-1xl font-semibold">
                <span>{details.sourceUser.name}</span>
              </div>
              <div>
                {details.notifytype === "LIKE" && `liked your post`}
                {details.notifytype === "COMMENT" && `commented on your post`}
              </div>
              {!details.read && <GoPrimitiveDot className="text-blue-500" />}
            </Link>
          )
        )
      )
    );

    return (
      <div className="flex items-center flex-col mt-3 mb-10">
        <div className="bg-white mt-1 p-3 md:p-3 md:p-0 w-full md:w-1/2 rounded shadow">
          <div className="mx-2 py-1 border-b-2">
            <div to="/home" className=" text-2xl font-bold ">
              Notifications
            </div>
          </div>
          {renderNotifications}
        </div>
      </div>
    );
  };