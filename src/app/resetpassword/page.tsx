"use client";

import axios from "axios";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

//forgot password page
export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);   


    const resetPasswordEmail = async () => {
      try {
      } catch (error) {}
    };





}

