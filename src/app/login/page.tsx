"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast.success("Login Successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f5f0] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-[#e8dfd5]">
        <h1 className="text-3xl font-semibold text-center text-[#5c3d2e] mb-2">
          {loading ? "Logging in..." : "Welcome Back"}
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to access your account
        </p>

        <hr className="border-[#e8dfd5] mb-6" />

        <div className="flex flex-col">
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
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8b5e3c] focus:ring-1 focus:ring-[#8b5e3c] transition"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />

          <div className="flex justify-end mt-2 mb-6">
            <Link
              href="/forgotpassword"
              className="text-sm font-medium text-[#8b5e3c] hover:text-[#5c3d2e] hover:underline transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={onLogin}
            disabled={buttonDisabled || loading}
            className="w-full py-3 rounded-lg bg-[#8b5e3c] text-white font-medium hover:bg-[#5c3d2e] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#8b5e3c] hover:text-[#5c3d2e] hover:underline transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
