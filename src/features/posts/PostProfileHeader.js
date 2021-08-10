import React from "react";
import { Link } from "react-router-dom";
export const PostProfileHeader = ({ username, name }) => {
  return (
    <div className="flex items-center">
      <Link to={`/${username}`} className="font-medium font-bold">
        {name}
      </Link>
      <Link
        to={`/${username}`}
        className="text-sm text-gray-400 font-semibold pl-2">
        @{username}
      </Link>
    </div>
  );
};