import React from "react";
import { BiLinkAlt } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";

export const UserDetails = ({ user }) => {
  return (
    <div className="ml-2">
      <div className="p-1">
        <p>{user.bio}</p>
      </div>
      <div className="flex text-gray-500 mt-1">
        {user.location && (
          <div className="flex items-center">
            <GoLocation />
            <span className="pl-1">{user.location}</span>
          </div>
        )}
        {user.url && (
          <div className="flex ml-2 items-center">
            <BiLinkAlt />
            <a
              href={`https://${user.url}`}
              className="pl-1"
              target="_blank"
              rel="noreferrer">
              {user.url}
            </a>
          </div>
        )}
      </div>
      <div className="flex text-gray-600 mt-1 ml-1">
        <Link to="following">
          <span className="font-bold">{user.following.length}</span>
          <span className="pl-1">following</span>
        </Link>
        <Link to="followers" className="ml-2">
          <span className="font-bold">{user.followers.length}</span>
          <span className="pl-1">followers</span>
        </Link>
      </div>
    </div>
  );
};