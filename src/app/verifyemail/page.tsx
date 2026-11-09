"use client";

import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError("Verification failed");
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("token=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1eb] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center border border-[#e5d8c8]">
        <h1 className="text-3xl font-bold text-[#5c3d2e] mb-3">
          Verify Your Email
        </h1>

        <h2 className="text-gray-600 text-sm mb-6">
          We're checking your email verification request.
        </h2>

        <div className="bg-[#f9f5f0] rounded-xl p-4 border border-[#e5d8c8]">
          {token ? (
            <p className="text-sm text-gray-800 break-all">
              <span className="font-semibold text-[#8b5e3c]">
                Your Verification Token:
              </span>
              <br />
              <span className="mt-2 block">{token}</span>
            </p>
          ) : (
            <p className="text-gray-600 font-medium">No token found!</p>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Secure email verification powered by your application.
        </p>
      </div>

      {verified && (
        <div>
          <h2 className="text-green-600 font-bold">
            Email verified successfully!
          </h2>
          <Link href="/login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-red-600 font-bold">Email verification failed!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      )}
    </div>
  );
}
