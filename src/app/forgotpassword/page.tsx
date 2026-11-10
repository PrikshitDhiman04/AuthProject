"use client";

import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import React, { useEffect, useState } from "react";

//forgot password page
export default function ForgotPassword() {
    const [token, setToken] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);   
}

const forgotPasswordEmail = async () => {
    try {
        
    } catch (error) {
        
    }
}