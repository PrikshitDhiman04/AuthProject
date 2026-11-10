"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendResetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/users/forgotpassword", { email });

      setSuccess(true);
      setEmail("");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f5f1eb] via-[#eee4d8] to-[#e5d8c8] px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-[#e5d8c8]">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f5f1eb] flex items-center justify-center">
            <span className="text-3xl">📧</span>
          </div>

          <h1 className="text-3xl font-bold text-[#5c3d2e] mb-3">
            Forgot Password?
          </h1>

          <p className="text-gray-500 text-sm leading-relaxed">
            Don't worry! Enter your registered email address and we'll send you
            a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={sendResetEmail}>
          <div className="mb-5 text-left">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3.5 border border-gray-300 rounded-xl text-gray-800 outline-none focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20 transition"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-5">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 mb-5">
              If an account exists with this email, a password reset link has
              been sent. Check your inbox.
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5c3d2e] text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-[#8b5e3c] hover:shadow-lg transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending Email..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-[#8b5e3c] hover:text-[#5c3d2e] font-medium hover:underline transition"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
