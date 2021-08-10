import { TimeAgo } from "./TimeAgo";
import { Link } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import { GrView } from "react-icons/gr";
import { ProfilePhoto } from "../../components/ProfilePhoto";
import { PostProfileHeader } from "./PostProfileHeader";

export const PostBody = ({ post }) => {
  const {
    userid: { profilePicture, username, name },
    desc,
    createdAt,
    likes,
    image,
    comments,
    id,
  } = post;
  return (
    <div className="bg-white mt-1 w-full p-1 md:p-0 md:max-w-lg rounded shadow">
      <div className="flex pl-2 pt-3">
        <ProfilePhoto photo={profilePicture} name={name} />
        <div className="pl-3">
          <PostProfileHeader username={username} name={name} />
          <TimeAgo timestamp={createdAt} />
        </div>
      </div>
      <div>
        {image && <img src={image} alt={name} className="mt-2" />}
        <p className="py-3 px-2">{desc}</p>
      </div>
      <div className="flex justify-end text-gray-700">
        <p className="mr-2">{likes.length} likes</p>
        <p className="mr-2">{comments.length} comments</p>
      </div>
      <div className="flex justify-around my-1 border-t-2">
        <LikeButton post={post} />
        <Link className="post-buttons" to={`/${username}/post/${id}`}>
          <GrView />
          <span className="pl-1 text-base">View Post</span>
        </Link>
      </div>
    </div>
  );
};