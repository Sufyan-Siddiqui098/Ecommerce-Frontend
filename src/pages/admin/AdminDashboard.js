import React, { useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);
  return (
    <div className="min-h-screen flex  w-full">
      <AdminMenu />
      <div className="p-1  w-[60vw] sm:pl-4  ">
        <h1 className="text-lg sm:text-2xl my-2 font-semibold p-1">
          Admin Dashboard
        </h1>
        <div className="my-4 p-1">
          <p>
            <label className="font-medium">Name:</label> {userInfo.name}
          </p>
          <p>
            <label className="font-medium">Email:</label> {userInfo.email}
          </p>
          <p>
            <label className="font-medium">Contact:</label> {userInfo.phone}
          </p>
          <p>
            <label className="font-medium">Address:</label> {userInfo.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
