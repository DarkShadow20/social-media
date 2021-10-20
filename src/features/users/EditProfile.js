import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateUser } from "../auth/authSlice";
import { updateProfile } from "./userSlice";

export const EditProfile = ({ setshowEditModal, user }) => {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  //const { currentUser } = useSelector((state) => state.auth);
  console.log(user)
  const [values, setValues] = useState({
    name: user.name,
    bio: user.bio,
    location: user.location,
    url: user.url,
  });
  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const addImage = (event) => {
    setImage(event.target.files[0]);
    event.target.value = "";
  };

  const removeImage = () => {
    setImage("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateProfile({ values, image }));
      unwrapResult(result);
      console.log("result", result);
      if (result) {
        const updatedData = {
          username: result?.payload.username,
          userid: result?.payload.id,
          profilePicture: result?.payload.profilePicture,
          name: result?.payload.name,
        };
        console.log("updated profile", updatedData);
        dispatch(updateUser(updatedData));
      }
      setshowEditModal(false);
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed flex  inset-0 z-50 outline-none focus:outline-none ">
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <form
        onSubmit={handleFormSubmit}
        className=" max-w-lg w-11/12 md:w-full p-5 relative mx-auto my-auto rounded shadow-lg  bg-white ">
        <h1 className="text-2xl font-bold mb-1">Edit Details</h1>
        <div className="space-y-3">
          <div className="flex">
            {/* <ProfilePhoto photo={user.profilePicture} name={user.name} /> */}
            <div className="flex items-center">
              <label
                htmlFor="file"
                className="flex cursor-pointer items-center rounded p-2  font-medium  hover:bg-gray-100">
                <HiOutlinePhotograph className="text-xl text-green-400" />
                <span className="text-gray-700">Add/Change Photo</span>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={addImage}
                />
              </label>
              {image && (
                <MdCancel
                  className="text-2xl cursor-pointer"
                  onClick={removeImage}
                  title="Remove image"
                />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div>Name:</div>
            <input
              type="text"
              className="p-1 rounded font-semibold ring-2 focus:ring-3 w-full"
              defaultValue={values.name}
              onChange={handleChange}
              required
              name="name"
              id="name"
            />
          </div>
          <div className="space-y-2">
            <div>Bio:</div>
            <textarea
              type="text"
              className="p-1 rounded font-semibold ring-2 focus:ring-3 w-full"
              defaultValue={values.bio}
              onChange={handleChange}
              name="bio"
              id="bio"></textarea>
          </div>
          <div className="space-y-2">
            <div>Location:</div>
            <input
              type="text"
              className="p-1 rounded font-semibold ring-2 focus:ring-3 w-full"
              defaultValue={values.location}
              onChange={handleChange}
              name="location"
              id="from"
            />
          </div>
          <div className="space-y-2">
            <div>Website:</div>
            <input
              type="text"
              className="p-1 rounded font-semibold ring-2 focus:ring-3 w-full"
              defaultValue={values.url}
              onChange={handleChange}
              pattern="[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
              title="Enter valid url 'www.example.com' "
              name="url"
              id="website"
            />
          </div>
        </div>
        <div className="p-3  mt-2 text-right space-x-4 md:block">
          <button
            onClick={() => setshowEditModal(false)}
            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
            Cancel
          </button>
          <button className="mb-2 md:mb-0 bg-blue-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};