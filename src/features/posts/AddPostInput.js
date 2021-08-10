import { useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ProfilePhoto } from "../../components/ProfilePhoto";
import { createPost } from "./postSlice";
import { MdCancel } from "react-icons/md";
import { unwrapResult } from "@reduxjs/toolkit";

export const AddPostInput = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setState] = useState("idle");
  const dispatch = useDispatch();
  const onChangeHandler = (e) => setContent(e.target.value);

  const canSave = Boolean(content) || Boolean(image);

  const onSubmitHandler = async () => {
    try {
      setState("pending");
      const result = await dispatch(createPost({ content, image }));
      unwrapResult(result);
      setContent("");
      setImage("");
      setState("success");
    } catch (error) {
      console.log(error);
      setState("idle");
    }
  };

  const addImage = (event) => {
    setImage(event.target.files[0]);
    event.target.value = "";
  };

  const removeImage = () => {
    setImage("");
    console.log(image);
  };

  return (
    <div className="input-box bg-white pt-3 mb-5 w-full md:max-w-lg rounded shadow">
      <div className="flex pl-2 py-3x">
        <ProfilePhoto
          name={currentUser.name}
          photo={currentUser.profilePicture}
        />
        <textarea
          className="resize-auto rounded mx-3 my-1 p-1 w-full bg-gray-100"
          placeholder={`what do you have in mind ${currentUser?.name}?`}
          value={content}
          onChange={onChangeHandler}></textarea>
      </div>
      <div className="flex justify-between mb-2 mt-2">
        <div className="flex items-center">
          <label
            htmlFor="file"
            className="flex cursor-pointer items-center rounded p-2 ml-14 font-medium  hover:bg-gray-100">
            <HiOutlinePhotograph className="text-xl text-green-400" />
            <span className="text-gray-700">Add Photo</span>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/png, image/jpeg"
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

        <button
          className=" mr-3 md:mr-5 px-8 bg-blue-500 text-white ring rounded-full hover:bg-blue-700 hover:shadow"
          disabled={!canSave}
          onClick={onSubmitHandler}>
          {status === "pending" ? "wait..." : "Post"}
        </button>
      </div>
    </div>
  );
};