import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UserMenu from "../../components/UserMenu";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <div className="min-h-screen flex  w-full">
      <UserMenu />
      <div className="p-1  w-[60vw] sm:pl-4  ">
        <h1 className="text-lg sm:text-2xl my-2 font-semibold p-1">
          Dashboard
        </h1>
        <div className="my-4 p-1">
          <p className="sm:text-xl sm:my-1">
            <label className="font-medium ">Name:</label> {userInfo.name}
          </p>
          <p className="sm:text-xl sm:my-1">
            <label className="font-medium">Email:</label> {userInfo.email}
          </p>
          <p className="sm:text-xl sm:my-1">
            <label className="font-medium">Contact:</label> {userInfo.phone}
          </p>
          <p className="sm:text-xl sm:my-1">
            <label className="font-medium">Address:</label> {userInfo.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
