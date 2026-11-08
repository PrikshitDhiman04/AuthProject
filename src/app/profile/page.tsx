"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const Logout = () => {
    try {
      axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 border border-gray-200 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Profile Page
        </h1>

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
        </div>
      </div>
    </div>
  );
}
