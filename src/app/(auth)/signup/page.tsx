"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Twitter } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/api/signup", {
        email,
        password,
        username
      })
      setUserName("");
      setEmail("");
      setPassword("");
      if(resp.data.status == 400) {
        toast.error(resp.data.message);
      }
      else if(resp.data.status == 400) {
        toast.error(resp.data.message);
      }
      else{
        toast.success(resp.data.message);
      }
      
    }
    catch (err: any) {
      toast.error(err.response);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Twitter className="h-10 w-10 text-blue-500" />
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Create your account</h1>
            <p className="text-sm text-muted-foreground">Sign up to get started!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-muted-foreground block mb-2">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground block mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-muted-foreground block mb-2">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-base pr-10 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full h-12 text-base font-bold rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Sign up
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">Already have an account?</p>
            <Link href="/login">
              <button className="w-full h-12 text-black font-bold rounded-full border border-gray-200 bg-background hover:bg-blue-100 hover:text-blue-500">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>

  );
}
