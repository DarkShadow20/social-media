import React from "react";
import { ProfilePhoto } from "../../../components/ProfilePhoto";
import { TimeAgo } from "../TimeAgo";
import { PostProfileHeader } from "../PostProfileHeader";
export const Comments = ({ comments }) => {
  const renderComments = React.Children.toArray(
    comments.map((item) => (
      <div className="bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg rounded shadow">
        <div className="flex pl-2 pt-3">
          <ProfilePhoto
            photo={item.userid.profilePicture}
            name={item.userid.name}
          />
          <div className="pl-3">
            <PostProfileHeader
              username={item.userid.username}
              name={item.userid.name}
            />
            <TimeAgo timestamp={item.createdAt} />
          </div>
        </div>
        <div>
          <p className="py-3 px-2">{item.comment}</p>
        </div>
      </div>
    ))
  );
  return <>{renderComments}</>;
};