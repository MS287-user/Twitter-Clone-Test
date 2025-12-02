"use client";
import Link from "next/link";
import { useState } from "react";
import { Home, User } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { id, email, username } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={` top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col gap-6 px-2 xl:px-4 py-2 transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-[68px] xl:w-[275px]`}
      >
        {/* Logo */}
        <div className="p-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">X</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-5">
          <Link
            href="/"
            className="flex w-full justify-center xl:justify-start items-center gap-3 font-bold hover:text-blue-500"
          >
            <Home className="h-6 w-6 shrink-0" />
            <span className="hidden xl:inline">Home</span>
          </Link>

          <Link
            href={`/u/${username}`}
            className="flex w-full justify-center xl:justify-start items-center gap-3 font-bold hover:text-blue-500"
          >
            <User className="h-6 w-6 shrink-0" />
            <span className="hidden xl:inline">Profile</span>
          </Link>
        </nav>

        {/* User Profile at bottom */}
                
        <div className="mt-auto mb-4 relative">
          <div
            className="flex items-center gap-3 p-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-gray-500" />
            </div>

            <div className="hidden xl:block flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{ username }</p>
              <p className="text-gray-500 text-sm truncate">{email}</p>
            </div>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute bottom-14 left-0 w-[200px] bg-white shadow-xl rounded-xl py-2 border border-gray-200 z-50">

              <button
                className="font-bold w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                onClick={() => handleSignOut()}
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </aside>

    </div>
  );
}
