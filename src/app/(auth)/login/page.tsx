"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Twitter } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { supabase } from "../../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const resp = await axios.post("/api/login", {
        email,
        password
      })
      setEmail("");
      setPassword("");
      if(resp.data.status == 400){
        toast.error(resp.data.message);
      }
      else if(resp.data.status == 500){
        toast.error(resp.data.message);
      }
      else{
        await supabase.auth.setSession({ access_token: resp.data.currentUserSession.access_token, refresh_token: resp.data.currentUserSession.refresh_token });
        toast.success(resp.data.message);
        router.replace("/");
      }
    }
    catch(err: any) {
      toast.error(err.response);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[400px] space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Twitter className="h-10 w-10 text-blue-500" />
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Sign in to Twitter</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-muted-foreground block mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

          <button
            type="submit"
            className="w-full h-12 text-white font-bold rounded-full bg-blue-500 text-primary-foreground hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-muted-foreground">or</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Don't have an account?</p>
          <Link href="/signup">
            <button className="w-full h-12 text-black font-bold rounded-full border border-gray-200 bg-background hover:bg-blue-100 hover:text-blue-500">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
