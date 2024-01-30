import React, { useEffect, useState } from "react";
import UserMenu from "../../components/UserMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  switchAlert,
  triggerAlert,
  updateProfile,
} from "../../store/UserSlice";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  // Redux store
  const { userInfo, authToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setDisableBtn(true);
      const user = { name, password, phone, address };
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
            authorization: authToken,
          },
          body: JSON.stringify(user),
        }
      );

      const json = await response.json();
      dispatch(triggerAlert(json));

      if (json.success) {
        localStorage.setItem("user", JSON.stringify(json.user));
        dispatch(updateProfile(json));
      }
    } catch (error) {
      dispatch(triggerAlert(error));
    } finally {
      // -------- HIDE ALERT MESSAGE
      setTimeout(() => {
        dispatch(switchAlert());
        setDisableBtn(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
    setPhone(userInfo.phone);
  }, [userInfo]);

  document.title = "Your Profile";
  return (
    <div className=" min-h-screen flex  w-full">
      <UserMenu />
      <div className="p-1 sm:pl-3 sm:py-3">
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-2">
          <h1 className="text-2xl mb-7 sm:text-3xl sm:mb-8 mt-5">Update Profile Info</h1>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
            <label htmlFor="name" className="hidden sm:block">
              Name
            </label>
            <input
              className="p-2 rounded-md border-[1px] border-gray-300"
              type="text"
              name="name"
              id="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
            <label htmlFor="emial" className="hidden sm:block">
              Email
            </label>
            <input
              className="p-2 rounded-md border-[1px] border-gray-300"
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
            <label htmlFor="password" className="hidden sm:block">
              Password
            </label>
            <input
              className="p-2 rounded-md border-[1px] border-gray-300"
              type="password"
              name="password"
              id="password"
              placeholder="New Password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
            <label htmlFor="phone" className="hidden sm:block">
              Phone
            </label>
            <input
              className="p-2 rounded-md border-[1px] border-gray-300"
              type="text"
              name="phone"
              id="phone"
              placeholder="Type phone here"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-[1em] w-full">
            <label htmlFor="address" className="hidden sm:block">
              Address
            </label>
            <textarea
              className="p-2 rounded-md border-[1px] border-gray-300"
              name="address"
              id="address"
              placeholder="Type Address here."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          <button
            disabled={disableBtn}
            className="p-1 bg-black text-white rounded hover:bg-[#1a1a1a] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
