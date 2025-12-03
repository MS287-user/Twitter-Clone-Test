"use client";
import { User } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../store/store";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { setTweets } from "../../../../../store/slices/tweetsSlice";
import Link from "next/link";

export default function ProfilePage() {
  const { username } = useParams();
  const { tweets } = useSelector((state: RootState) => state.tweets);
  const { username: loggedInUser } =  useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUserTweets = async () => {
    try {
      const resp = await axios.get(`/api/gettweets/${username}`);
      if (tweets) {
        setLoading(false);
        dispatch(setTweets(resp.data.tweets));
      }
    }
    catch (err: any) {
      toast.error(err.response);
    }
  }

  useEffect(() => {
    fetchUserTweets();
  }, [])

  const handleDelete = async (id: any) => {
    try{
      const resp = await axios.delete(`/api/deletetweet/${id}`);
      fetchUserTweets();
      toast.success(resp.data.message);
    }
    catch(err: any){
      toast.error(err.response)
    }
  }

  return (
    <div className="max-w-3xl w-full border-x border-gray-200 min-h-screen text-white">

      {/* COVER PHOTO */}
      <div className="w-full h-40 bg-gray-500 relative">
        
      </div>

      {/* PROFILE INFO BLOCK */}
      <div className="px-4 relative">
        {/* Profile Picture */}
        <div className="absolute -top-16">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* User Details */}
        <div className="mt-2">
          <h2 className="font-bold text-gray-950 text-xl">{username}</h2>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 mt-4"></div>

      {/* NAV TABS */}
      <div className="flex justify-around text-sm font-semibold border-b border-gray-200">
        <button className="py-3 flex-1 text-gray-950 text-center hover:bg-gray-200 transition">
          Tweets
        </button>
      </div>

      {/* Tweets */}
      {loading ?
        <>
          <div className="h-1/2 flex items-center justify-center text-black text-lg font-semibold">
            Loading...
          </div>
        </>
        :
        tweets.length == 0 ?
          <>
            <div className="text-black w-full h-1/2 flex items-center justify-center text-lg font-semibold">
              No tweets posted yet.
            </div>
          </>
          :
          <>
            <div className="mt-4 space-y-3">
              {tweets.map((t: any) => (
                <article
                  key={t.id}
                  className="border-b border-gray-200 hover:bg-gray-50 px-3 sm:px-4 py-3 cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col">
                        <div className="flex justify-between">

                          <div className="flex flex-wrap items-center gap-">
                            <span className="text-black font-bold truncate">{t.profiles?.username}</span>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-500 shrink-0">{new Date(t.created_at).toLocaleTimeString()}</span>
                          </div>

                          <div>
                            {loggedInUser == t.profiles?.username ?
                            <Menu as="div" className="relative inline-block">
                              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-500 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:cursor-pointer">
                                <EllipsisHorizontalIcon aria-hidden="true" className="size-6 text-white" />
                              </MenuButton>

                              <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-white border border-gray-200 shadow-[0_5px_10px_rgb(0,0,0,0.2)] focus:border-0 focus:outline-0 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                              >
                                
                                <div className="py-1 px-1">
                                  <MenuItem>
                                    <a
                                      className="font-bold block px-4 py-2 text-sm text-gray-800 data-focus:bg-red-300 data-focus:text-red-600 data-focus:outline-hidden rounded"
                                      onClick={() => handleDelete(t.id)}
                                    >
                                      Delete
                                    </a>
                                  </MenuItem>
                                </div>
                              </MenuItems>
                            </Menu>
                            :
                            ""
                          }
                            
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-800 mt-1 text-sm md:text-lg">{t.content}</p>
                        </div>
                      </div>


                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
      }
    </div>
  );
}
