"use client";

import Link from "next/link";
import { Home, User, Menu, Cross, CrossIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function MobileTopNav() {
    const { username } = useSelector((state: RootState) => state.auth);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.replace('/login');
    }

    return (
        <>
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-blue-500 border-b border-gray-200 shadow-md flex justify-between items-center px-4 py-2 md:hidden z-50">

                {/* Logo */}
                <Link href="/" className="font-bold text-white text-lg">
                    Twitter
                </Link>

                {/* Hamburger Button */}
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center justify-center text-white"
                >
                    <Menu className="w-7 h-7" />
                </button>

            </nav>

            {/* Overlay for Menu  */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Slide Sidebar for mobile screen */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-white text-black shadow-lg z-60 transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Cross Icon */}
                <div className="flex justify-end mt-5 pr-5" onClick={() => setOpen(false)}>
                    <X />
                </div>

                {/* Sidebar Content */}
                <div className="p-4 space-y-6 mt-6">

                    {/* User Info */}
                    <div>
                        <p className="font-bold text-lg">{username}</p>
                    </div>

                    {/* Nav Links */}
                    <div className="space-y-4">
                        <Link href="/" onClick={() => setOpen(false)} className="block font-semibold text-gray-800">
                            Home
                        </Link>

                        <Link href={`/u/${username}`} onClick={() => setOpen(false)} className="block font-semibold text-gray-800">
                            Profile
                        </Link>
                    </div>

                    {/* Logout Button */}
                    <button
                        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-full font-bold"
                        onClick={() => handleSignOut()}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
}
