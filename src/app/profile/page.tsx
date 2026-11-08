"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing");

  // Fetch User Details
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");

      console.log("API RESPONSE:", res.data);

      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      toast.error("Failed to get user details");
    }
  };

  // Automatically fetch user details when page loads
  useEffect(() => {
    getUserDetails();
  }, []);

  // Logout Function
  const Logout = async () => {
    try {
      await axios.get("/api/users/logout");

      toast.success("Logout Successful");

      router.push("/login");
      router.refresh();
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      toast.error("Logout Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 border border-gray-200 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Profile Page
        </h1>

        <h2 className="p-3 mt-4 rounded-lg bg-green-100 text-green-800 text-center font-medium break-all">
          {data === "nothing" ? (
            "Loading user details..."
          ) : (
            <Link href={`/profile/${data}`} className="hover:underline">
              {data}
            </Link>
          )}
        </h2>

        <hr className="my-6 border-gray-200" />

        {/* Logout Section */}
        <div className="flex flex-col gap-4">
          <button
            onClick={Logout}
            className="w-full py-3 px-4 text-white font-semibold rounded-xl
            bg-linear-to-r from-red-500 to-rose-600
            hover:from-red-600 hover:to-rose-700
            shadow-md hover:shadow-lg
            transition-all duration-300
            transform hover:-translate-y-0.5
            active:scale-95
            focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            Logout
          </button>

          <button
            onClick={getUserDetails}
            className="w-full py-3 px-4 text-white font-semibold rounded-xl
            bg-linear-to-r from-green-500 to-green-600
            hover:from-green-600 hover:to-green-700
            shadow-md hover:shadow-lg
            transition-all duration-300
            transform hover:-translate-y-0.5
            active:scale-95
            focus:outline-none focus:ring-4 focus:ring-green-200"
          >
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
}
