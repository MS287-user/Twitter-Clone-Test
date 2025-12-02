"use client";
import React, { useEffect, useState } from "react";
import { User, Image, Smile, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import toast from "react-hot-toast";
import axios from "axios";
import { addTweet, setTweets } from "../../store/slices/tweetsSlice";
import Link from "next/link";

export default function TweetFeed() {
    const [tweet, setTweet] = useState("");
    const { id } = useSelector((state: RootState) => state.auth);
    const { tweets } = useSelector((state: RootState) => state.tweets);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    const fetchTweets = async () => {
        try {
            const resp = await axios.get("/api/gettweets");
            if (tweets) {
                setLoading(false);
                dispatch(setTweets(resp.data.tweets));
            }
        }
        catch (err: any) {
            toast.error(err.response);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resp = await axios.post("/api/addtweet", {
                id,
                tweet
            })
            setTweet("");
            if (resp.data.status == 400) {
                toast.error(resp.data.message);
            }
            else if (resp.data.status == 500) {
                toast.error(resp.data.message);
            }
            else {
                const newTweet = resp.data.data;
                const tweet = {
                    id: newTweet.id,
                    user_id: newTweet.user_id,
                    content: newTweet.content,
                    created_at: newTweet.created_at,
                    profiles: {
                        username: newTweet.profiles?.username
                    }
                }
                dispatch(addTweet(tweet));
                fetchTweets();
                toast.success(resp.data.message);
            }
        }
        catch (err: any) {
            toast.error(err.response);
        }
    }

    useEffect(() => {
        fetchTweets();
    }, [])

    return (
        <div className="md:mt-0 mt-14 w-full h-full px-3 sm:px-4 py-3 sm:py-4">
            {/* Tweet Box */}
            <div className="border-b border-gray-200 flex gap-3">
                <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex-1 min-w-0">
                        <textarea
                            placeholder="What's happening?"
                            value={tweet}
                            onChange={(e) => setTweet(e.target.value)}
                            className="w-full resize-none bg-transparent text-base sm:text-lg md:text-xl placeholder:text-gray-500 focus:outline-none min-h-[52px]"
                            rows={2}
                            maxLength={280}
                        />
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 mb-2 sm:mt-3 sm:mb-3 pt-2 border-t border-gray-200 gap-2 sm:gap-0">
                            <div className="flex items-center gap-2 -ml-1">

                            </div>

                            <div className="flex items-center mt-2 sm:mt-0">
                                <button
                                    type="submit"
                                    disabled={!tweet.trim()}
                                    className="bg-blue-500 disabled:bg-blue-300 text-white px-4 py-1 rounded-full font-semibold text-sm sm:text-base"
                                >
                                    Tweet
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

            {/* Tweets */}
            {loading ?
                <>
                    <div className="w-full h-1/2 flex items-center justify-center text-lg font-semibold">
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
                                            <Link href={`/u/${t.profiles?.username}`} >
                                                <span className="font-bold truncate hover:underline">{t.profiles?.username}</span>
                                            </Link>
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
