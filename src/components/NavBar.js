import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillBell, AiOutlineSearch } from "react-icons/ai";


function Navbar({ setShowModal }) {
  const { currentUser, token } = useSelector((state) => state.auth);
  const { notification } = useSelector((state) => state.notify);
  return (
    <div className="flex justify-between bg-white p-1 sticky top-0 z-10">
      <div className="flex p-2">
        <p className="text-2xl md:text-3xl font-bold text-blue-500">
          <Link to="/home">BadZine</Link>
        </p>
      </div>
      {token ? (
        <div className="flex space-x-2">
          <div className="py-2">
            <AiOutlineSearch
              onClick={setShowModal}
              className="text-4xl text-gray-500 cursor-pointer"
            />
          </div>
          <Link to="notifications">
            <div className="py-2 relative">
              <AiFillBell className="text-4xl text-gray-500" />
              {notification.length !== 0 && (
                <span
                  className={`absolute  top-3 ${
                    notification.length < 9 ? `left-3` : `left-2`
                  }  text-1xl text-white`}>
                  {notification.length}
                </span>
              )}
            </div>
          </Link>
          <Link to={`${currentUser?.username}`}>
            <div className="flex items-center space-x-1 bg-gray-200 rounded-full mt-2 pr-2 mr-2 md:mr-4">
              {currentUser?.profilePicture ? (
                <img
                  src={currentUser?.profilePicture}
                  alt="me"
                  className="rounded-full w-9 h-9 object-cover"
                />
              ) : (
                <div>
                  <div
                    className={`flex text-1xl text-white items-center justify-center rounded-full w-9 h-9 bg-pink-600`}>
                    <span>{currentUser?.name[0]}</span>
                  </div>
                </div>
              )}
              <div>{currentUser?.name}</div>
            </div>
          </Link>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center rounded-full mt-1 4 mr-2 md:mr-4 text-">
          Login
        </Link>
      )}
    </div>
  );
}

export default Navbar;