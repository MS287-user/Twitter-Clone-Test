"use client";
import MobileTopNav from "@/components/MobileTopNav";
import Sidebar from "@/components/Sidebar";
import TweetFeed from "@/components/TweetFeed";

export default function Home() {
  return (
    <>
      <div className="flex justify-start min-h-screen bg-gray-50">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        <MobileTopNav/>
        {/* Main Feed */}
        <main className="flex-1 w-full max-w-3xl  border-x border-gray-200 bg-white">
          <TweetFeed />
        </main>


        {/* Right sidebar */}

        <aside className="hidden xl:flex p-4">
          {/* Trending */}
          <div className="bg-gray-200 rounded-2xl w-80 p-4">
            <h2 className="text-xl font-bold mb-4">What's happening</h2>
            <div className="space-y-4">
              {[
                { category: "Technology · Trending", topic: "Lorem Ipsum", posts: "12.5K" },
                { category: "Politics · Trending", topic: "Lorem Ipsum", posts: "8.2K" },
                { category: "Science · Trending", topic: "Lorem Ipsum", posts: "24.1K" },
              ].map((item, i) => (
                <div key={i} className="hover-card -mx-2 px-2 py-2 rounded-lg cursor-pointer">
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                  <p className="font-bold">{item.topic}</p>
                  <p className="text-xs text-muted-foreground">{item.posts} posts</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

    </>
  );
}
