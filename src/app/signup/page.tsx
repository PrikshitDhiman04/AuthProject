"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      console.log("API STATUS:", response.status);
      console.log("API RESPONSE:", response.data);

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed", error.message);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f5f0] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-[#e8dfd5]">
        <h1 className="text-3xl font-semibold text-center text-[#5c3d2e] mb-2">
          {loading ? "Creating Account..." : "Create Account"}
        </h1>

        <p className="text-center text-gray-500 mb-6">Sign up to get started</p>

        <hr className="border-[#e8dfd5] mb-6" />

        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>

          <input
            className="p-3 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-[#8b5e3c] focus:ring-1 focus:ring-[#8b5e3c] transition"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
          />

          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>

          <input
            className="p-3 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:border-[#8b5e3c] focus:ring-1 focus:ring-[#8b5e3c] transition"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>

          <input
            className="p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-[#8b5e3c] focus:ring-1 focus:ring-[#8b5e3c] transition"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />

          <button
            onClick={onSignup}
            disabled={buttonDisabled || loading}
            className="w-full py-3 rounded-lg bg-[#8b5e3c] text-white font-medium hover:bg-[#5c3d2e] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Please wait..."
              : buttonDisabled
                ? "Please fill all fields"
                : "Create Account"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#8b5e3c] hover:text-[#5c3d2e] hover:underline transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
