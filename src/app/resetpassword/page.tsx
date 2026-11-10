"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetPasswordEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post("/api/users/resetpassword", {
        token,
        newPassword,
      });

      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Password reset failed. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(
      window.location.search
    ).get("token");

    setToken(urlToken || "");
    setIsCheckingToken(false);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f5f1eb] via-[#eee4d8] to-[#e5d8c8] px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-[#e5d8c8]">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f5f1eb] flex items-center justify-center">
            <span className="text-3xl">🔐</span>
          </div>

          <h1 className="text-3xl font-bold text-[#5c3d2e] mb-3">
            Reset Password
          </h1>

          <p className="text-gray-500 text-sm leading-relaxed">
            Create a new password for your account.
            Make sure it is strong and secure.
          </p>
        </div>

        {/* Checking Token */}
        {isCheckingToken ? (
          <div className="text-center py-6">
            <p className="text-gray-600 animate-pulse">
              Checking your reset link...
            </p>
          </div>
        ) : !token ? (

          /* Missing Token */
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-red-600 font-semibold mb-2">
              Invalid Reset Link
            </p>

            <p className="text-red-500 text-sm mb-4">
              No reset token was found. Please request a new password reset link.
            </p>

            <Link
              href="/forgotpassword"
              className="inline-block bg-[#5c3d2e] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#8b5e3c] transition"
            >
              Request New Link
            </Link>
          </div>

        ) : success ? (

          /* Success Message */
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">✅</div>

            <h2 className="text-xl font-bold text-green-700 mb-2">
              Password Changed!
            </h2>

            <p className="text-green-600 text-sm mb-5">
              Your password has been successfully updated.
              You can now log in using your new password.
            </p>

            <Link
              href="/login"
              className="block w-full bg-[#5c3d2e] text-white py-3 rounded-lg font-semibold hover:bg-[#8b5e3c] transition"
            >
              Go to Login
            </Link>
          </div>

        ) : (

          /* Reset Password Form */
          <>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
              <span className="text-green-600">✓</span>

              <p className="text-green-700 text-sm font-medium">
                Reset token detected successfully.
              </p>
            </div>

            <form onSubmit={resetPasswordEmail}>

              {/* New Password */}
              <div className="mb-5 text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={8}
                  required
                  className="w-full p-3.5 border border-gray-300 rounded-xl text-gray-800 outline-none focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20 transition"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-5 text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  required
                  className="w-full p-3.5 border border-gray-300 rounded-xl text-gray-800 outline-none focus:border-[#8b5e3c] focus:ring-2 focus:ring-[#8b5e3c]/20 transition"
                />
              </div>

              {/* Password Hint */}
              <p className="text-xs text-gray-400 mb-5 text-left">
                Password must contain at least 8 characters.
              </p>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-5">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#5c3d2e] text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-[#8b5e3c] hover:shadow-lg transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Resetting Password..." : "Reset Password"}
              </button>

            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-[#8b5e3c] hover:text-[#5c3d2e] font-medium transition"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}