"use client";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../store/store";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { setTweets } from "../../../../../store/slices/tweetsSlice";

export default function ProfilePage() {
  const { username } = useParams();
  const { tweets } = useSelector((state: RootState) => state.tweets);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUserTweets = async () => {
    try {
      const resp = await axios.get(`/api/gettweets/${username}`);
      if (tweets) {
        setLoading(false);
        dispatch(setTweets(resp.data.tweets));
      }
      console.log(resp.data);
    }
    catch (err: any) {
      toast.error(err.response);
    }
  }

  useEffect(() => {
    fetchUserTweets();
  }, [])

  tweets.map((t: any) => {
    console.log(t.profiles?.username)
  })

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
                    <div className="flex flex-wrap items-center gap-1">
                        <span className="text-black font-bold truncate">{t.profiles?.username}</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500 shrink-0">{new Date(t.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-gray-800 mt-1 text-sm md:text-lg">{t.content}</p>
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
