import React from "react";

export const EditProfileButton = ({ setshowEditModal }) => {
  return (
    <button className="edit-button ring" onClick={() => setshowEditModal(true)}>
      Edit Profile
    </button>
  );
};